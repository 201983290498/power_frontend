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
    component: 'Input',
  },
  {
    field: 'equipId',
    label: '设备Id',
    required: true,
    component: 'Input',
  },
  {
    field: 'stateTime',
    label: '状态评估时间',
    required: true,
    component: 'Input',
  },
  {
    field: 'reliTime',
    label: '可靠性寿命预测时间',
    required: true,
    component: 'Input',
  },
  {
    field: 'ecoTime',
    label: '经济型寿命预测时间',
    required: true,
    component: 'Input',
  },
  {
    field: 'decTime',
    label: '运维决策时间',
    required: true,
    component: 'Input',
  },
];
