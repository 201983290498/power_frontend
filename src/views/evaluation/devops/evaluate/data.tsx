import { FormSchema } from '/@/components/Form/src/types/form';
import { createOptionSchema, createFormSchema } from '/@/utils/listToFiled';
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

const repairOptions = [
  new OptionPair('一般性故障110Kv', 10000).getConstantValue(),
  new OptionPair('一般性故障220Kv', 20000).getConstantValue(),
  new OptionPair('一般性故障500Kv', 30000).getConstantValue(),
  new OptionPair('严重性故障110Kv', 100000).getConstantValue(),
  new OptionPair('严重性故障220Kv', 200000).getConstantValue(),
  new OptionPair('严重性故障500Kv', 280000).getConstantValue(),
  new OptionPair('灾难性故障110Kv', 1800000).getConstantValue(),
  new OptionPair('灾难性故障220Kv', 5000000).getConstantValue(),
  new OptionPair('灾难性故障500Kv', 8000000).getConstantValue(),
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

const accidentOptions = [
  new OptionPair('轻伤', 20000).getConstantValue(),
  new OptionPair('重伤', 5000000).getConstantValue(),
  new OptionPair('人员伤亡', 50000000).getConstantValue(),
];

const personOptions = [
  new OptionPair('轻伤', 0.01).getConstantValue(),
  new OptionPair('重伤', 0.005).getConstantValue(),
  new OptionPair('人员伤亡', 0.001).getConstantValue(),
];

const valueOptions1 = [
  new OptionPair('0.01', 0.01).getConstantValue(),
  new OptionPair('0.05', 0.05).getConstantValue(),
  new OptionPair('0.005', 0.005).getConstantValue(),
];

const faultOptions2 = [
  new OptionPair('一般性故障', 0.642).getConstantValue(),
  new OptionPair('严重性故障', 0.321).getConstantValue(),
  new OptionPair('灾难性故障', 0.037).getConstantValue(),
];

export function step1Schemas(showMode: boolean): FormSchema[] {
  return [
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
        faultOptions,
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
        factorOptions,
        disabled: showMode,
      },
      required: true,
      colProps: {
        span: 12, // 根据需要调整每个字段占据的栅格数
      },
    },
    createOptionSchema(
      showMode,
      'faultProbability',
      '故障概率',
      faultOptions2,
      '60%',
      8,
      'multiple',
    ),
    createOptionSchema(
      showMode,
      'loadSheddingProbability',
      '不同故障下切除负荷的几率',
      valueOptions1,
      '60%',
      8,
      'multiple',
    ),
    createOptionSchema(
      showMode,
      'personnelInjuryProbability',
      '人员事故伤亡概率',
      personOptions,
      '60%',
      8,
      'multiple',
    ),
    createOptionSchema(
      showMode,
      'repairCost',
      '不同故障下的修复成本',
      repairOptions,
      '60%',
      8,
      'multiple',
    ),
    createOptionSchema(
      showMode,
      'accidentCost',
      '不同故障下事故成本',
      accidentOptions,
      '60%',
      8,
      'multiple',
    ),
    createFormSchema(showMode, 'unitRiskValue', '单位风险值', '60%', 2, 8),
  ];
}
