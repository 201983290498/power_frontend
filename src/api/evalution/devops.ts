import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { DevopsParam, DevopsResponse, SaveParam } from './model/devopsModel';

enum Api {
  Evaluate = '/powergrid/decision/evaluate',
  RecordSave = '/powergrid/evaluate/save',
  GetInputById = '/powergrid/decision/retrieve/input',
  GetOutputById = '/powergrid/decision/retrieve/output',
}

/**
 * @description: state evaluation
 */
export function devopsEvaluation(params: DevopsParam, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<DevopsResponse>( // 指定返回的对象
    {
      url: Api.Evaluate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 保存某测测评的输入
 */
export function saveEconomyRcord(params: SaveParam) {
  return defHttp.get<any>({ url: Api.RecordSave, params });
}

/**
 * @description 查看某测测评的输入
 * @param params 测评id
 * @returns 每次测评的输入
 */
export function getDevopsRecordInput(params: SaveParam) {
  return defHttp.get<DevopsParam>({ url: Api.GetInputById, params });
}

/**
 * @description 查看某测测评的输出
 */
export function getDevopsRecordOutput(params: SaveParam) {
  return defHttp.get<DevopsResponse>({ url: Api.GetOutputById, params });
}
