import { BasicColumn, FormSchema } from '/@/components/Table';
import moment from 'moment';

// 注册的列名
export const columns: BasicColumn[] = [
  {
    title: '设备编号',
    dataIndex: 'equipNo',
    width: 50,
  },
  {
    title: '评估时间',
    dataIndex: 'evaluateTime',
    width: 100,
    customRender: ({ text }) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '评估人',
    dataIndex: 'personCharge',
    width: 50,
  },
  {
    title: '状态评估Id',
    dataIndex: 'stateId',
    width: 50,
  },
  {
    title: '状态评估得分',
    dataIndex: 'lastResult',
    width: 50,
  },
  {
    title: '可靠性评估Id',
    dataIndex: 'reliabilityId',
    width: 70,
  },
  {
    title: '剩余可靠性寿命',
    dataIndex: 'resReliabilityLife',
    width: 70,
  },
  {
    title: '经济性评估Id',
    dataIndex: 'economyId',
    width: 70,
  },
  {
    title: '年均成本',
    dataIndex: 'avgAnnualCost',
    width: 50,
  },
  {
    title: '运维决策Id',
    dataIndex: 'decisionId',
    width: 50,
  },
  {
    title: '建议检修方式',
    dataIndex: 'suggestedMaintenanceMethod',
    width: 70,
  },
];

// 顶部搜索框
export const searchFormSchema: FormSchema[] = [
  {
    field: 'equipNo',
    label: '设备编号',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'evaluateId',
    label: '评估Id',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'personCharge',
    label: '责任人',
    component: 'Input',
    colProps: { span: 4 },
  },
];
// 新增页面的效果
export const formSchema: FormSchema[] = [
  {
    field: 'testId',
    required: true,
    label: '测试Id',
    labelWidth: 150,
    component: 'InputNumber',
  },
];
export const exportSchema: FormSchema[] = [
  {
    field: 'equipId',
    label: '设备Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'stateId',
    label: '状态评估Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'reliabilityId',
    label: '可靠性Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'economyId',
    label: '经济性Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'decisionId',
    label: '运维决策Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
];
export const stateSchema: FormSchema[] = [
  {
    field: 'decisionId',
    label: '运维决策Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
];
export const reliabilitySchema: FormSchema[] = [
  {
    field: 'decisionId',
    label: '运维决策Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
];
export const economySchema: FormSchema[] = [
  {
    field: 'decisionId',
    label: '运维决策Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
];
export const decisionSchema: FormSchema[] = [
  {
    field: 'decisionId',
    label: '运维决策Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
];
