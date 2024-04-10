import { defHttp } from '/@/utils/http/axios';
import { getDevicePageListParmas, getDevicePageListData } from './model/deviceModel';

enum Api {
  GetPageList = '/powergrid/sys/equipment',
  AddDevice = '/powergrid/sys/equipment/equipmentadd',
  DeleteDevice = '/powergrid/sys/equipment/delete',
  UpdateDevice = '/powergrid/sys/equipment/equipmentupdate',
}

const demoParam: getDevicePageListParmas = {
  page: 1,
  pageSize: 10,
};

export const getDeviceList = (params: getDevicePageListParmas = demoParam) =>
  defHttp.get<getDevicePageListData>({ url: Api.GetPageList, params });
// 新增
