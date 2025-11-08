"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistrationValidations = void 0;
const zod_1 = require("zod");
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
// ------------------ CREATE SCHEMA ------------------
const createSemesterRegistrationValidation = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string({
            message: 'Academic Semester ID is required',
        }),
        status: zod_1.z
            .enum([...semesterRegistration_constant_1.SemesterRegistrationStatus])
            .optional(),
        startDate: zod_1.z
            .string({ message: 'Start date is required' })
            .refine((val) => !isNaN(Date.parse(val)), {
            message: 'Start date must be a valid date',
        }),
        endDate: zod_1.z
            .string({ message: 'End date is required' })
            .refine((val) => !isNaN(Date.parse(val)), {
            message: 'End date must be a valid date',
        }),
        minCredit: zod_1.z
            .number({ message: 'Minimum credit is required' })
            .min(1, 'Minimum credit must be at least 1'),
        maxCredit: zod_1.z
            .number({ message: 'Maximum credit is required' })
            .max(30, 'Maximum credit must not exceed 30'),
    }),
});
// ------------------ UPDATE SCHEMA ------------------
const updateSemesterRegistrationValidation = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string().optional(),
        status: zod_1.z
            .enum([...semesterRegistration_constant_1.SemesterRegistrationStatus])
            .optional(),
        startDate: zod_1.z
            .string()
            .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: 'Start date must be a valid date',
        })
            .optional(),
        endDate: zod_1.z
            .string()
            .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: 'End date must be a valid date',
        })
            .optional(),
        minCredit: zod_1.z
            .number()
            .min(1, 'Minimum credit must be at least 1')
            .optional(),
        maxCredit: zod_1.z
            .number()
            .max(30, 'Maximum credit must not exceed 30')
            .optional(),
    }),
});
// ------------------ EXPORT ------------------
exports.SemesterRegistrationValidations = {
    createSemesterRegistrationValidation,
    updateSemesterRegistrationValidation,
};
