import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {

};

export const createUser = async (req: Request, res: Response) => {

};

export const deleteUser =async (req: Request, res: Response) => {
  
};

export const deactivateUser =async (req: Request, res: Response) => {
  
};

export const fetchAllUsers =async (req: Request, res: Response) => {
  
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Logged out successfully',
  });
};
