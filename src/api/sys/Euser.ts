import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  getUserPageListData,
  getUserPageListParmas,
  UseraddParams,
  SearchUserParams,
} from './model/userModel';
enum Api {
  GetUserPageList = '/powergrid/sys/user',
  AddUser = '/powergrid/sys/user/useradd',
  DeleteUser = '/powergrid/sys/user/delete',
  UpdateUser = '/powergrid/sys/user/update',
  SearchUser = '/powergrid/sys/user',
}
const demoParam: getUserPageListParmas = {
  page: 1,
  pageSize: 10,
};

// 获取用户列表
export const getUserList = (params: getUserPageListParmas = demoParam) =>
  defHttp.get<getUserPageListData>({ url: Api.GetUserPageList, params });
// 添加用户
/*export const addUser = (userData: UseraddParams = demoParam) =>
  defHttp.post<{ message: string }>({ url: Api.AddUser, data: userData });*/
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
export const deleteUser = (userName: string) =>
  defHttp.delete<{ message: string }>({ url: `${Api.DeleteUser}/${userName}` });

// 更新用户
export const updateUser = (userName: number, userData: getUserPageListParmas = demoParam) =>
  defHttp.put<{ message: string }>({ url: `${Api.UpdateUser}/${userName}`, data: userData });
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
/*export const SearchUserList = (params: SearchUserParams) =>
  defHttp.get<getUserPageListData>({
    url: Api.SearchUser,
    params,
  });

/* export const updateUser = (userId: number | string, userData: User) => {
  return defHttp.put<{ message: string; user: User }>({
    url: `${Api.UpdateUser}/${userId}`,
    data: userData,
  });
}; */
