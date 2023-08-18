import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import  SuperAdmin  from '../models/auth.model';
import { jwtsecret } from '../config';

const sendErrorResponse = (res: Response, status: number, message: string) => {
  return res.status(status).json({ error: message });
};


export const Auth = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      if (!token) {
        return sendErrorResponse(res, 401, 'Kindly sign in as a user');
      }

      let verifiedUser;

      try {
        verifiedUser = jwt.verify(token, jwtsecret);
      } catch (error) {
        return sendErrorResponse(res, 401, 'Invalid token');
      }

      const { email } = verifiedUser as { email: string };

      try {
        const superuser = await SuperAdmin.findOne({ email });

        if (!superuser) {
          return sendErrorResponse(
            res,
            401,
            'Kindly register or sign in as a user',
          );
        }

        req.user = verifiedUser;
        next();
      } catch (error) {
        console.error('Error finding user:', error);
        return sendErrorResponse(res, 500, 'Internal server error');
      }
    }
  } catch (error) {
    console.error('Error in user authentication middleware:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};


