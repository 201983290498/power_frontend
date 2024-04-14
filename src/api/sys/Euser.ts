import { defHttp } from '/@/utils/http/axios';
import { getUserPageListData, getUserPageListParmas } from './model/userModel';
enum Api {
  GetUserPageList = '/powergrid/sys/user',
  AddUser = '/powergrid/sys/user/useradd',
  DeleteUser = '/powergrid/sys/user/delete',
  UpdateUser = '/powergrid/sys/user/update',
}
const demoParam: getUserPageListParmas = {
  page: 1,
  pageSize: 10,
};
export const getUserList = (params: getUserPageListParmas = demoParam) =>
  defHttp.get<getUserPageListData>({ url: Api.GetUserPageList, params });
// 新增
