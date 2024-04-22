import { defHttp } from '/@/utils/http/axios';
import { getDevicePageListParmas, getDevicePageListData } from './model/deviceModel';

enum Api {
  GetPageList = '/powergrid/sys/equipment',
  AddDevice = '/powergrid/sys/equipment/equipmentadd',
  DeleteDevice = '/powergrid/sys/equipment/delete',
  UpdateDevice = '/powergrid/sys/equipment/equipmentupdate',
  SearchDevice = '/powergrid/sys/equipment/retrieve',
}

const demoParam: getDevicePageListParmas = {
  page: 1,
  pageSize: 10,
  type: '',
};
export interface SearchDeviceParmas {
  page: string | number;
  pageSize: string | number;
  equipId?: number | string;
  equipNo?: string | number;
  type?: string;
  personCharge?: string;
  status?: string;
}

export const getDeviceList = (params: getDevicePageListParmas = demoParam) =>
  defHttp.get<getDevicePageListData>({ url: Api.GetPageList, params });
// 新增
// 添加设备
export const addDevice = (deviceData: getDevicePageListParmas = demoParam) =>
  defHttp.post<{ message: string }>({ url: Api.AddDevice, data: deviceData });

// 删除设备
export const deleteDevice = (equipId: number | string) =>
  defHttp.delete<{ message: string }>({ url: `${Api.DeleteDevice}/${equipId}` });

// 更新设备
export const updateDevice = (
  equipId: number | string,
  deviceData: getDevicePageListParmas = demoParam,
) => defHttp.put<{ message: string }>({ url: `${Api.UpdateDevice}/${equipId}`, data: deviceData });

export const searchDevice = (params: SearchDeviceParmas) =>
  defHttp.get<getDevicePageListData>({
    url: Api.SearchDevice,
    params,
  });
