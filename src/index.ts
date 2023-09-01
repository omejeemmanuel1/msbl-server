import express from 'express';
import connectDB from './config/database';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import users from './routes/users';
import requests from './routes/requests';
import department from './routes/departments';
import passwords from './routes/passwords';
// import { errorHandler } from './middlewares/errorMiddleware';

export const app = express();
const port = 3000;

const corsOptions = {
  origin: 'https://msbl-workflow.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

connectDB()
  .then(() => {})
  .catch((err) => {
    console.log('Error connecting to database:', err.message);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
// app.use(errorHandler);
app.use(express.static(path.join(__dirname, '../public')));

app.use('/users', users);
app.use('/requests', requests);
app.use('/password', passwords);
app.use('/department', department);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
