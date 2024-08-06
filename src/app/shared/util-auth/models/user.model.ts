import { IMember } from 'src/app/domains/members/data/models/member.model';
import { AuthModel } from './auth.model';

// export class UserModel extends AuthModel {
//   userId?: number | 0;
//   roles?: Role[];
//   roleId?: number;
//   name?: string;
//   mobile?: string;
//   email?: string;
//   role?: Role;
//   isAdmin?: boolean;
//   passWord?: string;
//   addressOne?: string;
//   addressTwo?: string;
//   deviceId?: string;
//   latitude?: string;
//   longitude?: string;
//   override token?: string;
//   member: IMember | undefined
//   trainee: any | undefined
//   /**
//    * name,email,mobile,passWord,addressOne,addressTwo
//    */


//   /**
//    * name,email,mobile,passWord,addressOne,addressTwo
//    */
// }

export class UserModel {
  userId?: number | 0;
  roles?: Role[];
  roleId?: number;
  name?: string;
  mobile?: string;
  role?: Role;
  token?: string;
  // member: any;
  // trainee: any;

}

export interface LoginResponseDto {
  // name: string | null;
  // mobile?: string;
  // email?: string;
  // token?: string | null;
  // userId?: number | 0;
  // roleId?: number | null;
  // role?: string | null;
  // addressOne?: string;
  // addressTwo?: string;
  // deviceId?: string;]
  user?: UserModel
  member?: IMember
  traineeList: any
}

// export type Role = 'ADMIN' | 'CUSTOMER';

export enum Role {
  SUPERADMIN = 'SuperAdmin',
  ADMIN = 'Admin',
  WAITER = 'Waiter',
  CUSTOMER = 'Customer',
  USER = 'Normal User',
  NONE = "NONE"
}
