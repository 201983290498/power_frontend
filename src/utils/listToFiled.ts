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
        fontSize: '20px',
        fontWeight: '700',
        marginTop: '50px !important',
        marginBottom: '25px !important',
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
  showMode: boolean,
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
      style: { 
        width: width, 
        borderRadius: '6px',
        boxShadow: '2px 2px 2px rgba(0,0,0,0.2)',
        fontWeight: '500',
      }, // 设置输入框宽度为100%，可根据需要调整
      disabled: showMode,
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
  showMode: boolean,
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
      style: { 
        width: width,
        borderRadius: '6px',
        boxShadow: '2px 2px 2px rgba(0,0,0,0.2)',
        fontWeight: '500',
       }, // 设置输入框宽度为100%，可根据需要调整
      disabled: showMode,
    },
    required: true,
    colProps: {
      span: span, // 根据需要调整每个字段占据的栅格数
    },
  };
}

export function createTimeSchema(
  showMode: boolean,
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
      style: { 
        width: width, 
        borderRadius: '6px',
        boxShadow: '2px 2px 2px rgba(0,0,0,0.2)',
        fontWeight: '500',
      }, // 设置输入框宽度为100%，可根据需要调整
      disabled: showMode,
    },
    required: true,
    colProps: {
      span: span, // 根据需要调整每个字段占据的栅格数
    },
  };
}

export function createOptionSchema(
  showMode: boolean,
  field: string,
  label: string,
  options,
  width = '60%',
  span = 4,
  mode: string | undefined = undefined,
): FormSchema {
  return {
    field: field,
    label: label,
    component: 'Select',
    componentProps: {
      style: { 
        width: width,
        borderRadius: '6px',
        boxShadow: '2px 2px 2px rgba(0,0,0,0.2)',
        fontWeight: '500',
      }, // 设置输入框宽度为100%，可根据需要调整
      options,
      mode,
      disabled: showMode,
    },
    required: true,
    colProps: {
      span: span, // 根据需要调整每个字段占据的栅格数
    },
  };
}

export function createList(
  showMode: boolean,
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
    res.push(createFormSchema(showMode, field + '.' + i, subNames[i], width, digital, span));
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
  runningCost: 1000,
  evaluateId: DEFAULT_VALUE.INPUT_VALUE,
  equipNo: '123456',
  organization: '南网红河供电局xx变电站',
  substationName: '南网红河xx站xx变',
  runNo: '123456',
  operationTime: new Date()
    .toISOString()
    .replace('T', ' ')
    .replace(/\.\d{3}Z/, ''),
  systemNominalVoltage: 230,
  model: 'SFSZ11-40000-110',
  phase: 3,
  location: 'outdoor',
  capacity: 20000,
  ratedVoltage: 220,
  connectionSymbol: 'yn0, yn0',
  noLoadCurrent: 0.007,
  noLoadLoss: 7,
  manufacturer: 'XX厂',
  manufactureDate: new Date()
    .toISOString()
    .replace('T', ' ')
    .replace(/\.\d{3}Z/, ''),
  factoryNo: '000000',
  avgmonthHotspotTemper: 25,
  thermalModification: 0,
  oilFurfuralindex: 1,
  temperature: 25,
  phaseAChange: 0.011,
  phaseBChange: 0.011,
  phaseCChange: 0.011,
  threePhaseRactanceMaxDiff: 0.015,
  loadLossChange: 0.01,
  noLoadLossChange: 0.005,
  ratedCurrent: 130,
  loadCurrent: 60,
  noloadCurrent: 8,
  noLoadLossKey: 35,
  loadLoss: 35,
  designLife: 30,
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
  purchaseCost: 740,
  installationAndDebuggingCost: 41.05,
  initialOtherCosts: 41,
  electricityPrice: 0.52,
  noneLoadLoss: 120,
  loadLoss: 480,
  avgLoadRate: 0.55,
  overhaulCost: 49.323,
  annualRepairCost: 1.48,
  powerProfit: 0.14,
  ratedCapacity: 120,
  avgPowerFactor: 0.75,
  annualPowerOutageTime: 0.31128,
  annualAvgFailure: 0.31128,
  pertimeAvgRepairCost: 5,
  avgRepairTime: 0.31,
  installFee: 41.05,
  residualValueRate: 0.05,
  cleaningFeeRate: 0.32,
  discountRate: 100,
  equipDesignLife: 10,
  equipRunLife: 0,
  firstOverhaulFactor: 0.05,
  firstOverhaulTime: 0,
  maintainCostFactor: 0,
  secondOverhaulFactor: 0.05,
  secondOverhaulTime: 0,
  runningCost: 5,
};

export const devopsInputFields: DecisionInput = {
  evaluateId: DEFAULT_VALUE.INPUT_VALUE,
  equipmentValue: 7,
  substationStatus: 4,
  loadLevel: 3,
  transformerLoadRate: 1.16,
  transformerCapacity: DEFAULT_VALUE.INPUT_VALUE,
  averagePowerFactor: 40.8576,
  substationImportance: 1.16,
  loadImportance: 1,
  systemRiskCorrectionFactor: -1,
  unitRiskValue: 10472.1,
  repairCost: [10000, 20000, 30000],
  manufacturer: 1,
  faultRepairCostFactor: 1,
  accidentCost: [20000, 500000, 5000000],
  personnelInjuryProbability: [0.01, 0.05, 0.005],
  loadSheddingProbability: [0.01, 0.05, 0.005],
  faultProbability: [0.642, 0.321, 0.037],
};
