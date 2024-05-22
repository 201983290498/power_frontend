import { FormSchema } from '/@/components/Form/src/types/form';
import { createDivider, createFormSchema, createList } from '/@/utils/listToFiled';

const rankNames: string[] = [];
for (let i = 1; i <= 17; i++) {
  rankNames.push(`档位${i}`);
}
const dirNames: string[] = ['高-中低及地', '中-高低及地', '低-高中及地'];
const AmOm: string[] = ['AmOm', 'BmOm', 'CmOm'];
const abc: string[] = ['AB', 'BC', 'CA'];
const ABCD: string[] = ['A', 'B', 'C', 'D'];

export function step1Schemas(showMode: boolean): FormSchema[] {
  return [
    createFormSchema(showMode, 'temperature', '运行环境平均温度(℃)', '50%', 2, 12),
    createFormSchema(showMode, 'humidity', '湿度', '50%', 2, 12),
  ];
}

export function step2Schemas(showMode: boolean): FormSchema[] {
  return [
    createFormSchema(showMode, 'hydrogen', '氢气含量(uL/L)', '60%', 2, 6),
    createFormSchema(showMode, 'methane', '甲烷含量(uL/L)', '60%', 2, 6),
    createFormSchema(showMode, 'ethane', '乙烷含量(uL/L)', '60%', 2, 6),
    createFormSchema(showMode, 'acetylene', '乙炔含量(uL/L)', '60%', 2, 6),
    createFormSchema(showMode, 'ethylene', '乙烯含量(uL/L)', '60%', 2, 6),
    createFormSchema(showMode, 'co', 'CO含量(uL/L)', '60%', 2, 6),
    createFormSchema(showMode, 'co2', 'CO2含量(uL/L)', '60%', 2, 6),
    createFormSchema(showMode, 'totalHydrocarbon', '总烃含量(uL/L)', '60%', 2, 6),
    createFormSchema(showMode, 'totalHyRelative', '总烃相对产气速率(%/月)', '60%', 2, 6),
    createFormSchema(showMode, 'totalHyAbsolute', '总烃绝对产气速率(%/月)', '60%', 2, 6),
  ];
}

export function step3Schemas(showMode: boolean): FormSchema[] {
  return [
    createFormSchema(showMode, 'oilTemperature', '油温(℃)', '60%', 2, 8),
    createFormSchema(showMode, 'coreLeakage', '铁心接地电流(mA)', '60%', 2, 8),
    createFormSchema(showMode, 'partDischargeNum', '局部放电量(pC)', '60%', 2, 8),
    ...createList(showMode, '绝缘电阻(MΩ)', 'insRes', dirNames, '60%', 8, 2),
    ...createList(showMode, '吸收比', 'absorptionRatio', dirNames, '60%', 8, 3),
    ...createList(showMode, '绕组介质损耗tanδ(%)', 'dielectricLoss', dirNames, '60%', 8, 3),
    ...createList(showMode, '绕组电容量Cx(pF)', 'capacitance', dirNames, '60%', 8, 2),
    ...createList(showMode, '绕组直流电阻(高压侧)AO(MΩ)', 'windingDcResistanceHighAO', rankNames),
    ...createList(showMode, '绕组直流电阻(高压侧)BO(MΩ)', 'windingDcResistanceHighBO', rankNames),
    ...createList(showMode, '绕组直流电阻(高压侧)CO(MΩ)', 'windingDcResistanceHighCO', rankNames),
    ...createList(
      showMode,
      '绕组直流电阻(中压侧)(MΩ)',
      'windingDcResistanceMid',
      AmOm,
      '60%',
      8,
      3,
    ),
    ...createList(showMode, '绕组直流电阻(低压侧)(MΩ)', 'windingDcResistanceLow', abc, '60%', 8, 3),
    ...createList(showMode, '直流电阻不平衡系数高压侧', 'dcResistanceUnbalanceHigh', rankNames),
    createDivider('直流电阻不平衡系数中压侧'),
    createFormSchema(showMode, 'dcResistanceUnbalanceMid', '挡位值', '60%', 3, 6),
    createDivider('直流电阻不平衡系数低压侧'),
    createFormSchema(showMode, 'dcResistanceUnbalanceLow', '挡位值', '60%', 3, 6),
    ...createList(
      showMode,
      '高压侧套管介质损耗tanδ(%)',
      'bushingDielectricLoss',
      ABCD,
      '60%',
      6,
      4,
    ),
    ...createList(showMode, '高压侧套管电容值Cx(pF)', 'bushingCapacitance', ABCD, '60%', 6, 2),
  ];
}

export function step4Schemas(showMode: boolean): FormSchema[] {
  return [
    createFormSchema(showMode, 'microWaterContent', '微水(mg/L)', '60%', 2, 8),
    createFormSchema(showMode, 'breakdownVoltage', '击穿电压(kV)', '60%', 2, 8),
    createFormSchema(showMode, 'oilDielectricLoss', '油介损(%)', '60%', 2, 8),
    createFormSchema(showMode, 'furfuralContent', '糠醛含量(mg/L)', '60%', 2, 8),
    createFormSchema(showMode, 'acidValue', '酸值(mg(KOH)/g)', '60%', 2, 8),
  ];
}

export function step5Schemas(showMode: boolean): FormSchema[] {
  return [
    createFormSchema(showMode, 'inspectionRecord', '巡检记录', '60%', 2, 8),
    createFormSchema(showMode, 'familyDefect', '家族缺陷', '60%', 2, 8),
    createFormSchema(showMode, 'coolingSystemStatus', '冷却系统状态', '60%', 2, 8),
    createFormSchema(showMode, 'tapSwitcherStatus', '分接开关状态', '60%', 2, 8),
    createFormSchema(showMode, 'protectionDeviceStatus', '保护装置状态', '60%', 2, 8),
    createFormSchema(showMode, 'testingDeviceStatus', '测试装置状态', '60%', 2, 8),
  ];
}
