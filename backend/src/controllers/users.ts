import { Request, Response } from 'express';
import { User, UserDocument } from '../models/users';
import {
  GeneratePassword,
  GenerateSalt,
  GenerateToken,
  SendActivationLink,
} from '../utils/notifications';
import {
  registerValidator,
  loginValidator,
  variables,
} from '../utils/utilities';
import {
  defaultpassword,
  superadminemail,
  superadminpassword,
} from '../config';
import emailValidator from 'email-validator';
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const formValidation = loginValidator.validate(req.body, variables);

    if (formValidation.error) {
      return res
        .status(400)
        .json({ Error: formValidation.error.details[0].message });
    }

    // If user is SuperAdmin
    const superadmin = [
      {
        email: superadminemail,
        password: superadminpassword,
        name: 'Super Admin',
      },
    ];

    const admin = superadmin.find(
      (admin) => admin.email === email && admin.password === password,
    );

    if (admin) {
      const token = await GenerateToken(email, '', '', '', res); // Pass null for firstName and lastName
      return res
        .status(200)
        .json({ message: 'Super Admin logged in Successfully', token });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (existingUser.status !== 'active') {
      if (existingUser.role === 'admin') {
        // Update the admin user's status to "active"
        existingUser.status = 'active';
        await existingUser.save();
      } else {
        return res.status(403).json({
          error: 'Your account is deactivated, kindly contact your admin',
        });
      }
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = await GenerateToken(
      email,
      existingUser.firstName,
      existingUser.lastName,
      existingUser.id,
      res,
    ); // Pass firstName and lastName
    return res.status(200).json({
      message: 'Logged in successfully',
      token,
      role: existingUser.role,
      existingUser,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const token = await GenerateToken(email, res);

//     const formValidation = loginValidator.validate(req.body, variables);

//     if (formValidation.error) {
//       return res
//         .status(400)
//         .json({ Error: formValidation.error.details[0].message });
//     }

//     // If user is SuperAdmin
//     const superadmin = [
//       {
//         email: superadminemail,
//         password: superadminpassword,
//         name: 'Super Admin',
//       },
//     ];

//     const admin = superadmin.find(
//       (admin) => admin.email === email && admin.password === password,
//     );

//     if (admin) {
//       return res
//         .status(200)
//         .json({ message: 'Super Admin logged in Successfully', token });
//     }

//     const existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       return res.status(400).json({ error: 'User not found' });
//     }
//     if (existingUser.status !== 'active') {
//       return res.status(403).json({
//         error: 'Your account is deactivated, kindly contact your admin',
//       });
//     }

//     const passwordMatch = await bcrypt.compare(password, existingUser.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Incorrect password' });
//     }

//     return res.status(200).json({
//       message: 'Logged in successfully',
//       token,
//     });
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

export const createUser = async (req: Request, res: Response) => {
  try {
    const { users } = req.body;

    if (!users || !Array.isArray(users)) {
      return res.status(400).json({
        error:
          'Invalid input format. Please provide an object with a "users" property containing an array of users.',
      });
    }

    const savedUsers: UserDocument[] = [];

    for (const userData of users) {
      const { firstName, lastName, email, department, role } = userData;

      const formValidation = registerValidator.validate(userData, variables);

      if (formValidation.error) {
        return res
          .status(400)
          .json({ Error: formValidation.error.details[0].message });
      }

      if (!emailValidator.validate(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: `User with email ${email} already exists` });
      }

      const salt = await GenerateSalt();
      const hashedPassword = await GeneratePassword(defaultpassword, salt);

      const newUser: UserDocument = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        department,
        role,
        status: 'inactive',
      });

      const savedUser = await newUser.save();
      savedUsers.push(savedUser);

      await SendActivationLink(
        email,
        `${firstName} ${lastName}`,
        `http://localhost:3000/users/update/${newUser._id}`,
      );
    }

    res.status(201).json(savedUsers);
  } catch (error) {
    console.error('Error creating users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const toggleActivation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user: UserDocument | null = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Determine the new status based on the current status
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    user.status = newStatus;

    // Save the updated user to the database
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error('Error toggling user activation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();

    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const fetchSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Logged out successfully',
  });
};
