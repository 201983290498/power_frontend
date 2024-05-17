import { BasicColumn, FormSchema } from '/@/components/Table';
import moment from 'moment';

// 注册的列名
export const columns: BasicColumn[] = [
  {
    title: '设备编号',
    dataIndex: 'equipNo',
    width: 50,
    ellipsis: true,
    sorter: (a, b) => a.equipNo - b.equipNo,
  },
  {
    title: '评估时间',
    dataIndex: 'evaluateTime',
    width: 60,
    customRender: ({ text }) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    ellipsis: true,
    sorter: (a, b) => {
      const dateA = moment(a.evaluateTime);
      const dateB = moment(b.evaluateTime);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: '评估人',
    dataIndex: 'personCharge',
    width: 50,
    ellipsis: true,
  },
  {
    title: '状态评估Id',
    dataIndex: 'stateId',
    width: 50,
    ellipsis: true,
  },
  {
    title: '状态评估得分',
    dataIndex: 'lastResult',
    sorter: (a, b) => a.lastResult - b.lastResult,
    width: 50,
    ellipsis: true,
  },
  {
    title: '可靠性评估Id',
    dataIndex: 'reliabilityId',
    width: 50,
    ellipsis: true,
  },
  {
    title: '剩余可靠性寿命',
    dataIndex: 'resReliabilityLife',
    width: 50,
    ellipsis: true,
    sorter: (a, b) => a.resReliabilityLife - b.resReliabilityLife,
  },
  {
    title: '经济性评估Id',
    dataIndex: 'economyId',
    width: 50,
    ellipsis: true,
  },
  {
    title: '年均成本',
    dataIndex: 'avgAnnualCost',
    sorter: (a, b) => a.avgAnnualCost - b.avgAnnualCost,
    width: 50,
    ellipsis: true,
  },
  {
    title: '运维决策Id',
    dataIndex: 'decisionId',
    width: 50,
    ellipsis: true,
  },
  {
    title: '建议检修方式',
    dataIndex: 'suggestedMaintenanceMethod',
    width: 50,
    ellipsis: true,
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

// 导出页面的效果
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

// 其他表单
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
