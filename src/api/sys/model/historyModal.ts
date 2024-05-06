import { Historydata } from '/#/baseClass';
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
  equipId: number;
  stateId: number;
  reliabilityId: number;
  economyId: number;
  decisionId: number;
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
  items: Historydata[]; // 设备总数
}
export interface HistoryViewParams {
  testId: number;
  evaluateType: number;
}
