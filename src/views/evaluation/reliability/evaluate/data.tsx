import { FormSchema } from '/@/components/Form/src/types/form';
import {
  createFormSchema,
  createTextSchema,
  createList,
  createTimeSchema,
} from '/@/utils/listToFiled';

const rankNames: string[] = [];
for (let i = 1; i <= 17; i++) {
  rankNames.push(`档位${i}`);
}
const dirNames: string[] = ['高-中低及地', '中-高低及地', '低-高中及地'];
const AmOm: string[] = ['AmOm', 'BmOm', 'CmOm'];
const abc: string[] = ['ab', 'bc', 'ca'];
const ABCD: string[] = ['A', 'B', 'C', 'D'];
export const stepSchemas: FormSchema[] = [
  {
    field: 'account',
    component: 'Select',
    label: '付款账户',
    required: true,
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: 'anncwb@126.com',
          value: '1',
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'fac',
    label: '收款账户',
    required: true,
    defaultValue: 'test@example.com',
    slot: 'fac',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'pay',
    component: 'Input',
    label: '',
    defaultValue: 'zfb',
    show: false,
  },
  {
    field: 'payeeName',
    component: 'Input',
    label: '收款人姓名',
    defaultValue: 'Vben',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'money',
    component: 'Input',
    label: '转账金额',
    defaultValue: '500',
    required: true,
    renderComponentContent: () => {
      return {
        prefix: () => '￥',
      };
    },
    colProps: {
      span: 24,
    },
  },
];

export const step1Schemas: FormSchema[] = [
  createTextSchema('equipNo', '变压器编号', '60%', 6),
  createTextSchema('organization', '单位名称', '60%', 6),
  createTextSchema('substationName', '变电站名称', '60%', 6),
  createTextSchema('runNo', '运行编号', '60%', 6),
  createTimeSchema('operationTime', '投运时间', '60%', 6),
  createFormSchema('systemNominalVoltage', '系统标称电压', '60%', 2, 6),
  createTextSchema('model', '型号', '60%', 6),
  createFormSchema('phase', '相数', '60%', 2, 6),
  createTextSchema('location', '变压器安置地点（室内/室外）', '60%', 6),
  createFormSchema('capacity', '容量', '60%', 2, 6),
  createFormSchema('ratedVoltage', '额定电压', '60%', 2, 6),
  createTextSchema('connectionSymbol', '联结组标号', '60%', 6),
  createFormSchema('noLoadCurrent', '空载电流', '60%', 2, 6),
  createFormSchema('noLoadLoss', '空载损耗', '60%', 2, 6),
  createTextSchema('manufacturer', '制造厂家', '60%', 6),
  createTimeSchema('manufactureDate', '制造日期', '60%', 6),
  createTextSchema('factoryNo', '出厂序号', '60%', 6),
];

export const step2Schemas: FormSchema[] = [
  createFormSchema('avgmonthHotspotTemper', '每月平均热点温度', '60%', 2, 6),
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
    rankNames.slice(0, 3),
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
