"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyValidations = void 0;
const zod_1 = require("zod");
const createAcademicFacultyZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .nonempty('Faculty name is required')
            .trim()
            .min(2, 'Faculty name must be at least 2 characters long')
            .max(50, 'Faculty name cannot exceed 50 characters'),
    }),
});
const updateAcademicFacultyZodValidation = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, 'Faculty name must be at least 2 characters long')
        .max(50, 'Faculty name cannot exceed 50 characters')
        .optional(),
});
exports.academicFacultyValidations = {
    createAcademicFacultyZodValidation,
    updateAcademicFacultyZodValidation,
};
