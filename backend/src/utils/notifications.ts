import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import {
  jwtsecret,
  hostname,
  username,
  password,
  port,
  verificationLink,
} from '../config';

// Constants
const OTP_EXPIRY_TIME = 30 * 60 * 1000;

// Email transporter configuration
const emailTransporter = nodemailer.createTransport({
  host: hostname,
  port: port,
  auth: {
    user: username,
    pass: password,
  },
});

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const GenerateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiry = new Date();
  expiry.setTime(new Date().getTime() + OTP_EXPIRY_TIME);
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
    throw new Error('Error generating token');
  }
};

export const ValidateToken = async (token: string) => {
  try {
    const decodedToken: any = jwt.verify(token, jwtsecret);

    const expiry = new Date(decodedToken.expiry);
    if (expiry.getTime() < new Date().getTime()) {
      return { valid: false, email: null };
    }

    return { valid: true, email: decodedToken.email };
  } catch (error) {
    console.error(error);
    return { valid: false, email: null };
  }
};

export const SendEmail = async (to: string, subject: string, html: string) => {
  try {
    const mailOptions = {
      from: 'MSBL <quickgrade.hq@gmail.com>',
      to: to,
      subject: subject,
      html: html,
    };

    await emailTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending email: ${(error as Error).message}`);
    throw new Error('Error sending email');
  }
};

export const SendActivationLink = async (
  email: string,
  name: string,
  id: string,
) => {
  const subject = 'Account Activation';
  const html = `
        <div style="max-width:700px; font-size:110%; border:10px solid #ddd; padding:50px 20px; margin:auto; ">
          <h1 style="text-transform:uppercase; text-align:center; color:teal;">
            Welcome to Operations Work Flow
          </h1>
          <h2>Activate your account</h2>
          <p>
            Your accout activation link is below — enter it in the browser window to change your password and activate your account.
          </p>
          <h1>${name}</h1>
          <p>Please click the following link to verify your account:</p>
          <a href="${verificationLink}/${id}">${verificationLink}/${id}</a>
          <p>Note that the link is only valid for a limited time.</p>
          <p>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.</p>
        </div>
        `;
  await SendEmail(email, subject, html);
};

export const SendPasswordResetOTP = async (email: string, otp: number) => {
  const subject = 'Password Reset OTP';
  const html = `
        <div style="max-width:700px; font-size:110%; border:10px solid #ddd; padding:50px 20px; margin:auto; ">
          <p>Your OTP to reset your password is:</p>
          <h1>${otp}</h1>
          <p>Please enter this OTP to reset your password.</p>
          <p>Note that the OTP is only valid for 30 minutes.</p>
          <p>If you did not make this request, please ignore this email.</p>
        </div>
        `;
  await SendEmail(email, subject, html);
};

export const SendClientRequestStatus = async (
  email: string,
  name: string,
  status: string,
) => {
  const subject = 'Request Status Update (Client)';
  const html = `
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
        `;
  await SendEmail(email, subject, html);
};

export const SendInitiatorRequestStatus = async (
  email: string,
  name: string,
  status: string,
) => {
  const subject = 'Request Status Update (Initiator)';
  const html = `
        <div style="max-width:700px; font-size:110%; border:10px solid #ddd; padding:50px 20px; margin:auto; ">
          <h1 style="text-transform:uppercase; text-align:center; color:teal;">
            Meristem Operations Work Flow
          </h1>
          <h2>Request Status Update</h2>
          <p>Dear ${name},</p>
          <p>The status of the request you are working on has been updated.</p>
          <h2>${status}</h2>
       </div>
       `;
  await SendEmail(email, subject, html);
};

export const SendOperationsRequestStatus = async (
  email: string,
  name: string,
  status: string,
) => {
  const subject = 'Request Status Update (Operations)';
  const html = `
        <div style="max-width:700px; font-size:110%; border:10px solid #ddd; padding:50px 20px; margin:auto; ">
          <h1 style="text-transform:uppercase; text-align:center; color:teal;">
            Meristem Operations Work Flow
          </h1>
          <h2>Request Status Update</h2>
          <p>Dear ${name},</p>
          <p>The status of the request you are working on has been updated.</p>
          <h2>${status}</h2>
       </div>
       `;
  await SendEmail(email, subject, html);
};
