import { Historydata, item } from '/#/baseClass';

import {
  StateEvaluateInput,
  StateEvaluateOutput,
  ReliabilityEvaluateInput,
  ReliabilityEvaluateOutput,
  EconomyEvaluateInput,
  EconomyEvaluateOutput,
  DecisionEvaluateInput,
  DecisionEvaluateOutput,
} from '/#/historyRecord';

/**
 * @description: get device pagelist interface parameters
 */
export interface getHistoryPageListParmas {
  page: string | number;
  pageSize: string | number;
  sortBy?: string;
  sortOrder?: string;
  testId?: number | string;
  equipId?: string | number;
  stateTime?: string;
  reliTime?: string;
  ecoTime?: string;
  decTime?: string;
}
export interface HistoryaddParams {
  equipId: string | number;
  stateId: string | number;
  reliabilityId: string | number;
  economyId: string | number;
  decisionId: string | number;
}
export interface HistoryexportParams {
  testId: number | string;
}
export interface SearchHistoryParmas {
  page: string | number;
  pageSize: string | number;
  equipId?: number | string;
  testId?: string;
}
export interface getHistoryPageListData {
  pageCount: number; // 总页数
  rowCount: number; // 总的数据数量
  items: item[]; // 历史总数
}
export interface HistoryViewParams {
  testId: number;
  evaluateType: number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExportHistoryData {
  result: HistoryDataResult;
}
export interface Evaluate<TInput, TOutput> {
  input: TInput;
  output: TOutput;
}

export interface HistoryDataResult {
  stateEvaluate: Evaluate<StateEvaluateInput, StateEvaluateOutput>;
  reliabilityEvaluate: Evaluate<ReliabilityEvaluateInput, ReliabilityEvaluateOutput>;
  economyEvaluate: Evaluate<EconomyEvaluateInput, EconomyEvaluateOutput>;
  decisionEvaluate: Evaluate<DecisionEvaluateInput, DecisionEvaluateOutput>;
}
