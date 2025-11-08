"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ message: 'Id is required.' }),
        password: zod_1.z.string({ message: 'Password is required' }),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            message: 'Old password is required',
        }),
        newPassword: zod_1.z.string({ message: 'Password is required' }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            message: 'Refresh token is required!',
        }),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema,
};
