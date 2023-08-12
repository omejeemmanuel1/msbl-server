import express from 'express';
import connectDB from './config/database';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import users from './routes/users';
import department from './routes/department';

const app = express();
const port = 3000;

connectDB()
  .then(() => {})
  .catch((err) => {
    console.log('Error connecting to database:', err.message);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.use(express.static(path.join(__dirname, '../public')));

app.use('/users', users);
app.use('/', department);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
