import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface';

// // import bcrypt from "bcrypt";

const userNameSchema = new Schema<TUserName>(
  {
    firstName: String,
    middleName: String,
    lastName: String,
  },
  { _id: false },
);

const guardianSchema = new Schema<TGuardian>(
  {
    fatherName: String,
    fatherOccupation: String,
    fatherContactNo: String,
    motherName: String,
    motherOccupation: String,
    motherContactNo: String,
  },
  { _id: false },
);

const localGuardianSchema = new Schema<TLocalGuardian>(
  {
    name: String,
    occupation: String,
    contactNo: String,
    address: String,
  },
  { _id: false },
);

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: userNameSchema, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'other'], required: true },
    dateOfBirth: String,
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergenceyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    parentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImage: { type: String, required: true },
    isActive: { type: String, enum: ['active', 'blocked'], required: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  },
);

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);

// // virtual mongoose field added

// studentSchema.virtual("fullName").get(function () {
//   return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
// });

// // pre save middleware / hook : we will work on create fuction

// studentSchema.pre("save", async function (next) {
//   // console.log(this, 'pre hook : we will save data')

//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;
//   // hasing pass and save into db
//   user.password = await bcrypt.hash(user.password, Number(process.env.BCRYPT_SALT_ROUNDS));
//   next();
// });

// //post save middleware / hook
// studentSchema.post("save", function (doc, next) {
//   doc.password = "";
//   next();
// });

// // Query middleware
// studentSchema.pre("find", function (next) {
//   // console.log(this);
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// studentSchema.pre("findOne", function (next) {
//   // console.log(this);
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });
