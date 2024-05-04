import { defHttp } from '/@/utils/http/axios';
import {
  SearchHistoryParmas,
  getHistoryPageListData,
  getHistoryPageListParmas,
  HistoryaddParams,
  HistoryViewParams,
} from './model/historyModal';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  GetPageList = '/powergrid/sys/historicaldata',
  AddHistory = '/powergrid/sys/historicaldata/add',
  ViewHistory = '/powergrid/sys/historicaldata/view',
  DeleteHistory = '/powergrid/sys/historicaldata/delete',
  ImportHistory = '/powergrid/sys/historicaldata/export',
  SearchHistory = '/powergrid/sys/historicaldata',
}

const demoParam: getHistoryPageListParmas = {
  page: 1,
  pageSize: 10,
};

export const getHistoryList = (params: getHistoryPageListParmas = demoParam) =>
  defHttp.get<getHistoryPageListData>({ url: Api.GetPageList, params });
// 新增
// 添加设备
/*/export const addDevice = (deviceData: getDevicePageListParmas = demoParam) =>
  defHttp.post<{ message: string }>({ url: Api.AddDevice, data: deviceData });*/
export async function addHistory(params: HistoryaddParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.AddHistory,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export const exportHistory = async (
  params: getHistoryPageListParmas,
  mode: ErrorMessageMode = 'modal',
) => {
  return await defHttp.get<getHistoryPageListData>(
    {
      url: Api.ImportHistory,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
};

// 删除历史数据
export const deleteHistory = (testId: number | string) =>
  defHttp.delete<{ message: string }>({ url: `${Api.DeleteHistory}/${testId}` });

// 导出历史数据信息

// 新增历史数据的函数
export const searchHistory = async (
  params: SearchHistoryParmas,
  mode: ErrorMessageMode = 'modal',
) => {
  return await defHttp.get<getHistoryPageListData>(
    {
      url: Api.SearchHistory,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
};
// 查看单个历史数据
export const viewHistory = async (params: HistoryViewParams, mode: ErrorMessageMode = 'modal') => {
  return await defHttp.get<getHistoryPageListData>(
    {
      url: Api.ViewHistory,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
};
