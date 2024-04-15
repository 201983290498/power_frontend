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
export interface User {
  // 上次登录时间
  lastLogin: string;
  // 权限等级
  level: number | string;
  // 所属单位
  organization: string;
  // 密码
  password: string;
  //责任人
  personCharge: string;
  //用户了
  role: string;
  /**
   * ID编号，前端不展示
   */
  userID: number;
  //用户名
  userName: string;
}

/**
 * StateEvaluation Input
 */
/**
 * StateInput
 */
export interface StateInput {
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
  temperature: number;
  /**
   * 测试装置状态
   */
  testingDeviceStatus: number;
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
  /**
   * 测试id
   */
  evaluateId?: string | number;
  /**
   * 总烃绝对产气速率(%/月)
   */
  totalHyAbsolute: number;
  /**
   * 总烃相对产气速率(%/月)
   */
  totalHyRelative: number;
  [property: string]: any;
}

/**
 * StateEvaluation Output
 */
/**
 * StateOutput
 */
export interface StateOutput {
  /**
   * 变压器（本次评价的变压器的编号等简要变压器信息）
   */
  equiment: { [key: string]: any };
  /**
   * 测试id
   */
  evaluateId: string;
  /**
   * 时间（在何时进行的本次状态评价）
   */
  evaluateTime: string;
  /**
   * 负责人（执行本次状态评价的负责人姓名）
   */
  personCharge: string;
  /**
   * 状态（输出：正常、严重等状态）
   */
  status: string;
  /**
   * 状态值（变压器健康指数或者劣化度等用来衡量变压器状态的一个数值）
   */
  statusValue: string;
  [property: string]: any;
}

/**
 * ReliabilityOutput
 */
export interface ReliabilityOutput {
  /**
   * 测试Id
   */
  evaluateId: string;
  /**
   * 健康指数
   */
  healthIndex: number;
  /**
   * 热点温度
   */
  hotSpotTemper: number;
  /**
   * 寿命进程（剩余寿命/设计寿命）数值0%~100%
   */
  lifespanProcess: number;
  /**
   * 剩余可靠性寿命
   */
  ResReliabilityLife: number;
  /**
   * 热寿命损失率
   */
  thermalLifeLossRate: number;
  [property: string]: any;
}

/**
 * ReliabilityInput
 */
/**
 * ReliabilityInput
 */
export interface ReliabilityInput {
  /**
   * 外观检查评分"五项复选 输入参数为XXXXX五位二进制数0表示选中 最低位：变压器外观异常 第二位：变压器外壳接地不良 第三位：套管存在裂纹或放电痕迹 第四位：运行声响异常
   * 第五位：变压器存在漏油情况 "
   */
  appearanceScore?: number[];
  /**
   * 每月平均热点温度
   */
  avgmonthHotspotTemper?: number;
  /**
   * 容量
   */
  capacity?: number;
  /**
   * 联结组标号
   */
  connectionSymbol?: string;
  /**
   * 设计寿命
   */
  designLife?: number;
  /**
   * 电气试验记录试验异常情况"二选一 （0无异常/ 1有异常）"
   */
  electricalRecordSituation?: number;
  /**
   * 变压器编号
   */
  equipNo: string;
  /**
   * 测试Id
   */
  evaluateId?: string | number;
  /**
   * 出厂序号
   */
  factoryNo?: string;
  /**
   * 家族运行状况数值（评分1~3） 1：同类变压器存在大量不良记录 2.同类变压器存在个别不良记录 3：同类变压器无不良记录
   */
  familyHealth?: number;
  /**
   * 负载电流
   */
  loadCurrent: number;
  /**
   * 负载损耗
   */
  loadLoss?: number;
  /**
   * 空载损耗变化量
   */
  loadLossChange?: number;
  /**
   * 变压器安置地点（室内/室外）
   */
  location?: string;
  /**
   * 检修情况"二选一 （0检修处理得当，无缺陷 /1检修后投运但有轻微缺陷）"
   */
  maintenanceCondition?: number;
  /**
   * 制造日期
   */
  manufactureDate?: string;
  /**
   * 制造厂家
   */
  manufacturer?: string;
  /**
   * 型号
   */
  model?: string;
  /**
   * 空载电流
   */
  noLoadCurrent?: number;
  /**
   * 空载电流
   */
  noloadCurrent: number;
  /**
   * 空载损耗
   */
  noLoadLoss?: number;
  /**
   * 负载损耗变化量
   */
  noLoadLossChange?: number;
  /**
   * 空载损耗
   */
  noLoadLossKey?: number;
  /**
   * 油色谱分析试验异常情况"二选一 （0无异常/ 1有异常）"
   */
  oilChromatographicSituation?: number;
  /**
   * 油中糠醛指数
   */
  oilFurfuralindex?: number;
  /**
   * 油化试验异常情况 "二选一 （0无异常/ 1有异常）"
   */
  oilSituation?: number;
  /**
   * 运行环境选择四项单选 00：无特殊环境 01：高海拔环境 10：高温环境 11：雨雪、低温环境
   */
  operatingEnvironment?: string;
  /**
   * 有无操作/雷击过电压 （0无/ 1有）
   */
  operatingOrLightningOvervoltage?: number;
  /**
   * 投运时间
   */
  operationTime?: string;
  /**
   * 单位名称
   */
  organization: string;
  /**
   * 相数
   */
  phase?: number;
  /**
   * A相短路阻抗变化量
   */
  phaseAChange?: number;
  /**
   * B相短路阻抗变化量
   */
  phaseBChange?: number;
  /**
   * C相短路阻抗变化量
   */
  phaseCChange?: number;
  /**
   * 额定电流
   */
  ratedCurrent?: number;
  /**
   * 额定电压
   */
  ratedVoltage?: number;
  /**
   * 运行编号
   */
  runNo?: string;
  /**
   * 有无短期急救负载（0无/ 1有）
   */
  shortTermAidLoad?: number;
  /**
   * 变电站名称
   */
  substationName?: string;
  /**
   * 系统标称电压
   */
  systemNominalVoltage?: number;
  /**
   * 环境温度
   */
  temperature?: number;
  /**
   * 0热改性/1非热改性
   */
  thermalModification?: number;
  /**
   * 三相电抗最大差值
   */
  threePhaseRactanceMaxDiff?: number;
  [property: string]: any;
}
