import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { jwtsecret, hostname, username, password } from '../config';

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const GenerateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
  return { otp, expiry };
};

export const GenerateToken = async (email: string, res: Response | any) => {
  const payload = {
    email: email,
  };

  try {
    const token = jwt.sign(payload, jwtsecret, { expiresIn: '30d' });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    console.error(error);
    throw new Error('Error generating password reset token');
  }
};

export const ValidateToken = async (token: string) => {
  try {
    const decodedToken: any = jwt.verify(token, jwtsecret);

    const expiry = new Date(decodedToken.expiry);
    if (expiry.getTime() < new Date().getTime()) {
      return { valid: false, email: null };
    }
    console.log(decodedToken);
    return { valid: true, email: decodedToken.email };
  } catch (error) {
    console.error(error);
    return { valid: false, email: null };
  }
};

export const SendVerification = async (email: string, name: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: hostname,
      port: 587,
      auth: {
        user: username,
        pass: password,
      },
    });

    const mailOptions = {
      from: 'QuickGrade <quickgrade.hq@gmail.com>',
      to: email,
      subject: 'Account Verification OTP',
      html: `
        <div style="max-width:700px; font-size:110%; border:10px solid #ddd; padding:50px 20px; margin:auto; ">
          <h1 style="text-transform:uppercase; text-align:center; color:teal;">
            Welcome to QuickGrade
          </h1>
          <h2>Confirm your email address</h2>
          <p>
            Your confirmation code is below — enter it in the browser window where you’ve started signing up for QuickGrade.
          </p>
          <h1>${name}</h1>
          <p>Please enter this OTP to verify your account.</p>
          <p>Note that the OTP is only valid for 30 minutes.</p>
          <p>Questions about setting up QuickGrade? Email us at quickgrade.hq@gmail.com</p>
          <p>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification OTP:', error);
    throw new Error('Error sending verification OTP');
  }
};

export const SendPasswordResetOTP = async (email: string, otp: number) => {
  try {
    const transporter = nodemailer.createTransport({
      host: hostname,
      port: 587,
      auth: {
        user: username,
        pass: password,
      },
    });

    const mailOptions = {
      from: 'QuickGrade <quickgrade.hq@gmail.com>',
      to: email,
      subject: 'Password Reset OTP',
      html: `
 <div style="max-width:700px; font-size:110%; border:10px solid #ddd; 
padding:50px 20px; margin:auto; ">
<p>Your OTP to reset your password is:</p>
  <h1>${otp}</h1>
  <p>Please enter this OTP to reset your password.</p>
  <p>Note that the OTP is only valid for 30 minutes.</p>
  <p>If you did not make this request, please ignore this email.</p>
  `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw new Error('Error sending password reset OTP');
  }
};

export const SendRequestStatus = async (email: string, otp: number) => {
  try {
    const transporter = nodemailer.createTransport({
      host: hostname,
      port: 587,
      auth: {
        user: username,
        pass: password,
      },
    });

    const mailOptions = {
      from: 'QuickGrade <quickgrade.hq@gmail.com>',
      to: email,
      subject: 'Account Verification OTP',
      html: `
        <div style="max-width:700px; font-size:110%; border:10px solid #ddd; padding:50px 20px; margin:auto; ">
          <h1 style="text-transform:uppercase; text-align:center; color:teal;">
            Welcome to QuickGrade
          </h1>
          <h2>Confirm your email address</h2>
          <p>
            Your confirmation code is below — enter it in the browser window where you’ve started signing up for QuickGrade.
          </p>
          <h1>${otp}</h1>
          <p>Please enter this OTP to verify your account.</p>
          <p>Note that the OTP is only valid for 30 minutes.</p>
          <p>Questions about setting up QuickGrade? Email us at quickgrade.hq@gmail.com</p>
          <p>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification OTP:', error);
    throw new Error('Error sending verification OTP');
  }
};
