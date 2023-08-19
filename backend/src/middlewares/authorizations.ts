/* eslint-disable @typescript-eslint/no-explicit-any */
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
        const user = await User.findOne({ email });

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

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendErrorResponse(res, 401, 'Kindly sign in as a user');
    }

    const token = authHeader.substring(7);

    if (!token) {
      return sendErrorResponse(res, 401, 'Kindly sign in as a user');
    }

    const superadmin = [
      {
        email: 'muhammadmuawiya@meristemng.com',
        name: 'Muhammad Muawiya Alkali',
        phone: '+2347080407711',
      },
    ];

    const decodedToken = jwt.verify(token, jwtsecret) as {
      email: string;
    };
    const userIsSuperAdmin = superadmin.find(
      (admin) => admin.email === decodedToken.email,
    );

    if (userIsSuperAdmin) {
      req.user = decodedToken;
      next();
    } else {
      return sendErrorResponse(
        res,
        403,
        'You are not authorized as a superadmin',
      );
    }
  } catch (error) {
    console.error('Error in isSuperAdmin middleware:', error);
    return sendErrorResponse(res, 500, 'Internal server error 3--');
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

export const isInitiator = async (
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

        if (user.role !== 'initiator' || user.status !== 'active') {
          return sendErrorResponse(
            res,
            403,
            'Only Initiator can perform this action',
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
