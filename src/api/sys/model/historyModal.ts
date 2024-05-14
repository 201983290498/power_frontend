import { Historydata } from '/#/baseClass';
<<<<<<< HEAD
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
=======
import { EvaluateId } from '/#/baseClass';
>>>>>>> 99d7249b44392425ee9ad8383abc2508850fd5dc
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
  equipId: EvaluateId;
  stateId: EvaluateId;
  reliabilityId: EvaluateId;
  economyId: EvaluateId;
  decisionId: EvaluateId;
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
  items: Historydata[]; // 历史总数
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
