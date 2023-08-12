import { Request, Response } from 'express';
import { Department, DepartmentDocument } from '../models/department';

import { deptValidate, variables } from '../utils/utilities';

export const createDept = async (req: Request, res: Response) => {
  try {
    const { departmentName } = req.body;

    const formValidation = deptValidate.validate(req.body, variables);

    if (formValidation.error) {
      return res
        .status(400)
        .json({ Error: formValidation.error.details[0].message });
    }

    const existingDepartment = await Department.findOne({ departmentName });
    if (existingDepartment) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // const salt = await GenerateSalt();
    // const hashedPassword = await GeneratePassword('Passw0rd!', salt);

    const newUser: DepartmentDocument = new Department({
      departmentName,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
