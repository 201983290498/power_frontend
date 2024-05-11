import { OptionPair } from '../../common/data';
import { FormSchema } from '/@/components/Form/src/types/form';
import { createFormSchema, createOptionSchema } from '/@/utils/listToFiled';

const statusOptions = [
  new OptionPair('0.05', 0.05).getConstantValue(),
  new OptionPair('0.015', 0.015).getConstantValue(),
];

const statusOptions1 = [
  new OptionPair('存在第一次大修', 1).getConstantValue(),
  new OptionPair('不存在第一次大修', 0).getConstantValue(),
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
  createFormSchema('equipRunLife', '变压器运行寿命(年)', '60%', 2, 6),
  createOptionSchema('maintainCostFactor', '预防性维护的费用系数', statusOptions, '60%', 6),
  createFormSchema('firstOverhaulTime', '第一次大修时间(x小时)', '60%', 2, 6),
  createOptionSchema('firstOverhaulFactor', '第一次大修系数', statusOptions1, '60%', 6),
  createFormSchema('secondOverhaulTime', '第二次大修时间(x小时)', '60%', 2, 6),
  createOptionSchema('secondOverhaulFactor', '第二次大修系数', statusOptions1, '60%', 6),
  createFormSchema('discountRate', '折现率(%)', '60%', 2, 6),
  createFormSchema('equipDesignLife', '变压器设计寿命', '60%', 2, 6),
  createFormSchema('equipDesignLife', '变压器设计寿命', '60%', 2, 6),
  createFormSchema('runningCost', '运行成本(万元)', '60%', 2, 6),
];
