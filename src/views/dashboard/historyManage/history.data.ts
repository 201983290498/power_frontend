import { BasicColumn, FormSchema } from '/@/components/Table';
// 注册的列名
export const columns: BasicColumn[] = [
  {
    title: '测试Id',
    dataIndex: 'testId',
    width: 100,
  },
  {
    title: '设备Id',
    dataIndex: 'equipId',
    width: 100,
  },
  {
    title: '状态评估时间',
    dataIndex: 'stateTime',
    width: 150,
  },
  {
    title: '可靠性寿命预测时间',
    dataIndex: 'reliTime',
    width: 100,
  },
  {
    title: '经济型寿命预测时间',
    dataIndex: 'ecoTime',
    width: 100,
  },
  {
    title: '运营决策时间',
    dataIndex: 'decTime',
    width: 100,
  },
];
// 顶部搜索框
export const searchFormSchema: FormSchema[] = [
  {
    field: 'testId',
    label: '测试Id',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'equipId',
    label: '设备Id',
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
export const ViewSchema: FormSchema[] = [
  {
    field: 'decisionId',
    label: '运维决策Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
];
