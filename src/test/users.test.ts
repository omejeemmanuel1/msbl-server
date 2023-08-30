import request from 'supertest';
import { app } from '../../src'; 
import * as notifications from '../utils/notifications';
import * as utilities from '../utils/utilities';
import { User } from '../models/users';
import bcrypt from 'bcryptjs'; 

jest.mock('../utils/notifications');
jest.mock('../utils/utilities');
jest.mock('../models/users');

describe('User Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

//   it('POST /login should log in a user', async () => {
//     // Mock necessary dependencies and functions
//     const mockGenerateToken = jest.spyOn(notifications, 'GenerateToken');
//     const mockLoginValidator = jest.spyOn(utilities, 'loginValidator') as jest.Mock;
//     const mockUserFindOne = jest.spyOn(User, 'findOne').mockResolvedValue(/* Mock existing user data */);
//     const mockBcryptCompare = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

//     const response = await request(app)
//       .post('/login')
//       .send({ email: 'test@example.com', password: 'testpassword' });

//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe('Logged in successfully');
//     expect(mockGenerateToken).toHaveBeenCalled();
//     expect(mockLoginValidator.validate).toHaveBeenCalled();
//     expect(mockUserFindOne).toHaveBeenCalled();
//     expect(mockBcryptCompare).toHaveBeenCalled();
//   });

//   it('POST /login should handle incorrect password', async () => {
//     // Mock necessary dependencies and functions
//     const mockBcryptCompare = jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

//     const response = await request(app)
//       .post('/login')
//       .send({ email: 'test@example.com', password: 'incorrectpassword' });

//     expect(response.status).toBe(401);
//     expect(response.body.error).toBe('Incorrect password');
//     expect(mockBcryptCompare).toHaveBeenCalled();
//   });

//   // Write similar test cases for other API endpoints
});
