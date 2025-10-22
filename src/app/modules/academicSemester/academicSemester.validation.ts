import z from 'zod';

const AcademicSemesterZodValidationSchema = z.object({
  name: z.enum(['Autumn', 'Summer', 'Fall'] as const, {
    message: 'Semester name is required',
  }),
  code: z.enum(['01', '02', '03'] as const, {
    message: 'Semester code is required',
  }),
  year: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val)),

  startMonth: z.enum(
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ] as const,
    { message: 'Start month is required' },
  ),
  endMonth: z.enum(
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ] as const,
    { message: 'End month is required' },
  ),
});

// update academic semester zod validation
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const updateAcademicSemesterValidationSchema = z.object({
  name: z.enum(['Autumn', 'Summer', 'Fall'] as const).optional(),
  code: z.enum(['01', '02', '03'] as const).optional(),
  year: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .transform((val) => new Date(val))
    .optional(),
  startMonth: z.enum(months).optional(),
  endMonth: z.enum(months).optional(),
});

// Export validation object
export const AcademicSemesterValidation = {
  AcademicSemesterZodValidationSchema,
  updateAcademicSemesterValidationSchema,
};
