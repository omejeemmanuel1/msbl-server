import { Request, Response } from 'express';
import { User, UserDocument } from '../models/users'; 

export const login = async (req: Request, res: Response) => {

};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, department, role } = req.body;

    const newUser: UserDocument = new User({
      firstName,
      lastName,
      email,
      password: 'password',
      department,
      role,
      status: 'inactive',
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
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


export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Logged out successfully',
  });
};
