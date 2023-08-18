import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { jwtsecret, hostname, username, password, port } from '../config';

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

export const SendActivationLink = async (
  email: string,
  name: string,
  verificationLink: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: hostname,
      port: port,
      auth: {
        user: username,
        pass: password,
      },
    });

    const mailOptions = {
      // from: 'MSBL <noreply@meristemng.com>',
      from: 'MSBL <quickgrade.hq@gmail.com>',
      to: email,
      subject: 'Account Activation',
      html: `
        <div style="max-width:700px; font-size:110%; border:10px solid #ddd; padding:50px 20px; margin:auto; ">
          <h1 style="text-transform:uppercase; text-align:center; color:teal;">
            Welcome to Operations Work Flow
          </h1>
          <h2>Activate your account</h2>
          <p>
            Your confirmation code is below — enter it in the browser window where you’ve started signing up for QuickGrade.
          </p>
          <h1>${name}</h1>
          <p>Please click the following link to verify your account:</p>
          <a href="${verificationLink}">${verificationLink}</a>
          <p>Note that the link is only valid for a limited time.</p>
          <p>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Error sending verification email');
  }
};

export const SendPasswordResetOTP = async (email: string, otp: number) => {
  try {
    const transporter = nodemailer.createTransport({
      host: hostname,
      port: port,
      auth: {
        user: username,
        pass: password,
      },
    });

    const mailOptions = {
      // from: 'MSBL <noreply@meristemng.com>',
      from: 'MSBL <quickgrade.hq@gmail.com>',
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <div style="max-width:700px; font-size:110%; border:10px solid #ddd; padding:50px 20px; margin:auto; ">
          <p>Your OTP to reset your password is:</p>
          <h1>${otp}</h1>
          <p>Please enter this OTP to reset your password.</p>
          <p>Note that the OTP is only valid for 30 minutes.</p>
          <p>If you did not make this request, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw new Error('Error sending password reset OTP');
  }
};

export const SendRequestStatusMail = async (
  email: string,
  name: string,
  status: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: hostname,
      port: port,
      auth: {
        user: username,
        pass: password,
      },
    });

    const mailOptions = {
      // from: 'MSBL <noreply@meristemng.com>',
      from: 'MSBL <quickgrade.hq@gmail.com>',
      to: email,
      subject: 'Request Status Update',
      html: `
        <div style="max-width:700px; font-size:110%; border:10px solid #ddd; padding:50px 20px; margin:auto; ">
          <h1 style="text-transform:uppercase; text-align:center; color:teal;">
            Meristem Operations Work Flow
          </h1>
          <h2>Request Status Update</h2>
          <p>Dear ${name},</p>
          <p>Your request status has been updated.</p>
          <h1>${status}</h1>
          <p>Please contact us at operations@meristemng.com if you have any questions or concerns about your request.</p>
          <p>If you didn’t request this email or have any questions, there’s nothing to worry about — you can safely ignore it.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending request status email:', error);
    throw new Error('Error sending request status email');
  }
};
