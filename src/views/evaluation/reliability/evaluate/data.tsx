import { FormSchema } from '/@/components/Form/src/types/form';
import {
  createFormSchema,
  createTextSchema,
  createTimeSchema,
  createOptionSchema,
} from '/@/utils/listToFiled';

const demoOption1 = [
  { label: '热改性', value: 0 },
  { label: '非热改性', value: 1 },
];

const demoOption2 = [
  { label: '检修处理得当，无缺陷', value: 0 },
  { label: '检修后投运但有轻微缺陷', value: 1 },
];

const demoOption3 = [
  { label: '无异常', value: 0 },
  { label: '有异常', value: 1 },
];

const demoOption4 = [
  { label: '同类变压器存在大量不良记录', value: 1 },
  { label: '同类变压器存在个别不良记录', value: 2 },
  { label: '同类变压器无不良记录', value: 3 },
];

const demoOption5 = [
  { label: '变压器外观异常', value: 1 },
  { label: '变压器外壳接地不良', value: 2 },
  { label: '套管存在裂纹或放电痕迹', value: 3 },
  { label: '运行声响异常', value: 4 },
  { label: '变压器存在漏油情况', value: 5 },
];

const demoOption6 = [
  { label: '无特殊环境', value: '00' },
  { label: '高海拔环境', value: '01' },
  { label: '高温环境', value: '10' },
  { label: '雨雪、低温环境', value: '11' },
];

export function step1Schemas(showMode: boolean): FormSchema[] {
  return [
    createTextSchema(showMode, 'equipNo', '变压器编号', '60%', 6),
    createTextSchema(showMode, 'organization', '单位名称', '60%', 6),
    createTextSchema(showMode, 'substationName', '变电站名称', '60%', 6),
    createTextSchema(showMode, 'runNo', '运行编号', '60%', 6),
    createTimeSchema(showMode, 'operationTime', '投运时间', '60%', 6),
    createFormSchema(showMode, 'systemNominalVoltage', '系统标称电压', '60%', 2, 6),
    createTextSchema(showMode, 'type', '型号', '60%', 6),
    createFormSchema(showMode, 'phase', '相数', '60%', 2, 6),
    createTextSchema(showMode, 'location', '变压器安置地点（室内/室外）', '60%', 6),
    createFormSchema(showMode, 'capacity', '容量', '60%', 2, 6),
    createFormSchema(showMode, 'ratedVoltage', '额定电压', '60%', 2, 6),
    createTextSchema(showMode, 'connectionSymbol', '联结组标号', '60%', 6),
    createFormSchema(showMode, 'noLoadCurrent', '空载电流', '60%', 3, 6),
    createFormSchema(showMode, 'noLoadLoss', '空载损耗', '60%', 2, 6),
    createTextSchema(showMode, 'manufacturer', '制造厂家', '60%', 6),
    createTimeSchema(showMode, 'manufactureDate', '制造日期', '60%', 6),
    createTextSchema(showMode, 'factoryNo', '出厂序号', '60%', 6),
  ];
}

export function step2Schemas(showMode: boolean): FormSchema[] {
  return [
    createFormSchema(showMode, 'avgmonthHotspotTemper', '每月平均温度', '60%', 2, 6),
    createOptionSchema(showMode, 'thermalModification', '热改性/非热改性', demoOption1, '60%', 6),
    createFormSchema(showMode, 'oilFurfuralindex', '油中糠醛指数', '60%', 2, 6),
    createFormSchema(showMode, 'temperature', '环境温度', '60%', 2, 6),
    createFormSchema(showMode, 'phaseAChange', 'A相短路阻抗变化量', '60%', 3, 6),
    createFormSchema(showMode, 'phaseBChange', 'B相短路阻抗变化量', '60%', 3, 6),
    createFormSchema(showMode, 'phaseCChange', 'C相短路阻抗变化量', '60%', 3, 6),
    createFormSchema(showMode, 'threePhaseRactanceMaxDiff', '三相电抗最大差值', '60%', 3, 6),
    createFormSchema(showMode, 'loadLossChange', '空载损耗变化量', '60%', 2, 6),
    createFormSchema(showMode, 'noLoadLossChange', '负载损耗变化量', '60%', 3, 6),
    createFormSchema(showMode, 'ratedCurrent', '额定电流', '60%', 2, 6),
    createFormSchema(showMode, 'loadCurrent', '负载电流', '60%', 2, 6),
    createFormSchema(showMode, 'noloadCurrent', '空载电流', '60%', 2, 6),
    createFormSchema(showMode, 'noLoadLossKey', '空载损耗', '60%', 2, 6),
    createFormSchema(showMode, 'loadLoss', '负载损耗', '60%', 2, 6),
    createFormSchema(showMode, 'designLife', '设计寿命', '60%', 2, 6),
  ];
}

export function step3Schemas(showMode: boolean): FormSchema[] {
  return [
    createOptionSchema(showMode, 'maintenanceCondition', '检修情况', demoOption2, '60%', 8),
    createOptionSchema(
      showMode,
      'oilChromatographicSituation',
      '油色谱分析试验异常情况',
      demoOption3,
      '60%',
      8,
    ),
    createOptionSchema(
      showMode,
      'electricalRecordSituation',
      '电气试验记录试验异常情况',
      demoOption3,
      '60%',
      8,
    ),
    createOptionSchema(showMode, 'oilSituation', '油化试验异常情况', demoOption3, '60%', 8),
    createOptionSchema(
      showMode,
      'operatingOrLightningOvervoltage',
      '有无操作/雷击过电压',
      demoOption3,
      '60%',
      8,
    ),
    createOptionSchema(showMode, 'shortTermAidLoad', '有无短期急救负载', demoOption3, '60%', 8),
    createOptionSchema(showMode, 'familyHealth', '家族运行状况数值', demoOption4, '60%', 8),
    createOptionSchema(
      showMode,
      'appearanceScore',
      '外观检查评分',
      demoOption5,
      '60%',
      8,
      'multiple',
    ),
    createOptionSchema(showMode, 'operatingEnvironment', '运行环境选择', demoOption6, '60%', 8),
  ];
}
