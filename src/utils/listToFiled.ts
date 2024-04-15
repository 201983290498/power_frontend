import { FormSchema } from '../components/Form/src/types/form';
import { DEFAULT_VALUE } from '../enums/defaultValueEnum';
import { StateInput } from '/#/baseClass';
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
    defaultValue: DEFAULT_VALUE.INPUT_VALUE,
    rules: [
      { required: true, message: '请输入数值', trigger: 'blur' },
      {
        pattern: new RegExp(`^-{0,1}\\d{0,7}(\\.\\d{1,${digital})?$`),
        message: '请输入有效的值',
        trigger: 'blur',
      },
      { type: 'number', message: '输入必须是一个数字', trigger: 'blur' },
    ],
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
