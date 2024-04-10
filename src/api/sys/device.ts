import { defHttp } from '/@/utils/http/axios';
import { getDevicePageListParmas, getDevicePageListData } from './model/deviceModel';
import { ErrorMessageMode } from '/#/axios';

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

export function getDeviceList(
  params: getDevicePageListParmas = demoParam,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.get<getDevicePageListData>(
    { url: Api.GetPageList, params },
    { errorMessageMode: mode },
  );
}

// 新增
