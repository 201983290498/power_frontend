export type DetailType = undefined;
export type EvaluateId = string | number | undefined | null;
// 编写数据库中的基础类
/**
 * Device
 */
/**
 * Device
 */
export interface Device {
  equipId: number;
  equipNo: string;
  personCharge: string;
  score: number;
  evaluateTime: string; // 假设这是一个日期时间字符串，实际应用中可能需要Date类型或其他格式
  status: number;
  organization: string;
  runNo: string;
  substationName: string;
  operationTime: string; // 同上
  systemNominalVoltage: number;
  type: string;
  phase: number;
  location: string;
  capacity: number;
  ratedVoltage: number;
  connectionSymbol: string;
  noLoadCurrent: number;
  noLoadLoss: number;
  manufacturer: string;
  manufactureDate: string; // 同上
  factoryNo: string;
}

export interface Historydata {
  /*** 运维决策时间*/
  decTime: string;
  /**
   * 经济型寿命预测时间
   */
  ecoTime: string;
  /**
   * 设备编号
   */
  equipId: number;
  /**
   * 可靠性寿命预测时间
   */
  reliTime: string;
  /**
   * 状态评估时间
   */
  stateTime: string;
  /**
   * ID 编号
   */
  testId: number;
  [property: string]: any;
}
export interface Evaluate {
  /**
   * 设备id
   */
  equipId: number;
  evaluateId: EvaluateId;
  /**
   * 评估时间
   */
  evaluateTime: string;
  /**
   * 上次评估结果
   */
  lastResult: number;
  /**
   * 位置
   */
  location: string;
  /**
   * 责任人
   */
  personCharge: string;
  /**
   * 状态
   */
  status: string;
  /**
   * 设备类型
   */
  type: string;
  /**
   * 评估类型, 0状态，1可靠性，2经济性，3运维决策
   */
  class: number;
  [property: string]: any;
}
/**
 * 用户信息
 */
export interface User {
  // 上次登录时间
  lastLogin: string;
  // 权限等级
  level: number;
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
  userId: number;
  //用户名
  userName: string;
}

/**
 * StateEvaluation Input
 */
export interface StateInput {
  /**
   * 测试id
   */
  evaluateId?: EvaluateId;
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
  dcResistanceUnbalanceLow: number;
  /**
   * 直流电阻不平衡系数中压侧，1-3
   */
  dcResistanceUnbalanceMid: number;
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

  evaluateId?: EvaluateId;
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
   * 总烃含量(uL/L)
   */
  totalHydrocarbon: number;
  /**
   * 总烃绝对产气速率(%/月)
   */
  totalHyAbsolute: number;
  /**
   * 总烃相对产气速率(%/月)
   */
  totalHyRelative: number;
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
 * StateOutput
 */
export interface StateOutput {
  /**
   * 油中溶解气体劣化度信息
   */
  deterFactor1: number;
  /**
   * 电气试验劣化度信息
   */
  deterFactor2: number;
  /**
   * 油化试验劣化度信息
   */
  deterFactor3: number;
  /**
   * 变压器（本次评价的变压器的编号等简要变压器信息）
   */
  equiment: string;
  /**
   * 测试id
   */
  evaluateId: number;
  /**
   * 时间（在何时进行的本次状态评价）
   */
  evaluateTime: string;
  /**
   * 负责人（执行本次状态评价的负责人姓名）
   */
  personCharge: string;
  /**
   * 状态（输出：正常、严重等状态），评估状态
   */
  status: string;
  /**
   * 状态值（变压器健康指数或者劣化度等用来衡量变压器状态的一个数值）
   */
  statusValue: number;
  [property: string]: any;
}

/**
 * ReliabilityOutput
 */
export interface ReliabilityOutput {
  /**
   * 测试Id
   */
  evaluateId: EvaluateId;
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
export interface ReliabilityInput {
  /**
   * 外观检查评分"五项复选 输入参数为XXXXX五位二进制数0表示选中 最低位：变压器外观异常 第二位：变压器外壳接地不良 第三位：套管存在裂纹或放电痕迹 第四位：运行声响异常
   * 第五位：变压器存在漏油情况 "
   */
  appearanceScore?: number[] | string;
  /**
   * 每月平均温度
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
  evaluateId?: EvaluateId;
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
  runningCost?: number;
  [property: string]: any;
}

/**
 * EconomyInput
 */
export interface EconomyInput {
  /**
   * 年平均故障次数
   */
  annualAvgFailure: number;
  /**
   * 年故障中断供电时间
   */
  annualPowerOutageTime: number;
  /**
   * 年小修总费用
   */
  annualRepairCost: number;
  /**
   * 平均负载率
   */
  avgLoadRate: number;
  /**
   * 平均功率因数
   */
  avgPowerFactor: number;
  /**
   * 平均修复时间MTTR
   */
  avgRepairTime: number;
  /**
   * 清理费费率
   */
  cleaningFeeRate: number;
  /**
   * 折现率
   */
  discountRate: number;
  /**
   * 电价
   */
  electricityPrice: number;
  /**
   * 变压器设计寿命
   */
  equipDesignLife: number;
  /**
   * 变压器运行寿命
   */
  equipRunLife: number;
  /**
   * 测试Id
   */
  evaluateId?: number;
  /**
   * 第一次大修系数，存在第一次大修为1.否则为0
   */
  firstOverhaulFactor: number;
  /**
   * 第一次大修时间
   */
  firstOverhaulTime: number;
  /**
   * 初始其他成本
   */
  initialOtherCosts: number;
  /**
   * 安装调试成本
   */
  installationAndDebuggingCost: number;
  /**
   * 设备安装费
   */
  installFee: number;
  /**
   * 负载损耗
   */
  loadLoss: number;
  /**
   * 预防性维护的费用系数
   */
  maintainCostFactor: number;
  /**
   * 空载损耗（KW）
   */
  noneLoadLoss: number;
  /**
   * 单次大修总费用
   */
  overhaulCost: number;
  /**
   * 单位时间平均修复成本
   */
  pertimeAvgRepairCost: number;
  /**
   * 供电利润 （元/kwh）
   */
  powerProfit: number;
  /**
   * 购置成本（万元）
   */
  purchaseCost: number;
  /**
   * 额定容量
   */
  ratedCapacity: number;
  /**
   * 设备残值率
   */
  residualValueRate: number;
  /**
   * 第二次大修系数，存在第二次大修为1.否则为0
   */
  secondOverhaulFactor: number;
  /**
   * 第二次大修时间
   */
  secondOverhaulTime: number;

  /**
   * 运行成本
   */
  runningCost: number;

  /**
   * 投运时间
   */
  operationTime: string;
  [property: string]: any;
}

/**
 * EconomyOutput
 */
export interface EconomyOutput {
  /**
   * 年均成本
   */
  avgAnnualCost: number;
  /**
   * 测试Id
   */
  evaluateId: EvaluateId;
  /**
   * 寿命进程（经济性寿命/设计寿命）
   */
  lifespanProcess: number;
  /**
   * 运行年限
   */
  operatingYears: number;
  [property: string]: any;
}

/**
 * DecisionInput
 */
export interface DecisionInput {
  /**
   * 不同故障下事故成本
   */
  accidentCost: number | Array<number>;
  /**
   * 平均功率因素
   */
  averagePowerFactor: number;
  /**
   * 设备价值
   */
  equipmentValue: number;
  evaluateId?: EvaluateId;
  /**
   * 故障概率
   */
  faultProbability: number | Array<number>;
  /**
   * 变电站检修环境-故障修复成本修正系数
   */
  faultRepairCostFactor: number;
  /**
   * 负荷重要性
   */
  loadImportance: number;
  /**
   * 负荷等级
   */
  loadLevel: number;
  /**
   * 不同故障下切除负荷的几率
   */
  loadSheddingProbability: number | Array<number>;
  /**
   * 生产厂家
   */
  manufacturer: number;
  /**
   * 人员伤亡概率
   */
  personnelInjuryProbability: number | Array<number>;
  /**
   * 不同故障下的修复成本
   */
  repairCost: number | Array<number>;
  /**
   * 变电站重要性
   */
  substationImportance: number;
  /**
   * 变电站地位
   */
  substationStatus: number;
  /**
   * 变电站检修环境-系统风险修正系数
   */
  systemRiskCorrectionFactor: number;
  /**
   * 变压器容量
   */
  transformerCapacity: number;
  /**
   * 变压器负载率
   */
  transformerLoadRate: number;
  /**
   * 单位风险值
   */
  unitRiskValue: number;
  [property: string]: any;
}

/**
 * DecisionOutput
 */
export interface DecisionOutput {
  evaluateId: EvaluateId;
  /**
   * 检修内容
   */
  maintenanceContent: string;
  /**
   * 建议检修方式的风险收益成本比
   */
  riskRewardCostRatio: number;
  /**
   * 建议检修方式
   */
  suggestedMaintenanceMethod: string;
  [property: string]: any;
}
export interface HistoryRecordItem {
  /**
   * 年均成本
   */
  avgAnnualCost: number;
  /**
   * 油中溶解气体劣化度信息
   */
  deterFactor1: number;
  /**
   * 电气试验劣化度信息
   */
  deterFactor2: number;
  /**
   * 油化试验劣化度信息
   */
  deterFactor3: number;
  /**
   * 变压器（本次评价的变压器的编号等简要变压器信息）
   */
  equiment: string;
  /**
   * 设备编号
   */
  equipId: number;
  /**
   * 设备编号
   */
  equipNo: string;
  evaluateId: number;
  /**
   * 评估时间
   */
  evaluateTime: string;
  /**
   * 健康指数
   */
  healthIndex: number;
  /**
   * 热点温度
   */
  hotSpotTemper: number;
  /**
   * 上次评估结果
   */
  lastResult: number;
  /**
   * 寿命进程（剩余寿命/设计寿命）数值0%~100%
   */
  lifespanProcess: number;
  /**
   * 位置
   */
  location: string;
  /**
   * 检修内容
   */
  maintenanceContent: string;
  /**
   * 运行年限
   */
  operatingYears: number;
  /**
   * 责任人
   */
  personCharge: string;
  /**
   * 剩余可靠性寿命
   */
  resReliabilityLife: number;
  /**
   * 建议检修方式的风险收益成本比
   */
  riskRewardCostRatio: number;
  /**
   * 状态
   */
  status: string;
  /**
   * 状态值（变压器健康指数或者劣化度等用来衡量变压器状态的一个数值）
   */
  statusValue: number;
  /**
   * 建议检修方式
   */
  suggestedMaintenanceMethod: string;
  /**
   * ID 编号
   */
  testId: number;
  /**
   * 热寿命损失率
   */
  thermalLifeLossRate: number;
  /**
   * 类型
   */
  type: string;
  userId: number;
  evaluateId: number;
  [property: string]: any;
}
