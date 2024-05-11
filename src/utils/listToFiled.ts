import { FormSchema } from '../components/Form/src/types/form';
import { DEFAULT_VALUE } from '../enums/defaultValueEnum';
import { EconomyInput, ReliabilityInput, StateInput, DecisionInput } from '/#/baseClass';
export function transformListToField(demoList: any[], name: string): Record<string, any> {
  let jsonStr = '{ ';
  demoList.forEach((item, index) => {
    jsonStr += `\"${name}.${index}\": ${item}`;
    index < demoList.length - 1 && (jsonStr += ', ');
  });
  jsonStr += ' }';
  return JSON.parse(jsonStr);
}

export function transformDataToField(sampleForm: Record<string, any>): Record<string, any> {
  const results: Record<string, any> = {};
  Object.keys(sampleForm).forEach((key) => {
    if (sampleForm[key].length !== undefined) {
      const record2 = transformListToField(sampleForm[key], key);
      for (const key2 in record2) {
        results[key2] = record2[key2];
      }
    } else {
      results[key] = sampleForm[key];
    }
  });
  return results;
}

let dividerCnt = 0;
export function createDivider(name: string, restart = false): FormSchema {
  restart && (dividerCnt = 0);
  dividerCnt += 1;
  return {
    field: 'divide' + dividerCnt,
    component: 'Divider',
    label: name,
    componentProps: {
      span: true,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '-100px',
      },
    },
    colProps: {
      span: 24,
    },
  };
}

/**
 * @description 常见Number字段
 */
export function createFormSchema(
  field: string,
  label: string,
  width = '60%',
  digital = 2,
  span = 4,
): FormSchema {
  return {
    field: field,
    label: label,
    component: 'InputNumber',
    componentProps: {
      step: Math.pow(10, -digital),
      style: { width: width }, // 设置输入框宽度为100%，可根据需要调整
    },
    rules: [
      { required: true, message: '请输入数值', trigger: 'blur' },
      { type: 'number', message: '输入必须是一个数字', trigger: 'blur' },
    ],
    colProps: {
      span: span, // 根据需要调整每个字段占据的栅格数
    },
  };
}

/**
 * @description 创建文本列
 */
export function createTextSchema(
  field: string,
  label: string,
  width = '60%',
  span = 4,
): FormSchema {
  return {
    field: field,
    label: label,
    component: 'Input',
    componentProps: {
      style: { width: width }, // 设置输入框宽度为100%，可根据需要调整
    },
    required: true,
    colProps: {
      span: span, // 根据需要调整每个字段占据的栅格数
    },
  };
}

export function createTimeSchema(
  field: string,
  label: string,
  width = '60%',
  span = 4,
): FormSchema {
  return {
    field: field,
    label: label,
    component: 'DatePicker',
    componentProps: {
      style: { width: width }, // 设置输入框宽度为100%，可根据需要调整
    },
    required: true,
    colProps: {
      span: span, // 根据需要调整每个字段占据的栅格数
    },
  };
}

export function createOptionSchema(
  field: string,
  label: string,
  options,
  width = '60%',
  span = 4,
  defaultValue = 0,
  mode = undefined,
): FormSchema {
  return {
    field: field,
    label: label,
    component: 'Select',
    componentProps: {
      style: { width: width }, // 设置输入框宽度为100%，可根据需要调整
      options,
      mode,
    },
    required: true,
    colProps: {
      span: span, // 根据需要调整每个字段占据的栅格数
    },
  };
}

export function createList(
  name: string,
  field: string,
  subNames: string[],
  width = '60%',
  span = 4,
  digital = 2,
): FormSchema[] {
  const res: FormSchema[] = [];
  res.push(createDivider(name));
  for (let i = 0; i < subNames.length; i++) {
    res.push(createFormSchema(field + '.' + i, subNames[i], width, digital, span));
  }
  return res;
}

export const stateInputFields: StateInput = {
  evaluateId: DEFAULT_VALUE.INPUT_VALUE,
  temperature: 28,
  humidity: 0.47,
  hydrogen: 82.41,
  methane: 45,
  ethane: 60,
  acetylene: 0,
  ethylene: 43,
  co2: 0.4,
  co: 0.3,
  totalHydrocarbon: 105,
  totalHyRelative: 2,
  totalHyAbsolute: 4,
  oilTemperature: 30,
  insRes: [14500, 10500, 6800],
  absorptionRatio: [1.16, 1.26, 1.2],
  dielectricLoss: [0.321, 0.358, 0.38],
  capacitance: [9489, 12800, 14350],
  coreLeakage: 0.1,
  windingDcResistanceHighAO: [
    752.8, 739.1, 723.5, 709.6, 694.1, 680, 664.7, 650.9, 634.1, 649.8, 665.4, 679.5, 694.8, 708.7,
    723.9, 738.1, 753.8,
  ],
  windingDcResistanceHighBO: [
    756.1, 742.3, 726.9, 713, 697.6, 683.6, 668.3, 654.4, 636.8, 653.3, 668.8, 682.8, 698.2, 712,
    727.6, 741.6, 757.3,
  ],
  windingDcResistanceHighCO: [
    759.7, 746, 730.1, 716.3, 701, 687.1, 671.8, 657.8, 639.2, 656.9, 672.2, 686.2, 701.6, 715.3,
    731.1, 745, 760.5,
  ],
  windingDcResistanceMid: [87.83, 86.85, 87.52],
  windingDcResistanceLow: [12.45, 12.45, 12.5],
  dcResistanceUnbalanceHigh: [
    0.89, 0.9, 0.88, 0.96, 0.97, 1.03, 1.09, 1.05, 0.78, 1.09, 1.06, 1.01, 0.97, 0.91, 0.96, 0.93,
    0.91,
  ],
  dcResistanceUnbalanceMid: 1.16,
  dcResistanceUnbalanceLow: 0.4,
  bushingDielectricLoss: [0.48, 0.334, 0.297, 0.365],
  bushingCapacitance: [311.6, 302.9, 292.5, 483.9],
  partDischargeNum: 118,
  microWaterContent: 8.5,
  breakdownVoltage: 75,
  oilDielectricLoss: 2.48,
  furfuralContent: 0.34,
  acidValue: 0.31,
  inspectionRecord: 1,
  familyDefect: 1,
  coolingSystemStatus: 1,
  tapSwitcherStatus: 1,
  protectionDeviceStatus: 1,
  testingDeviceStatus: 1,
};

export function mapObjectToInterface<T>(obj: Object, interfaceKeys: Record<string, number>): T {
  Object.keys(interfaceKeys).forEach((key) => {
    if (Object.keys(obj).includes(key)) {
      interfaceKeys[key] = obj[key];
    }
  });
  return interfaceKeys as T;
}

export const reliabilityInputFields: ReliabilityInput = {
  evaluateId: DEFAULT_VALUE.INPUT_VALUE,
  equipNo: DEFAULT_VALUE.TEXT_VALUE,
  organization: DEFAULT_VALUE.TEXT_VALUE,
  substationName: DEFAULT_VALUE.TEXT_VALUE,
  runNo: DEFAULT_VALUE.TEXT_VALUE,
  operationTime: new Date()
    .toISOString()
    .replace('T', ' ')
    .replace(/\.\d{3}Z/, ''),
  systemNominalVoltage: DEFAULT_VALUE.INPUT_VALUE,
  model: DEFAULT_VALUE.TEXT_VALUE,
  phase: DEFAULT_VALUE.INPUT_VALUE,
  location: DEFAULT_VALUE.TEXT_VALUE,
  capacity: DEFAULT_VALUE.INPUT_VALUE,
  ratedVoltage: DEFAULT_VALUE.INPUT_VALUE,
  connectionSymbol: DEFAULT_VALUE.TEXT_VALUE,
  noLoadCurrent: DEFAULT_VALUE.INPUT_VALUE,
  noLoadLoss: DEFAULT_VALUE.INPUT_VALUE,
  manufacturer: DEFAULT_VALUE.TEXT_VALUE,
  manufactureDate: new Date()
    .toISOString()
    .replace('T', ' ')
    .replace(/\.\d{3}Z/, ''),
  factoryNo: DEFAULT_VALUE.TEXT_VALUE,
  avgmonthHotspotTemper: DEFAULT_VALUE.INPUT_VALUE,
  thermalModification: 0,
  oilFurfuralindex: DEFAULT_VALUE.INPUT_VALUE,
  temperature: DEFAULT_VALUE.INPUT_VALUE,
  phaseAChange: DEFAULT_VALUE.INPUT_VALUE,
  phaseBChange: DEFAULT_VALUE.INPUT_VALUE,
  phaseCChange: DEFAULT_VALUE.INPUT_VALUE,
  threePhaseRactanceMaxDiff: DEFAULT_VALUE.INPUT_VALUE,
  loadLossChange: DEFAULT_VALUE.INPUT_VALUE,
  noLoadLossChange: DEFAULT_VALUE.INPUT_VALUE,
  ratedCurrent: DEFAULT_VALUE.INPUT_VALUE,
  loadCurrent: DEFAULT_VALUE.INPUT_VALUE,
  noloadCurrent: DEFAULT_VALUE.INPUT_VALUE,
  noLoadLossKey: DEFAULT_VALUE.INPUT_VALUE,
  loadLoss: DEFAULT_VALUE.INPUT_VALUE,
  designLife: DEFAULT_VALUE.INPUT_VALUE,
  maintenanceCondition: 0,
  oilChromatographicSituation: 0,
  electricalRecordSituation: 0,
  oilSituation: 0,
  operatingOrLightningOvervoltage: 0,
  shortTermAidLoad: 0,
  familyHealth: 3,
  appearanceScore: [1],
  operatingEnvironment: '00',
};

export const economyInputFields: EconomyInput = {
  evaluateId: DEFAULT_VALUE.INPUT_VALUE,
  purchaseCost: DEFAULT_VALUE.INPUT_VALUE,
  installationAndDebuggingCost: DEFAULT_VALUE.INPUT_VALUE,
  initialOtherCosts: DEFAULT_VALUE.INPUT_VALUE,
  electricityPrice: DEFAULT_VALUE.INPUT_VALUE,
  noneLoadLoss: DEFAULT_VALUE.INPUT_VALUE,
  loadLoss: DEFAULT_VALUE.INPUT_VALUE,
  avgLoadRate: DEFAULT_VALUE.INPUT_VALUE,
  overhaulCost: DEFAULT_VALUE.INPUT_VALUE,
  annualRepairCost: DEFAULT_VALUE.INPUT_VALUE,
  powerProfit: DEFAULT_VALUE.INPUT_VALUE,
  ratedCapacity: DEFAULT_VALUE.INPUT_VALUE,
  avgPowerFactor: DEFAULT_VALUE.INPUT_VALUE,
  annualPowerOutageTime: DEFAULT_VALUE.INPUT_VALUE,
  annualAvgFailure: DEFAULT_VALUE.INPUT_VALUE,
  pertimeAvgRepairCost: DEFAULT_VALUE.INPUT_VALUE,
  avgRepairTime: DEFAULT_VALUE.INPUT_VALUE,
  installFee: DEFAULT_VALUE.INPUT_VALUE,
  residualValueRate: DEFAULT_VALUE.INPUT_VALUE,
  cleaningFeeRate: DEFAULT_VALUE.INPUT_VALUE,
};

export const devopsInputFields: DecisionInput = {
  evaluateId: DEFAULT_VALUE.INPUT_VALUE,
  equipmentValue: 1,
  substationStatus: 1,
  loadLevel: 3,
  transformerLoadRate: DEFAULT_VALUE.INPUT_VALUE,
  transformerCapacity: DEFAULT_VALUE.INPUT_VALUE,
  averagePowerFactor: DEFAULT_VALUE.INPUT_VALUE,
  substationImportance: 1.16,
  loadImportance: 1,
  systemRiskCorrectionFactor: -1,
  unitRiskValue: DEFAULT_VALUE.INPUT_VALUE,
  repairCost: 10000,
  manufacturer: 1,
  faultRepairCostFactor: 1,
  accidentCost: 20000,
  personnelInjuryProbability: 0.01,
  loadSheddingProbability: 0.01,
  faultProbability: 0.642,
};
