import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { EconomyParam, EconomyReponse, SaveParam } from './model/economyModel';
import { HistoryaddParams } from '../sys/model/historyModal';
import { useEvaluateStore } from '/@/store/modules/evaluate';
import { addHistory } from '../sys/history';

enum Api {
  Evaluate = '/powergrid/economy/evaluate',
  RecordSave = '/powergrid/evaluate/save',
  GetInputById = '/powergrid/economy/retrieve/input',
  GetOutputById = '/powergrid/economy/retrieve/output',
}

/**
 * @description: state evaluation
 */
export function economyEvaluation(params: EconomyParam, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<EconomyReponse>( // 指定返回的对象
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
export async function saveEconomyRcord(params: SaveParam) {
  await defHttp.get<any>({ url: Api.RecordSave, params });
  const evaluate = useEvaluateStore();
  const historyPararm: HistoryaddParams = {
    stateId: evaluate.getStateId,
    reliabilityId: evaluate.getReliabilityId,
    decisionId: evaluate.getDevopsId,
    economyId: params.evaluateId,
    equipId: evaluate.getDeviceInfo?.equipId ?? '-1',
  };
  return addHistory(historyPararm);
}

/**
 * @description 查看某测测评的输入
 * @param params 测评id
 * @returns 每次测评的输入
 */
export function getEconomyRecordInput(params: SaveParam) {
  return defHttp.get<EconomyParam>({ url: Api.GetInputById, params });
}

/**
 * @description 查看某测测评的输出
 */
export function getEconomyRecordOutput(params: SaveParam) {
  return defHttp.get<EconomyReponse>({ url: Api.GetOutputById, params });
}
