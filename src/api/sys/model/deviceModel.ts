import { Device } from '/#/baseClass';
/**
 * @description: get device pagelist interface parameters
 */
export interface getDevicePageListParmas {
  page: string | number;
  pageSize: string | number;
  sortBy?: string;
  sortOrder?: string;
  id?: string | number;
  type?: string;
  location?: string;
}

export interface getDevicePageListData {
  pageCount: number; // 总页数
  rowCount: number; // 总的数据数量
  items: Device[]; // 设备总数
}
