import { StateEnum } from '/@/enums/stateEnum';

export type DetailType = undefined;
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

/**
 * StateEvaluation Input
 */
export interface StateInput {
  /**
   * 测试id
   */
  evaluateId?: string;
  /**
   * 吸收比，高中低依次存储
   */
  absorptionRatio: number[];
  /**
   * 乙炔含量(uL/L)
   */
  acetylene: number;
  /**
   * 酸值
   */
  acidValue: number;
  /**
   * 击穿电压
   */
  breakdownVoltage: number;
  /**
   * 高压侧套管电容值Cx(pF)，ABCO
   */
  bushingCapacitance: number[];
  /**
   * 高压侧套管介质损耗tanδ(%)，ABCO
   */
  bushingDielectricLoss: number[];
  /**
   * 绕组电容量Cx(pF)，高中低依次存储
   */
  capacitance: number[];
  /**
   * CO含量(uL/L)
   */
  co: number;
  /**
   * CO2含量(uL/L)
   */
  co2: number;
  /**
   * 冷却系统状态
   */
  coolingSystemStatus: number;
  /**
   * 铁心泄露电流(uA)
   */
  coreLeakage: number;
  /**
   * 直流电阻不平衡系数高压侧，1-17
   */
  dcResistanceUnbalanceHigh: number[];
  /**
   * 直流电阻不平衡系数低压侧，1
   */
  dcResistanceUnbalanceLow: number[];
  /**
   * 直流电阻不平衡系数中压侧，1-3
   */
  dcResistanceUnbalanceMid: number[];
  /**
   * 绕组介质损耗tanδ(%)，高中低依次存储
   */
  dielectricLoss: number[];
  /**
   * 乙烷含量(uL/L)
   */
  ethane: number;
  /**
   * 乙烯含量(uL/L)
   */
  ethylene: number;
  /**
   * 家族缺陷
   */
  familyDefect: number;
  /**
   * 糠醛含量
   */
  furfuralContent: number;
  /**
   * 湿度
   */
  humidity: number;
  /**
   * 氢气含量(uL/L)
   */
  hydrogen: number;
  /**
   * 巡检记录
   */
  inspectionRecord: number;
  /**
   * 绝缘电阻，高中低依次存储
   */
  insRes: number[];
  /**
   * 甲烷含量(uL/L)
   */
  methane: number;
  /**
   * 微水
   */
  microWaterContent: number;
  /**
   * 油介损
   */
  oilDielectricLoss: number;
  /**
   * 油温
   */
  oilTemperature: number;
  /**
   * 局部放电量
   */
  partDischargeNum: number;
  /**
   * 保护装置状态
   */
  protectionDeviceStatus: number;
  /**
   * 分接开关状态
   */
  tapSwitcherStatus: number;
  /**
   * 运行环境年平均温度
   */
  temperature: number | string;
  /**
   * 测试装置状态
   */
  testingDeviceStatus: number;
  /**
   * 总烃绝对产气速率(%/月)
   */
  totalHAbsolute: number;
  /**
   * 总烃相对产气速率(%/月)
   */
  totalHRelative: number;
  /**
   * 总烃含量(uL/L)
   */
  totalHydrocarbon: number;
  /**
   * 绕组直流电阻(高压侧)AO17，1-17
   */
  windingDcResistanceHighAO?: number[];
  /**
   * 绕组直流电阻(高压侧)BO17，1-17
   */
  windingDcResistanceHighBO?: number[];
  /**
   * 绕组直流电阻(高压侧)CO1，1-17
   */
  windingDcResistanceHighCO?: number[];
  /**
   * 绕组直流电阻(低压侧)，ab;bc;ca
   */
  windingDcResistanceLow: number[];
  /**
   * 绕组直流电阻(中压侧)，ABC
   */
  windingDcResistanceMid: number[];
  [property: string]: any;
}

/**
 * StateEvaluation Output
 */
export interface StateOutput {
  evaluateId: string;
  /**
   * 变压器（本次评价的变压器的编号等简要变压器信息）
   */
  equiment: { [key: string]: any };
  /**
   * 时间（在何时进行的本次状态评价）
   */
  evalTime: string;
  /**
   * 负责人（执行本次状态评价的负责人姓名）
   */
  personCharge: string;
  /**
   * 状态（输出：正常、严重等状态）
   */
  status: StateEnum;
  /**
   * 状态值（变压器健康指数或者劣化度等用来衡量变压器状态的一个数值）
   */
  statusValue: number;
  [property: string]: any;
}
