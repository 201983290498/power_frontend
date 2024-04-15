import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { StateParam, StateReponse, SaveParam } from './model/stateModel';

enum Api {
  Evaluate = '/powergrid/status/evaluate',
  RecordSave = '/powergrid/status/save',
  GetInputById = '/powergrid/status/retrieve/input',
  GetOutputById = '/powergrid/status/retrieve/output',
}

/**
 * @description: state evaluation
 */
export function stateEvaluation(
  params: StateParam & { userId?: string; deviceId?: string },
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<StateReponse>( // 指定返回的对象
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
export function saveStateRcord(params: SaveParam) {
  return defHttp.get<any>({ url: Api.RecordSave, params });
}

/**
 * @description 查看某测测评的输入
 * @param params 测评id
 * @returns 每次测评的输入
 */
export function getStateRecordInput(params: SaveParam) {
  return defHttp.get<StateParam>({ url: Api.GetInputById, params });
}

/**
 * @description 查看某测测评的输出
 */
export function getStateRecordOutput(params: SaveParam) {
  return defHttp.get<StateReponse>({ url: Api.GetOutputById, params });
}
