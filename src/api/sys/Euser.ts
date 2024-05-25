import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  getUserPageListData,
  getUserPageListParmas,
  UseraddParams,
  SearchUserParams,
  UserupdateParams,
  UserdeleteParams,
} from './model/userModel';
enum Api {
  GetUserPageList = '/powergrid/sys/user',
  AddUser = '/powergrid/sys/user/useradd',
  DeleteUser = '/powergrid/sys/user/delete',
  UpdateUser = '/powergrid/sys/user/update',
  SearchUser = '/powergrid/sys/user',
}

// 获取用户列表
export const getUserList = (params: getUserPageListParmas) =>
  defHttp.get<getUserPageListData>({ url: Api.GetUserPageList, params });
//获取用户列表
export function addUser(params: UseraddParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.AddUser,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 删除用户
/**
 * 删除设备
 * @param params 删除设备请求参数
 * @param mode 错误消息模式，默认为 'modal'
 * @returns 返回 Promise 对象，包含删除操作的结果
 */
export function deleteUser(params: UserdeleteParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete(
    {
      url: Api.DeleteUser,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

//更新用户
export function updateUser(params: UserupdateParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.put(
    {
      url: Api.UpdateUser,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 新增搜索用户的函数
export const searchUsers = async (params: SearchUserParams, mode: ErrorMessageMode = 'modal') => {
  return await defHttp.get<getUserPageListData>(
    {
      url: Api.SearchUser,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
};
