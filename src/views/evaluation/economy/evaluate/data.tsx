import { FormSchema } from '/@/components/Form/src/types/form';
import { createFormSchema } from '/@/utils/listToFiled';

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
  createFormSchema('purchaseCost', '购置成本（万元）', '60%', 2, 6),
  createFormSchema('installationAndDebuggingCost', '安装调试成本', '60%', 2, 6),
  createFormSchema('initialOtherCosts', '初始其他成本', '60%', 2, 6),
  createFormSchema('electricityPrice', '电价', '60%', 2, 6),
  createFormSchema('noneLoadLoss', '空载损耗（KW）', '60%', 2, 6),
  createFormSchema('loadLoss', '负载损耗', '60%', 2, 6),
  createFormSchema('avgLoadRate', '平均负载率', '60%', 2, 6),
  createFormSchema('overhaulCost', '单次大修总费用', '60%', 2, 6),
  createFormSchema('annualRepairCost', '年小修总费用', '60%', 2, 6),
  createFormSchema('powerProfit', '供电利润 （元/kwh）', '60%', 2, 6),
  createFormSchema('ratedCapacity', '额定容量', '60%', 2, 6),
  createFormSchema('avgPowerFactor', '平均功率因数', '60%', 2, 6),
  createFormSchema('annualPowerOutageTime', '年故障中断供电时间', '60%', 2, 6),
  createFormSchema('annualAvgFailure', '年平均故障次数', '60%', 2, 6),
  createFormSchema('pertimeAvgRepairCost', '单位时间平均修复成本', '60%', 2, 6),
  createFormSchema('avgRepairTime', '平均修复时间MTTR', '60%', 2, 6),
  createFormSchema('installFee', '设备安装费', '60%', 2, 6),
  createFormSchema('residualValueRate', '设备残值率', '60%', 2, 6),
  createFormSchema('cleaningFeeRate', '清理费费率', '60%', 2, 6),
];
