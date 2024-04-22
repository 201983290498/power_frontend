import { Device } from '/#/baseClass';
/**
 * @description: get device pagelist interface parameters
 */
export interface getDevicePageListParmas {
  page: string | number;
  pageSize: string | number;
  equipId?: number | string;
  equipNo?: string | number;
  location?: string;
  type: string;
  personCharge?: string;
  score?: number | string;
  evaluateTime?: string;
  status?: string;
}

export interface getDevicePageListData {
  pageCount: number; // 总页数
  rowCount: number; // 总的数据数量
  items: Device[]; // 设备总数
}
