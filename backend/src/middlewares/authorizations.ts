import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import { jwtsecret } from '../config';

const sendErrorResponse = (res: Response, status: number, message: string) => {
  return res.status(status).json({ error: message });
};

export const isUser = async (
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
        const user = await User.findOne({ where: { email } });

        if (!user) {
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

export const isSuperAdmin = async (
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
        const user = await User.findOne({ email });

        if (!user) {
          return sendErrorResponse(
            res,
            401,
            'Kindly register or sign in as a user',
          );
        }

        if (user.role !== 'superadmin') {
          return sendErrorResponse(
            res,
            403,
            'Only verified teachers can perform this action',
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

export const isAdmin = async (
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
        const user = await User.findOne({ email });

        if (!user) {
          return sendErrorResponse(
            res,
            401,
            'Kindly register or sign in as a user',
          );
        }

        if (user.role !== 'admin' || user.status !== 'active') {
          return sendErrorResponse(
            res,
            403,
            'Only Admin can perform this action',
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
