import { z } from 'zod';

/* ---------------- Enum values ---------------- */
const genderEnum = ['Male', 'Female', 'other'] as const;
const bloodGroupEnum = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
] as const;

/* ---------------- UserName ---------------- */
const userNameValidationZodSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .regex(
      /^[A-Z][a-zA-Z]*$/,
      'First name must start with an uppercase letter and contain only letters',
    ),
  middleName: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[A-Z][a-z]*$/.test(val),
      'Middle name must start with an uppercase letter and the rest lowercase letters',
    ),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .regex(
      /^[A-Z][a-z]*$/,
      'Last name must start with an uppercase letter and the rest lowercase letters',
    ),
});

/* ---------------- Guardian ---------------- */
const guardianZodValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  fatherContactNo: z.string().min(1, 'Father contact number is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
  motherContactNo: z.string().min(1, 'Mother contact number is required'),
});

/* ---------------- Local Guardian ---------------- */
const localGuardianZodValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required'),
  occupation: z.string().min(1, 'Local guardian occupation is required'),
  contactNo: z.string().min(1, 'Local guardian contact number is required'),
  address: z.string().min(1, 'Local guardian address is required'),
});

/* ---------------- Main Student ---------------- */
const studentValidationSchema = z.object({
  name: userNameValidationZodSchema,
  gender: z
    .enum(genderEnum)
    .refine((val) => genderEnum.includes(val), {
      message: 'Gender must be Male, Female, or other',
    }),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Please provide a valid email address'),
  contactNo: z.string().min(1, 'Contact number is required'),
  emergencyContactNo: z.string().min(1, 'Emergency contact number is required'),
  bloodGroup: z
    .enum(bloodGroupEnum)
    .optional()
    .refine((val) => !val || bloodGroupEnum.includes(val), {
      message: 'Invalid blood group',
    }),
  parentAddress: z.string().min(1, 'Parent address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  guardian: guardianZodValidationSchema,
  localGuardian: localGuardianZodValidationSchema,
  admissionSemester: z.string(),
  profileImage: z.string().min(1, 'Profile image is required'),
});

/* ---------------- Create Student ---------------- */
export const createStudentZodValidationSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password cannot exceed 32 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[@$!%*?&]/,
      'Password must contain at least one special character (@, $, !, %, *, ?, &)',
    ),
  student: studentValidationSchema,
});

/* ---------------- Export ---------------- */
export const studentValidations = {
  createStudentZodValidationSchema,
};
