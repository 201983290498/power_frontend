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

export const step1Schemas: FormSchema[] = [
  createTextSchema('equipNo', '变压器编号', '60%', 6),
  createTextSchema('organization', '单位名称', '60%', 6),
  createTextSchema('substationName', '变电站名称', '60%', 6),
  createTextSchema('runNo', '运行编号', '60%', 6),
  createTimeSchema('operationTime', '投运时间', '60%', 6),
  createFormSchema('systemNominalVoltage', '系统标称电压', '60%', 2, 6),
  createTextSchema('model', '型号', '60%', 6),
  createFormSchema('phase', '相数', '60%', 2, 6),
  createTextSchema('location', '变压器安置地点（室内/室外）', '60%', 6),
  createFormSchema('capacity', '容量', '60%', 2, 6),
  createFormSchema('ratedVoltage', '额定电压', '60%', 2, 6),
  createTextSchema('connectionSymbol', '联结组标号', '60%', 6),
  createFormSchema('noLoadCurrent', '空载电流', '60%', 2, 6),
  createFormSchema('noLoadLoss', '空载损耗', '60%', 2, 6),
  createTextSchema('manufacturer', '制造厂家', '60%', 6),
  createTimeSchema('manufactureDate', '制造日期', '60%', 6),
  createTextSchema('factoryNo', '出厂序号', '60%', 6),
];

export const step2Schemas: FormSchema[] = [
  createFormSchema('avgmonthHotspotTemper', '每月平均温度', '60%', 2, 6),
  createOptionSchema('thermalModification', '热改性/非热改性', demoOption1, '60%', 6),
  createFormSchema('oilFurfuralindex', '油中糠醛指数', '60%', 2, 6),
  createFormSchema('temperature', '环境温度', '60%', 2, 6),
  createFormSchema('phaseAChange', 'A相短路阻抗变化量', '60%', 2, 6),
  createFormSchema('phaseBChange', 'B相短路阻抗变化量', '60%', 2, 6),
  createFormSchema('phaseCChange', 'C相短路阻抗变化量', '60%', 2, 6),
  createFormSchema('threePhaseRactanceMaxDiff', '三相电抗最大差值', '60%', 2, 6),
  createFormSchema('loadLossChange', '空载损耗变化量', '60%', 2, 6),
  createFormSchema('noLoadLossChange', '负载损耗变化量', '60%', 2, 6),
  createFormSchema('ratedCurrent', '额定电流', '60%', 2, 6),
  createFormSchema('loadCurrent', '负载电流', '60%', 2, 6),
  createFormSchema('noloadCurrent', '空载电流', '60%', 2, 6),
  createFormSchema('noLoadLossKey', '空载损耗', '60%', 2, 6),
  createFormSchema('loadLoss', '负载损耗', '60%', 2, 6),
  createFormSchema('designLife', '设计寿命', '60%', 2, 6),
];

export const step3Schemas: FormSchema[] = [
  createOptionSchema('maintenanceCondition', '检修情况', demoOption2, '60%', 8),
  createOptionSchema(
    'oilChromatographicSituation',
    '油色谱分析试验异常情况',
    demoOption3,
    '60%',
    8,
  ),
  createOptionSchema(
    'electricalRecordSituation',
    '电气试验记录试验异常情况',
    demoOption3,
    '60%',
    8,
  ),
  createOptionSchema('oilSituation', '油化试验异常情况', demoOption3, '60%', 8),
  createOptionSchema(
    'operatingOrLightningOvervoltage',
    '有无操作/雷击过电压',
    demoOption3,
    '60%',
    8,
  ),
  createOptionSchema('shortTermAidLoad', '有无短期急救负载', demoOption3, '60%', 8),
  createOptionSchema('familyHealth', '家族运行状况数值', demoOption4, '60%', 8),
  createOptionSchema('appearanceScore', '外观检查评分', demoOption5, '60%', 8, 'multiple'),
  createOptionSchema('operatingEnvironment', '运行环境选择', demoOption6, '60%', 8),
];
