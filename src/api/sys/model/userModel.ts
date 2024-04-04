import { RoleEnum } from '/@/enums/roleEnum';

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  userName: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

export interface PowLoginResultModel {
  token: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface PowGetUserInfoModel {
  role: RoleEnum;
  userId: string | number;
  userName: string;
  avatar?: string;
  desc?: string;
}
