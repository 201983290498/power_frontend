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
  temperature: DEFAULT_VALUE.INPUT_VALUE,
  humidity: DEFAULT_VALUE.INPUT_VALUE,
  hydrogen: DEFAULT_VALUE.INPUT_VALUE,
  methane: DEFAULT_VALUE.INPUT_VALUE,
  ethane: DEFAULT_VALUE.INPUT_VALUE,
  acetylene: DEFAULT_VALUE.INPUT_VALUE,
  ethylene: DEFAULT_VALUE.INPUT_VALUE,
  co2: DEFAULT_VALUE.INPUT_VALUE,
  co: DEFAULT_VALUE.INPUT_VALUE,
  totalHydrocarbon: DEFAULT_VALUE.INPUT_VALUE,
  totalHyRelative: DEFAULT_VALUE.INPUT_VALUE,
  totalHyAbsolute: DEFAULT_VALUE.INPUT_VALUE,
  oilTemperature: DEFAULT_VALUE.INPUT_VALUE,
  insRes: new Array<number>(3).fill(DEFAULT_VALUE.INPUT_VALUE),
  absorptionRatio: new Array<number>(3).fill(DEFAULT_VALUE.INPUT_VALUE),
  dielectricLoss: new Array<number>(3).fill(DEFAULT_VALUE.INPUT_VALUE),
  capacitance: new Array<number>(3).fill(DEFAULT_VALUE.INPUT_VALUE),
  coreLeakage: DEFAULT_VALUE.INPUT_VALUE,
  windingDcResistanceHighAO: new Array<number>(17).fill(DEFAULT_VALUE.INPUT_VALUE),
  windingDcResistanceHighBO: new Array<number>(17).fill(DEFAULT_VALUE.INPUT_VALUE),
  windingDcResistanceHighCO: new Array<number>(17).fill(DEFAULT_VALUE.INPUT_VALUE),
  windingDcResistanceMid: new Array<number>(3).fill(DEFAULT_VALUE.INPUT_VALUE),
  windingDcResistanceLow: new Array<number>(3).fill(DEFAULT_VALUE.INPUT_VALUE),
  dcResistanceUnbalanceHigh: new Array<number>(17).fill(DEFAULT_VALUE.INPUT_VALUE),
  dcResistanceUnbalanceMid: new Array<number>(3).fill(DEFAULT_VALUE.INPUT_VALUE),
  dcResistanceUnbalanceLow: [DEFAULT_VALUE.INPUT_VALUE],
  bushingDielectricLoss: new Array<number>(4).fill(DEFAULT_VALUE.INPUT_VALUE),
  bushingCapacitance: new Array<number>(4).fill(DEFAULT_VALUE.INPUT_VALUE),
  partDischargeNum: DEFAULT_VALUE.INPUT_VALUE,
  microWaterContent: DEFAULT_VALUE.INPUT_VALUE,
  breakdownVoltage: DEFAULT_VALUE.INPUT_VALUE,
  oilDielectricLoss: DEFAULT_VALUE.INPUT_VALUE,
  furfuralContent: DEFAULT_VALUE.INPUT_VALUE,
  acidValue: DEFAULT_VALUE.INPUT_VALUE,
  inspectionRecord: DEFAULT_VALUE.INPUT_VALUE,
  familyDefect: DEFAULT_VALUE.INPUT_VALUE,
  coolingSystemStatus: DEFAULT_VALUE.INPUT_VALUE,
  tapSwitcherStatus: DEFAULT_VALUE.INPUT_VALUE,
  protectionDeviceStatus: DEFAULT_VALUE.INPUT_VALUE,
  testingDeviceStatus: DEFAULT_VALUE.INPUT_VALUE,
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
