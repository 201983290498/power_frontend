import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { ReliabilityParam, ReliabilityReponse, SaveParam } from './model/reliabilityModel';
import { HistoryaddParams } from '../sys/model/historyModal';
import { useEvaluateStore } from '/@/store/modules/evaluate';
import { addHistory } from '../sys/history';

enum Api {
  Evaluate = '/powergrid/reliability/evaluate',
  RecordSave = '/powergrid/evaluate/save',
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
export async function saveReliableRcord(params: SaveParam) {
  await defHttp.get<any>({ url: Api.RecordSave, params });
  const evaluate = useEvaluateStore();
  const historyPararm: HistoryaddParams = {
    stateId: evaluate.getStateId,
    reliabilityId: params.evaluateId,
    decisionId: evaluate.getDevopsId,
    economyId: evaluate.getEconomicId,
    equipId: evaluate.getDeviceInfo?.equipId ?? '-1',
  };
  return addHistory(historyPararm);
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
