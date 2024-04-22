import { defHttp } from '/@/utils/http/axios';
import { getUserPageListData, getUserPageListParmas } from './model/userModel';
enum Api {
  GetUserPageList = '/powergrid/sys/user',
  AddUser = '/powergrid/sys/user/useradd',
  DeleteUser = '/powergrid/sys/user/delete',
  UpdateUser = '/powergrid/sys/user/update',
  SearchUser = '/powergrid/sys/user/retrieve',
}
const demoParam: getUserPageListParmas = {
  page: 1,
  pageSize: 10,
};
interface SearchUserParams {
  sortBy?: string;
  sortOrder?: string;
  // 所属单位
  organization?: string;
  //责任人
  personCharge?: string;
  //用户类型
  role?: string;
  //用户名
  userName?: string;
}
// 获取用户列表
export const getUserList = (params: getUserPageListParmas = demoParam) =>
  defHttp.get<getUserPageListData>({ url: Api.GetUserPageList, params });

// 添加用户
export const addUser = (userData: getUserPageListParmas = demoParam) =>
  defHttp.post<{ message: string }>({ url: Api.AddUser, data: userData });

// 删除用户
export const deleteUser = (userName: string) =>
  defHttp.delete<{ message: string }>({ url: `${Api.DeleteUser}/${userName}` });

// 更新用户
export const updateUser = (userName: number, userData: getUserPageListParmas = demoParam) =>
  defHttp.put<{ message: string }>({ url: `${Api.UpdateUser}/${userName}`, data: userData });

export const SearchUser = (params: SearchUserParams) =>
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
