import { StateInput } from '/#/baseClass';

const resistance = ['高-中低及地(MΩ)', '中-高低及地(MΩ)', '低-高中及地(MΩ)'];
const gearNames: string[] = [];

for (let i = 1; i <= 16; i++) {
  gearNames.push(`挡位${i}`);
}
export const stateItemDict = {
  absorptionRatio: ['吸收比', ...resistance],

  acetylene: '乙炔含量(uL/L)',

  acidValue: '酸值',

  breakdownVoltage: '击穿电压',

  bushingCapacitance: ['高压侧套管电容值', 'A', 'B', 'C', 'O'],

  bushingDielectricLoss: ['高压侧套管介质损耗tanδ(%)', 'A', 'B', 'C', 'O'],

  capacitance: ['绕组电容量Cx(pF)', ...resistance],

  co: 'CO含量(uL/L)',

  co2: 'CO2含量(uL/L)',

  coolingSystemStatus: '冷却系统状态',

  coreLeakage: '铁心泄露电流(uA)',

  dcResistanceUnbalanceHigh: ['直流电阻不平衡系数高压侧', ...gearNames],

  dcResistanceUnbalanceLow: ['直流电阻不平衡系数低压侧', gearNames[0]],

  dcResistanceUnbalanceMid: ['直流电阻不平衡系数中压侧', gearNames[0], gearNames[1], gearNames[2]],

  dielectricLoss: ['绕组介质损耗tanδ(%)', ...resistance],

  ethane: '乙烷含量(uL/L)',

  ethylene: '乙烯含量(uL/L)',

  familyDefect: '家族缺陷',

  furfuralContent: '糠醛含量(uL/L)',

  humidity: '湿度',

  hydrogen: '氢气含量(uL/L)',

  inspectionRecord: '巡检记录',

  insRes: ['绝缘电阻(MΩ)', ...resistance],

  methane: '甲烷含量(uL/L)',

  microWaterContent: '微水含量(uL/L)',

  oilDielectricLoss: '油介损耗',

  oilTemperature: '油温(℃)',

  partDischargeNum: '局部放电量',

  protectionDeviceStatus: '保护装置状态',

  tapSwitcherStatus: '分接开关状态',

  temperature: '运行环境年平均温度(℃)',

  testingDeviceStatus: '测试装置状态',

  totalHAbsolute: '总烃绝对产气速率(%/月)',

  totalHRelative: '总烃相对产气速率(%/月)',

  totalHydrocarbon: '总烃含量(uL/L)',

  windingDcResistanceHighAO: ['绕组直流电阻(高压侧)AO', ...gearNames],

  windingDcResistanceHighBO: ['绕组直流电阻(高压侧)BO', ...gearNames],

  windingDcResistanceHighCO: ['绕组直流电阻(高压侧)CO', ...gearNames],

  windingDcResistanceLow: ['绕组直流电阻(低压侧)', 'ab', 'bc', 'ca'],

  windingDcResistanceMid: ['绕组直流电阻(中压侧)', 'AmOm', 'BmOm', 'CmOm'],
};

export const inputDemo: StateInput = {
  temperature: 'esse occaecat nisi',
  humidity: 35,
  hydrogen: 95,
  methane: 77,
  ethane: 12,
  acetylene: 52,
  ethylene: 16,
  co: 66,
  co2: 52,
  totalHydrocarbon: 35,
  totalHRelative: 91,
  totalHAbsolute: 55,
  oilTemperature: 35,
  insRes: [64, 63, 92],
  absorptionRatio: [72, 20, 23],
  dielectricLoss: [4, 84, 16],
  capacitance: [76],
  coreLeakage: 23,
  windingDcResistanceHighAO: [56, 28, 46],
  windingDcResistanceHighBO: [75],
  windingDcResistanceHighCO: [47, 48, 57],
  windingDcResistanceMid: [29, 72],
  windingDcResistanceLow: [75, 68],
  dcResistanceUnbalanceHigh: [5, 48, 97],
  dcResistanceUnbalanceMid: [61, 61, 68],
  dcResistanceUnbalanceLow: [90],
  bushingDielectricLoss: [46, 81],
  bushingCapacitance: [14, 42],
  partDischargeNum: 32,
  microWaterContent: 36,
  breakdownVoltage: 5,
  oilDielectricLoss: 94,
  furfuralContent: 74,
  acidValue: 77,
  inspectionRecord: 96,
  familyDefect: 33,
  coolingSystemStatus: 5,
  tapSwitcherStatus: 13,
  protectionDeviceStatus: 10,
  testingDeviceStatus: 20,
};
