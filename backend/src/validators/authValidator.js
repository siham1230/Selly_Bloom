import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters',
            'string.max': 'Name must not exceed 50 characters',
            'any.required': 'Name is required'
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .min(6)
        .max(128)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters',
            'string.max': 'Password must not exceed 128 characters',
            'any.required': 'Password is required'
        }),

    role: Joi.string()
        .valid('user', 'admin')
        .default('user')
        .messages({
            'any.only': 'Role must be either user or admin'
        })
});

export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
});

export const updateProfileSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .optional()
        .messages({
            'string.min': 'Name must be at least 2 characters',
            'string.max': 'Name must not exceed 50 characters'
        }),

    email: Joi.string()
        .email()
        .optional()
        .messages({
            'string.email': 'Please provide a valid email address'
        })
}).min(1).messages({
    'object.min': 'At least one field (name or email) is required to update'
});

export const changePasswordSchema = Joi.object({
    currentPassword: Joi.string()
        .required()
        .messages({
            'string.empty': 'Current password is required',
            'any.required': 'Current password is required'
        }),

    newPassword: Joi.string()
        .min(6)
        .max(128)
        .required()
        .invalid(Joi.ref('currentPassword'))
        .messages({
            'string.empty': 'New password is required',
            'string.min': 'New password must be at least 6 characters',
            'string.max': 'New password must not exceed 128 characters',
            'any.required': 'New password is required',
            'any.invalid': 'New password must be different from current password'
        })
});