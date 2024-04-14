import { RoleEnum } from '/@/enums/roleEnum';
import { User } from '/#/baseClass';
/**
 * @description: get device pagelist interface parameters
 */
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

export interface getUserPageListParmas {
  page: string | number;
  pageSize: string | number;
  // 上次登录时间
  lastLogin?: string;
  // 权限等级
  level?: number | string;
  // 所属单位
  organization?: string;
  // 密码
  password?: string;
  //责任人
  personCharge?: string;
  //用户了
  role?: string;
  //用户名
  userName?: string;
}

export interface getUserPageListData {
  pageCount: number; // 总页数
  rowCount: number; // 总的数据数量
  Users: User[]; // 用户总数
}
