import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {};

export const login = async (req: Request, res: Response) => {};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Logged out successfully',
  });
};
