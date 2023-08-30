// If using jest.config.js
module.exports = {
  // ... other Jest configurations
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest', // Add this line for handling ES Modules syntax
  },
};
