import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtsecret } from '../config';

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const GenerateToken = async (
  email: string,
  firstName: string,
  lastName: string,
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: Response | any,
) => {
  const payload = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    _id: id,
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
