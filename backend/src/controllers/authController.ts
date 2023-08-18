import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import SuperAdmin from "../models/auth.model";
import Admin from "../models/admin.model";
import { loginValidator, variables, registerValidator } from "../utils/utilities";

dotenv.config();

const jwtsecret = process.env.JWT_SECRET as string;
const adminPassword = process.env.ADMIN_PASSWORD as string;
const adminEmail = process.env.ADMIN_EMAIL as string;

export const SuperAdminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (email === adminEmail && password === adminPassword) {
            let superAdmin = await SuperAdmin.findOne({ email: email }) as unknown as { [key: string]: string };
            if (superAdmin) {
                const token = jwt.sign({ email: email }, jwtsecret, { expiresIn: "30mins" });
                return res.status(201).json({ message: "Login Successful", token: token });
            }
        } else {
            return res.status(400).json({ Error: 'Invalid email/password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
};


export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName, department } = req.body;

        const validationResult = registerValidator.validate(req.body, variables);

        if(validationResult.error){
            return res.status(400).json({Error: validationResult.error.details[0].message})
        }

        const passwordHash = await bcrypt.hash(password, 8);

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({ Error: "User Already Exists" });
        }

        const newAdmin = new Admin({
            email,
            firstName,
            lastName,
            department:department,
            password: passwordHash
        });

        await newAdmin.save();

        return res.status(201).json({ success: "Admin successfully created" });

    } catch (err) {
        console.error("Error creating admin:", err);
        res.status(500).json({ Error: "Internal server error" });
    }
};

export const AdminLogin = async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;

        const validationResult = loginValidator.validate(req.body, variables);

        if(validationResult.error){
            return res.status(400).json({Error: validationResult.error.details[0].message})
        }

        const admin = await Admin.findOne({email}) as unknown as { [key: string]: string};
        if(!admin){
            return res.status(400).json({Error: "This User does not exist"});
        }
        const token = jwt.sign({ _id: admin._id }, jwtsecret, { expiresIn: "30mins" });

        const validUser = await bcrypt.compare(password, admin.password)

        if(validUser){
            return res.status(201).json({
                msg: "you have sucessfully logged in",
                token
            })
        }
        return res.status(400).json({Error: 'invalid email/password'})
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
};

