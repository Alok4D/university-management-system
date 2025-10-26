import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ✅ Pre-save middleware to prevent duplicate department names
academicDepartmentSchema.pre('save', async function (next) {
  const existingDepartment = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (existingDepartment) {
    const error = new Error('Academic Department already exists!');
    return next(error);
  }

  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
