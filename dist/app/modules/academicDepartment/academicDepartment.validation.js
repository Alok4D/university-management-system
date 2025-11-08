"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentValidations = void 0;
const zod_1 = require("zod");
/**
 * ✅ Validation schema for creating a new Academic Department
 */
const createAcademicDepartmentZodValidation = zod_1.z.object({
    name: zod_1.z
        .string()
        .nonempty({ message: 'Department name is required' })
        .trim()
        .min(2, { message: 'Department name must be at least 2 characters long' })
        .max(50, { message: 'Department name cannot exceed 50 characters' }),
    academicFaculty: zod_1.z
        .string()
        .nonempty({ message: 'Academic faculty ID is required' })
        .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid faculty ObjectId' }),
});
/**
 * ✅ Validation schema for updating an Academic Department
 * (All fields are optional for PATCH/PUT)
 */
const updateAcademicDepartmentZodValidation = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, { message: 'Department name must be at least 2 characters long' })
        .max(50, { message: 'Department name cannot exceed 50 characters' })
        .optional(),
    academicFaculty: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid faculty ObjectId' })
        .optional(),
});
exports.academicDepartmentValidations = {
    createAcademicDepartmentZodValidation,
    updateAcademicDepartmentZodValidation,
};
