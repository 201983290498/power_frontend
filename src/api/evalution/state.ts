import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';
import { StateParam, StateReponse, SaveParam } from './model/stateModel';

enum Api {
  Evaluate = '/powergrid/status-assessing',
  RecordSave = '/powergrid/status/save',
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

export function stateRcordSave(params: SaveParam) {
  return defHttp.get<any>({ url: Api.RecordSave, params });
}
