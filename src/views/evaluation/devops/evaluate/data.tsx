import { FormSchema } from '/@/components/Form/src/types/form';
import {
  createOptionSchema,
  createFormSchema,
  createDivider,
  createList,
} from '/@/utils/listToFiled';
import { OptionPair } from '../../common/data';
const valueOptions = [
  new OptionPair('10万以下', 1).getConstantValue(),
  new OptionPair('10万元以上20万元以下', 2).getConstantValue(),
  new OptionPair('20万元以上30万元以下', 3).getConstantValue(),
  new OptionPair('30万元以上50万元以下', 4).getConstantValue(),
  new OptionPair('50万元以上80万元以下', 5).getConstantValue(),
  new OptionPair('80万元以上100万元以下', 6).getConstantValue(),
  new OptionPair('100万元以上1000万元以下', 7).getConstantValue(),
  new OptionPair('1000万元以上5000万元以下', 8).getConstantValue(),
  new OptionPair('5000万元以上1亿元以下', 9).getConstantValue(),
  new OptionPair('1亿元以上', 10).getConstantValue(),
];

const statusOptions = [
  new OptionPair('一般变电站', 1).getConstantValue(),
  new OptionPair('重要变电站', 4).getConstantValue(),
  new OptionPair('枢纽变电站', 8).getConstantValue(),
];

const loadOptions = [
  new OptionPair('三级负荷', 3).getConstantValue(),
  new OptionPair('二级负荷', 5).getConstantValue(),
  new OptionPair('一级负荷', 7).getConstantValue(),
  new OptionPair('特级负荷', 10).getConstantValue(),
];

const impOptions = [
  new OptionPair('枢纽变电站', 1.16).getConstantValue(),
  new OptionPair('联络变电站', 1).getConstantValue(),
  new OptionPair('终端变电站', 0.8).getConstantValue(),
];

const loadImpOptions1 = [
  new OptionPair('重要负荷', 1.16).getConstantValue(),
  new OptionPair('一般负荷', 1).getConstantValue(),
];

const factorOptions = [
  new OptionPair('室外变电站', -1).getConstantValue(),
  new OptionPair('室内变电站', -1.16).getConstantValue(),
];

const manufacturerOptions = [
  new OptionPair('本地生产', 0.9).getConstantValue(),
  new OptionPair('国内生产', 1).getConstantValue(),
  new OptionPair('国外生产', 1.3).getConstantValue(),
];

const faultOptions = [
  new OptionPair('室外变电站', 1).getConstantValue(),
  new OptionPair('室内变电站', 1.16).getConstantValue(),
];

export function step1Schemas(showMode: boolean): FormSchema[] {
  return [
    createDivider('基础信息'),
    createFormSchema(showMode, 'transformerLoadRate', '变压器负载率', '60%', 2, 8),
    createFormSchema(showMode, 'transformerCapacity', '变压器容量', '60%', 2, 8),
    createFormSchema(showMode, 'averagePowerFactor', '平均功率因素', '60%', 2, 8),
    createOptionSchema(showMode, 'equipmentValue', '设备价值', valueOptions, '60%', 8),
    createOptionSchema(showMode, 'substationStatus', '变电站地位', statusOptions, '60%', 8),
    createOptionSchema(showMode, 'manufacturer', '生产厂家', manufacturerOptions, '60%', 8),
    createOptionSchema(showMode, 'loadImportance', '负荷重要性', loadImpOptions1, '60%', 8),
    createOptionSchema(showMode, 'substationImportance', '变电站重要性', impOptions, '60%', 8),
    createOptionSchema(showMode, 'loadLevel', '负荷等级', loadOptions, '60%', 8),
    {
      field: 'faultRepairCostFactor',
      label: '变压器检修环境-故障修复成本修正系数',
      labelWidth: 300,
      component: 'Select',
      componentProps: {
        style: { width: '80%' }, // 设置输入框宽度为100%，可根据需要调整
        options: faultOptions,
        disabled: showMode,
      },
      required: true,
      colProps: {
        span: 12, // 根据需要调整每个字段占据的栅格数
      },
    },
    {
      field: 'systemRiskCorrectionFactor',
      label: '变压器检修环境-系统风险修正系数',
      labelWidth: 300,
      component: 'Select',
      componentProps: {
        style: { width: '80%' }, // 设置输入框宽度为100%，可根据需要调整
        options: factorOptions,
        disabled: showMode,
      },
      required: true,
      colProps: {
        span: 12, // 根据需要调整每个字段占据的栅格数
      },
    },
    createFormSchema(showMode, 'unitRiskValue', '单位风险值', '60%', 2, 8),
    ...createList(
      showMode,
      '故障概率',
      'faultProbability',
      ['一般性故障概率', '严重性故障概率', '灾难性故障概率'],
      '60%',
      8,
      4,
    ),
    ...createList(
      showMode,
      '不同故障下切除负荷的几率',
      'loadSheddingProbability',
      ['一般性切除负荷概率', '严重性切除负荷概率', '灾难性切除负荷概率'],
      '60%',
      8,
      4,
    ),
    ...createList(
      showMode,
      '人员事故伤亡概率',
      'personnelInjuryProbability',
      ['发生轻伤的概率', '发生重伤的概率', '发生人员伤亡的概率'],
      '60%',
      8,
      4,
    ),
    ...createList(
      showMode,
      '不同故障下事故成本',
      'accidentCost',
      ['轻伤的事故成本', '重伤的事故成本', '人员伤亡的事故成本'],
      '60%',
      8,
      4,
    ),
    ...createList(
      showMode,
      '不同故障下的修复成本',
      'repairCost',
      ['一般性故障的修复成本', '严重性故障的修复成本', '灾难性故障的修复成本'],
      '60%',
      8,
      4,
    ),
  ];
}
