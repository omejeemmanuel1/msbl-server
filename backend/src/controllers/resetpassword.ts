// import { Request, Response } from 'express';
// import { User, Verification } from '../models/users';
// import bcrypt from 'bcryptjs';
// import {
//   GenerateOtp,
//   GenerateToken,
//   SendPasswordResetOTP,
// } from '../utils/notifications';

// export const genOtp = async (req: Request, res: Response) => {
//   const { email } = req.body;

//   try {
//     let user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(404).json({
//         message: 'User not found, kindly register first',
//       });
//     }

//     const verification = await Verification.findOne({
//       where: { userId: user.id },
//     });

//     const { otp, expiry } = await GenerateOtp();
//     const token = await GenerateToken(email, res);
//     await SendPasswordResetOTP(email, otp);

//     if (verification) {
//       verification.otp = otp;
//       verification.expiry = expiry;
//       await verification.save();
//     } else {
//       await Verification.create({
//         otp,
//         expiry,
//         userId: user.id,
//       });
//     }

//     return res.status(200).json({ message: 'OTP sent successfully', token });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export const verifyOtp = async (req: Request | any, res: Response) => {
//   try {
//     const { otp } = req.body;

//     const { email } = req.user;

//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(403).json({ error: 'Invalid user or OTP' });
//     }

//     const verification = await Verification.findOne({
//       where: { userId: user.id },
//     });

//     if (!verification || otp !== verification.otp) {
//       return res.status(401).json({ error: 'The OTP entered is not correct' });
//     }

//     if (verification.expiry && new Date() >= verification.expiry) {
//       return res.status(400).json({ error: 'Invalid/Expired OTP' });
//     }

//     user.status = 'verified';
//     await user.save();
//     await Verification.destroy({ where: { userId: user.id } });

//     return res.status(200).json({
//       message: 'OTP verified successfully. Proceed to change your password',
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };
// export const resetPassword = async (req: Request | any, res: Response) => {
//   const { newPassword, confirmPassword } = req.body;
//   const reg = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/g;
//   const checker = reg.test(newPassword);
//   try {
//     const { email } = req.user;

//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     if (newPassword === '' || confirmPassword === '') {
//       return res.status(400).json({ error: 'password input field required' });
//     }
//     if (newPassword.length < 8 || confirmPassword.length < 8) {
//       return res
//         .status(400)
//         .json({ error: 'password must be eight characters or more' });
//     }
//     if (checker === false) {
//       return res.status(400).json({
//         error:
//           'Password should contain at least one upperCase, one special character and a number',
//       });
//     }

//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({ error: 'Passwords do not match' });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 12);

//     await user.update({ password: hashedPassword });

//     return res.status(200).json({
//       message: 'Password changed successfully',
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
