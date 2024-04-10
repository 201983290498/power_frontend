// 编写数据库中的基础类
export interface Device {
  // 设备类
  equipId: number | string;
  equipNo: string | number;
  location: string;
  type: string;
  personCharge: string;
  score: number | string;
  evaluateTime: string;
  status: string;
}
