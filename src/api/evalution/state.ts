import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { StateParam, StateReponse, SaveParam } from './model/stateModel';
import { HistoryaddParams } from '../sys/model/historyModal';
import { useEvaluateStore } from '/@/store/modules/evaluate';
import { addHistory } from '../sys/history';

enum Api {
  Evaluate = '/powergrid/state/evaluate',
  RecordSave = '/powergrid/evaluate/save',
  GetInputById = '/powergrid/state/retrieve/input',
  GetOutputById = '/powergrid/state/retrieve/output',
}

/**
 * @description: state evaluation
 */
export function stateEvaluation(params: StateParam, mode: ErrorMessageMode = 'modal') {
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
export async function saveStateRcord(params: SaveParam) {
  await defHttp.get<any>({ url: Api.RecordSave, params });
  const evaluate = useEvaluateStore();
  const historyPararm: HistoryaddParams = {
    stateId: params.evaluateId,
    reliabilityId: evaluate.getReliabilityId,
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
export async function getStateRecordInput(params: SaveParam) {
  return defHttp.get<StateParam>({ url: Api.GetInputById, params });
}

/**
 * @description 查看某测测评的输出
 */
export async function getStateRecordOutput(params: SaveParam) {
  return defHttp.get<StateReponse>({ url: Api.GetOutputById, params });
}
