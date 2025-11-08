"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string()
        .max(20, { message: 'Password cannot be more than 20 characters' })
        .optional()
        .refine((val) => typeof val === 'string' || val === undefined, {
        message: 'Password must be a string',
    }),
});
exports.UserValidation = {
    userValidationSchema,
};
