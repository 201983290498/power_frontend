import { defHttp } from '/@/utils/http/axios';
import {
  SearchHistoryParmas,
  getHistoryPageListData,
  getHistoryPageListParmas,
  HistoryaddParams,
  HistoryexportParams,
  ExportHistoryData,
  HistoryViewParams,
  addHistoryResult,
} from './model/historyModal';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  GetPageList = '/powergrid/sys/historicaldata',
  AddHistory = '/powergrid/sys/historicaldata/add',
  ViewHistory = '/powergrid/sys/historicaldata/view',
  DeleteHistory = '/powergrid/sys/historicaldata/delete',
  ExportHistory = '/powergrid/sys/historicaldata/export',
  SearchHistory = '/powergrid/sys/historicaldata',
}

const demoParam: getHistoryPageListParmas = {
  page: 1,
  pageSize: 10,
};

export const getHistoryList = (params: getHistoryPageListParmas = demoParam) =>
  defHttp.get<getHistoryPageListData>({ url: Api.GetPageList, params });

export async function addHistory(params: HistoryaddParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<addHistoryResult>(
    {
      url: Api.AddHistory,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 删除历史数据
export const deleteHistory = (testId: number | string) =>
  defHttp.delete<{ message: string }>({ url: `${Api.DeleteHistory}/${testId}` });

// 导出历史数据信息
export async function exportHistory(params: HistoryexportParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<ExportHistoryData>(
    {
      url: Api.ExportHistory,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
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
