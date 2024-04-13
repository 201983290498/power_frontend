import { FormSchema } from '../components/Form/src/types/form';
import { DEFAULT_VALUE } from '../enums/defaultValueEnum';
import { StateInput } from '/#/baseClass';
export function transformListToField(demoList: any[], name: string) {
  let jsonStr = '{ ';
  demoList.forEach((item, index) => {
    jsonStr += `\"${name}.${index}\": \"${item}\"`;
    index < demoList.length - 1 && (jsonStr += ', ');
  });
  jsonStr += ' }';
  console.log(jsonStr);
  return JSON.parse(jsonStr);
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
        pattern: new RegExp(`^\\d{0,7}(\\.\\d{1,${digital})?$`),
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

export const stateInputFields: (keyof StateInput)[] = [
  'evaluateId',
  'absorptionRatio',
  'acetylene',
  'acidValue',
  'breakdownVoltage',
  'bushingCapacitance',
  'bushingDielectricLoss',
  'capacitance',
  'co',
  'co2',
  'coolingSystemStatus',
  'coreLeakage',
  'dcResistanceUnbalanceHigh',
  'dcResistanceUnbalanceLow',
  'dcResistanceUnbalanceMid',
  'dielectricLoss',
  'ethane',
  'ethylene',
  'familyDefect',
  'furfuralContent',
  'humidity',
  'hydrogen',
  'inspectionRecord',
  'insRes',
  'methane',
  'microWaterContent',
  'oilDielectricLoss',
  'oilTemperature',
  'partDischargeNum',
  'protectionDeviceStatus',
  'tapSwitcherStatus',
  'temperature',
  'testingDeviceStatus',
  'totalHAbsolute',
  'totalHRelative',
  'totalHydrocarbon',
  'windingDcResistanceHighAO',
  'windingDcResistanceHighBO',
  'windingDcResistanceHighCO',
  'windingDcResistanceLow',
  'windingDcResistanceMid',
];

export function mapObjectToInterface<T>(obj: Object, interfaceKeys: (keyof T)[]): T {
  const mappedObject: Partial<T> = {};
  interfaceKeys.forEach((key) => {
    if (Object.keys(obj).includes(key)) {
      mappedObject[key] = obj[key];
    } else {
      mappedObject[key] = DEFAULT_VALUE.INPUT_VALUE;
    }
  });
  return mappedObject as T;
}
