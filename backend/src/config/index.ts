import * as dotenv from 'dotenv';

dotenv.config();

export const jwtsecret = String(process.env.JWT_SECRET);

export const connectionstring = String(process.env.MONGODB_URI);

export const superadminpassword = String(process.env.SUPER_ADMIN_PASSWORD);

export const superadminemail = String(process.env.SUPER_ADMIN);

export const defaultPassword = String(process.env.Default);
