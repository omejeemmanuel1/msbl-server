import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import {
  GenerateOtp,
  GeneratePassword,
  GenerateSalt,
  GenerateToken,
  SendPasswordResetOTP,
} from '../utils/notifications';
import { User } from '../models/users';
import { Verification } from '../models/passwords';

const STATUS_ACTIVE = 'active';

const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
) => {
  return res.status(statusCode).json({ message });
};

// Change Password API
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      return sendErrorResponse(res, 401, 'Invalid current password');
    }

    if (newPassword !== confirmPassword) {
      return sendErrorResponse(res, 400, 'Passwords do not match');
    }

    const salt = await GenerateSalt();
    const hashedNewPassword = await GeneratePassword(newPassword, salt);

    user.status = STATUS_ACTIVE;
    await user.updateOne({ password: hashedNewPassword });

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(
        res,
        404,
        'User not found, kindly register first',
      );
    }

    const verification = await Verification.findOne({ userId: user.id });

    const { otp, expiry } = await GenerateOtp();
    const token = await GenerateToken(email, res);
    await SendPasswordResetOTP(email, otp);

    if (verification) {
      verification.otp = otp;
      verification.expiry = expiry;
      await verification.save();
    } else {
      await Verification.create({
        otp,
        expiry,
        userId: user.id,
      });
    }

    return res.status(200).json({ message: 'OTP sent successfully', token });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

export const verifyOTP = async (req: Request | any, res: Response) => {
  try {
    const { otp } = req.body;

    const { email } = req.user;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ error: 'Invalid user or OTP' });
    }

    const verification = await Verification.findOne({ userId: user.id });

    if (!verification || otp !== verification.otp) {
      return res.status(401).json({ error: 'The OTP entered is not correct' });
    }

    if (verification.expiry && new Date() >= verification.expiry) {
      return res.status(400).json({ error: 'Invalid/Expired OTP' });
    }

    await Verification.deleteOne({ userId: user.id });

    return res.status(200).json({
      message: 'OTP verified successfully. Proceed to change your password',
    });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

export const resetPassword = async (req: Request | any, res: Response) => {
  const { newPassword, confirmPassword } = req.body;
  const reg = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/g;
  const checker = reg.test(newPassword);

  try {
    const { email } = req.user;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (newPassword === '' || confirmPassword === '') {
      return res.status(400).json({ error: 'password input field required' });
    }
    if (newPassword.length < 8 || confirmPassword.length < 8) {
      return res
        .status(400)
        .json({ error: 'password must be eight characters or more' });
    }
    if (checker === false) {
      return res.status(400).json({
        error:
          'Password should contain at least one upperCase, one special character and a number',
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const salt = await GenerateSalt();
    const hashedPassword = await GeneratePassword(newPassword, salt);

    await user.updateOne({ password: hashedPassword });

    return res.status(200).json({
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};
