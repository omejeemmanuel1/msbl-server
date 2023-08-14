import Joi from 'joi';

export const registerValidator = Joi.object({
  role: Joi.string().required(),
  department: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().trim().lowercase().required(),
});

export const loginValidator = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .required()
    .label('Password')
    .messages({
      'string.pattern.base':
        '{#label} must contain at least one uppercase letter, one special character, and one number',
      'string.min': '{#label} must be at least {#limit} characters long',
    }),
});

export const resetPasswordValidator = Joi.object().keys({
  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .required()
    .label('Password')
    .messages({
      'string.pattern.base':
        '{#label} must contain at least one uppercase letter, one special character, and one number',
      'string.min': '{#label} must be at least {#limit} characters long',
    }),
  confirmPassword: Joi.string().equal(Joi.ref('password')).required(),
});

export const deptValidate = Joi.object({
  departmentName: Joi.string().required(),
});

export const variables = {
  abortEarly: false,
  errors: {
    wrap: {
      label: '',
    },
  },
};
