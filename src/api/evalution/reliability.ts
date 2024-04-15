import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { ReliabilityParam, ReliabilityReponse, SaveParam } from './model/reliabilityModel';

enum Api {
  Evaluate = '/powergrid/reliability/evaluate',
  RecordSave = '/powergrid/reliability/save',
  GetInputById = '/powergrid/reliability/retrieve/input',
  GetOutputById = '/powergrid/reliability/retrieve/output',
}

/**
 * @description: state evaluation
 */
export function reliableEvaluation(params: ReliabilityParam, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<ReliabilityReponse>( // 指定返回的对象
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
export function saveReliableRcord(params: SaveParam) {
  return defHttp.get<any>({ url: Api.RecordSave, params });
}

/**
 * @description 查看某测测评的输入
 * @param params 测评id
 * @returns 每次测评的输入
 */
export function getReliableRecordInput(params: SaveParam) {
  return defHttp.get<ReliabilityParam>({ url: Api.GetInputById, params });
}

/**
 * @description 查看某测测评的输出
 */
export function getReliableRecordOutput(params: SaveParam) {
  return defHttp.get<ReliabilityReponse>({ url: Api.GetOutputById, params });
}
