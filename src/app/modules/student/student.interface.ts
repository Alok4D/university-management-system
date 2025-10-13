import { StudentModel } from './student.interface';
import { Model } from 'mongoose';

export interface TGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface TUserName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface TLocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface TStudent {
  id: string;
  name: TUserName;
  password: string;
  gender: 'Male' | 'Female' | 'other';
  dateOfBirth?: string;
  email: string;
  avatar?: string;
  contactNo: string;
  emergenceyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  parentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
  isDeleted?: boolean;
};


// for creating instance
export interface StudentModel extends Model<TStudent>{
  isUserExists(id: string): Promise<TStudent | null>; 
}


// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
