import { FormSchema } from '/@/components/Form/src/types/form';
import { createFormSchema, createList } from '/@/utils/listToFiled';

const rankNames: string[] = [];
for (let i = 1; i <= 17; i++) {
  rankNames.push(`档位${i}`);
}
const dirNames: string[] = ['高-中低及地', '中-高低及地', '低-高中及地'];
const AmOm: string[] = ['AmOm', 'BmOm', 'CmOm'];
const abc: string[] = ['ab', 'bc', 'ca'];
const ABCD: string[] = ['A', 'B', 'C', 'D'];

export const step1Schemas: FormSchema[] = [
  createFormSchema('temperature', '运行环境年平均温度', '50%', 2, 12),
  createFormSchema('humidity', '湿度', '50%', 2, 12),
];

export const step2Schemas: FormSchema[] = [
  createFormSchema('hydrogen', '氢气含量(uL/L)', '60%', 2, 6),
  createFormSchema('methane', '甲烷含量(uL/L)', '60%', 2, 6),
  createFormSchema('ethane', '乙烷含量(uL/L)', '60%', 2, 6),
  createFormSchema('acetylene', '乙炔含量(uL/L)', '60%', 2, 6),
  createFormSchema('ethylene', '乙烯含量(uL/L)', '60%', 2, 6),
  createFormSchema('co', 'CO含量(uL/L)', '60%', 2, 6),
  createFormSchema('co2', 'CO2含量(uL/L)', '60%', 2, 6),
  createFormSchema('totalHydrocarbon', '总烃含量(uL/L)', '60%', 2, 6),
  createFormSchema('totalHyRelative', '总烃相对产气速率(%/月)', '60%', 2, 6),
  createFormSchema('totalHyAbsolute', '总烃绝对产气速率(%/月)', '60%', 2, 6),
];

export const step3Schemas: FormSchema[] = [
  createFormSchema('oilTemperature', '油温', '60%', 2, 8),
  createFormSchema('coreLeakage', '铁心泄露电流(uA)', '60%', 2, 8),
  createFormSchema('partDischargeNum', '局部放电量', '60%', 2, 8),
  ...createList('绝缘电阻', 'insRes', dirNames, '60%', 8, 2),
  ...createList('吸收比', 'absorptionRatio', dirNames, '60%', 8, 3),
  ...createList('绕组介质损耗tanδ(%)', 'dielectricLoss', dirNames, '60%', 8, 3),
  ...createList('绕组电容量Cx(pF)', 'capacitance', dirNames, '60%', 8, 2),
  ...createList('绕组直流电阻(高压侧)AO', 'windingDcResistanceHighAO', rankNames),
  ...createList('绕组直流电阻(高压侧)BO', 'windingDcResistanceHighBO', rankNames),
  ...createList('绕组直流电阻(高压侧)CO', 'windingDcResistanceHighCO', rankNames),
  ...createList('绕组直流电阻(中压侧)', 'windingDcResistanceMid', AmOm, '60%', 8, 3),
  ...createList('绕组直流电阻(低压侧)', 'windingDcResistanceLow', abc, '60%', 8, 3),
  ...createList('直流电阻不平衡系数高压侧', 'dcResistanceUnbalanceHigh', rankNames),
  ...createList(
    '直流电阻不平衡系数中压侧',
    'dcResistanceUnbalanceMid',
    rankNames.slice(0, 1),
    '60%',
    6,
    3,
  ),
  ...createList(
    '直流电阻不平衡系数低压侧',
    'dcResistanceUnbalanceLow',
    rankNames.slice(0, 1),
    '60%',
    6,
    3,
  ),
  ...createList('高压侧套管介质损耗tanδ(%)', 'bushingDielectricLoss', ABCD, '60%', 6, 4),
  ...createList('高压侧套管电容值Cx(pF)', 'bushingCapacitance', ABCD, '60%', 6, 2),
];

export const step4Schemas: FormSchema[] = [
  createFormSchema('microWaterContent', '微水', '60%', 2, 8),
  createFormSchema('breakdownVoltage', '击穿电压', '60%', 2, 8),
  createFormSchema('oilDielectricLoss', '油介损', '60%', 2, 8),
  createFormSchema('furfuralContent', '糠醛含量', '60%', 2, 8),
  createFormSchema('acidValue', '酸值', '60%', 2, 8),
];

export const step5Schemas: FormSchema[] = [
  createFormSchema('inspectionRecord', '巡检记录', '60%', 2, 8),
  createFormSchema('familyDefect', '家族缺陷', '60%', 2, 8),
  createFormSchema('coolingSystemStatus', '冷却系统状态', '60%', 2, 8),
  createFormSchema('tapSwitcherStatus', '分接开关状态', '60%', 2, 8),
  createFormSchema('protectionDeviceStatus', '保护装置状态', '60%', 2, 8),
  createFormSchema('testingDeviceStatus', '测试装置状态', '60%', 2, 8),
];
