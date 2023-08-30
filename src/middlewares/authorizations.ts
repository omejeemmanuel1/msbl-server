/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import { jwtsecret, superadminemail } from '../config';

const sendErrorResponse = (res: Response, status: number, message: string) => {
  return res.status(status).json({ error: message });
};

// Authentication middleware
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

      req.user = verifiedUser;
      next();
    }
  } catch (error) {
    console.error('Error in user authentication middleware:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

// Authorization middleware for SuperAdmin
export const isSuperAdmin = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.user as { email: string };

    if (email === superadminemail) {
      next();
    } else {
      return sendErrorResponse(
        res,
        403,
        'You are not authorized as a superadmin',
      );
    }
  } catch (error) {
    console.error('Error in authorizeSuperAdmin middleware:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

// Authorization middleware for Admin
export const isAdmin = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.user as { email: string };

    const user = await User.findOne({ email });

    if (user && user.role === 'admin' && user.status === 'active') {
      next();
    } else {
      return sendErrorResponse(res, 403, 'Only Admin can perform this action');
    }
  } catch (error) {
    console.error('Error in authorizeAdmin middleware:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

// Authorization middleware for Initiator
export const isInitiator = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.user as { email: string };

    const user = await User.findOne({ email });

    if (user && user.role === 'initiator' && user.status === 'active') {
      next();
    } else {
      console.log('Authorization failed for Initiator'); // Log the authorization failure
      return sendErrorResponse(
        res,
        403,
        'Only Initiator can perform this action',
      );
    }
  } catch (error) {
    console.error('Error in authorizeInitiator middleware:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};
