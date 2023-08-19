import * as dotenv from 'dotenv';

dotenv.config();

export const jwtsecret = String(process.env.JWT_SECRET);

export const connectionstring = String(process.env.MONGODB_URI);

export const defaultpassword = String(process.env.DEFAULT_PASSWORD);

export const verificationLink = String(process.env.ACTIVATION_LINK);

export const superadminpassword = String(process.env.SUPER_ADMIN_PASSWORD);

export const superadminemail = String(process.env.SUPER_ADMIN);

export const hostname = String(process.env.HOSTNAME);

export const password = String(process.env.PASSWORD);

export const username = String(process.env.USERNAME);

export const port = Number(process.env.PORT);

// export const username = String(process.env.elasticmail_username);

// export const password = String(process.env.elasticmail_password);

// export const hostname = String(process.env.elasticmail_server);

// export const port = Number(process.env.elasticmail_port);
