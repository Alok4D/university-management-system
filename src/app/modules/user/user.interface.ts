export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'admin' | 'student' | 'blocked';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
