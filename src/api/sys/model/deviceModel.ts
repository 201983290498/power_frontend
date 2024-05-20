import { Device } from '/#/baseClass';
/**
 * @description: get device pagelist interface parameters
 */
export interface getDevicePageListParmas {
  page?: string | number;
  pageSize?: string | number;
  sortBy?: string | number;
  sortOrder?: string | number;
  equipNo?: number | string;
  type?: string;
  location?: string;
  status?: string | number;
  equipId?: number | string;
  equipName?: string;
}
export interface DeviceupdateParams {
  fixedPwd: string;
  equipment: Device;
}

export interface DeviceaddParams {
  fixedPwd: string;
  equipment: Partial<Device>;
}
export interface SearchDeviceParmas {
  page: string | number;
  pageSize: string | number;
  equipId?: number | string;
  location?: string;
  type?: string;
}
export interface DevicedeleteParams {
  fixedPwd: string;
  equipId: number | string;
}
export interface getDevicePageListData {
  data(data: any): unknown;
  pageCount: number; // 总页数
  rowCount: number; // 总的数据数量
  items: Device[]; // 设备总数
}
export interface DeviceViewParams {
  id: number | string;
}
