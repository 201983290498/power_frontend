import { Device } from '/#/baseClass';
/**
 * @description: get device pagelist interface parameters
 */
export interface getDevicePageListParmas {
  page: string | number;
  pageSize: string | number;
  sortBy?: string | number;
  sortOrder?: string | number;
  equipId?: number | string;
  type?: string;
  location?: string;
}
export interface DeviceaddParams {
  fixedPwd: string;
  capacity: number;
  /**
   * 联结组标号
   */
  connectionSymbol: string;
  /**
   * 设备id
   */
  equipId: string;
  /**
   * 编号
   */
  equipNo: string;
  /**
   * 评估日期，为打分日期
   */
  evaluateTime?: string;
  /**
   * 出厂序号
   */
  factoryNo: string;
  /**
   * 安置地点，（室内/室外
   */
  location: string;
  /**
   * 制造日期，同上
   */
  manufactureDate: string;
  /**
   * 制造厂家
   */
  manufacturer: string;
  /**
   * 型号
   */
  type: string;
  /**
   * 空载电流
   */
  noLoadCurrent: number;
  /**
   * 空载损耗
   */
  noLoadLoss: number;
  /**
   * 投运时间，时间（2024-04-24）
   */
  operationTime: string;
  /**
   * 单位
   */
  organization: string;
  /**
   * 评估人
   */
  personCharge?: string;
  /**
   * 相数
   */
  phase: number;
  /**
   * 额定电压
   */
  ratedVoltage: number;
  /**
   * 运行编号
   */
  runNo: string;
  /**
   * 综合得分
   */
  score: number;
  /**
   * 状态，1上线0未上线
   */
  status: number;
  /**
   * 变电站名称
   */
  substationName: string;
  /**
   * 系统标称电压
   */
  systemNominalVoltage: number;
}
export interface SearchDeviceParmas {
  page: string | number;
  pageSize: string | number;
  equipId?: number | string;
  location?: string;
  type?: string;
}
export interface getDevicePageListData {
  pageCount: number; // 总页数
  rowCount: number; // 总的数据数量
  items: Device[]; // 设备总数
}
export interface DeviceViewParams {
  id: number | string;
}
