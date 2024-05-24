import {
  getDevicePageListParmas,
  getDevicePageListData,
  DeviceaddParams,
  SearchDeviceParmas,
  DeviceViewParams,
  DeviceupdateParams,
  DevicedeleteParams,
  RecentEvalResults,
  HealthStatusResults,
} from './model/deviceModel';
import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetPageList = '/powergrid/sys/equipment',
  AddDevice = '/powergrid/sys/equipment/equipmentadd',
  DeleteDevice = '/powergrid/sys/equipment/delete',
  UpdateDevice = '/powergrid/sys/equipment/update',
  SearchDevice = '/powergrid/sys/equipment',
  ViewDevice = '/powergrid/sys/equipment/retrieve',
  RecentStatus = '/powergrid/sys/equipment/retrieve/evaluate',
  HealthStatus = '/powergrid/sys/equipment/retrieve/statusevaluate',
}

const demoParam: getDevicePageListParmas = {};

export const getDeviceList = (params: getDevicePageListParmas = demoParam) =>
  defHttp.get<getDevicePageListData>({ url: Api.GetPageList, params });
// 新增
// 添加设备
/*/export const addDevice = (deviceData: getDevicePageListParmas = demoParam) =>
  defHttp.post<{ message: string }>({ url: Api.AddDevice, data: deviceData });*/
export function addDevice(params: DeviceaddParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.AddDevice,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 删除设备
export function deleteDevice(params: DevicedeleteParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete(
    {
      url: Api.DeleteDevice,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
// 更新设备
export function updateDevice(params: DeviceupdateParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.put(
    {
      url: Api.UpdateDevice,
      data: params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 新增搜索设备的函数
export const searchDevice = async (
  params: SearchDeviceParmas,
  mode: ErrorMessageMode = 'modal',
) => {
  return await defHttp.get<getDevicePageListData>(
    {
      url: Api.SearchDevice,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
};
//查看单个设备信息
export const viewDevice = async (params: DeviceViewParams, mode: ErrorMessageMode = 'modal') => {
  return await defHttp.get<getDevicePageListData>(
    {
      url: Api.ViewDevice,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
};

/*export const searchDevice = (params: SearchDeviceParmas) =>
  defHttp.get<getDevicePageListData>({
    url: Api.SearchDevice,
    params,
  });*/

export function getRecentStatus(params: DeviceViewParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<RecentEvalResults>(
    {
      url: Api.RecentStatus,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getHealthStatus(params: DeviceViewParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<HealthStatusResults>(
    {
      url: Api.HealthStatus,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
