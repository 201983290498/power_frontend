import { BasicColumn, FormSchema } from '/@/components/Table';
// 注册的列名
export const columns: BasicColumn[] = [
  {
    title: '设备Id',
    dataIndex: 'equipId',
    width: 50,
  },
  {
    title: '设备编号',
    dataIndex: 'equipNo',
    width: 100,
  },
  {
    title: '评估人',
    dataIndex: 'personCharge',
    width: 100,
  },
  {
    title: '综合得分',
    dataIndex: 'score',
    width: 100,
  },
  {
    title: '评估日期',
    dataIndex: 'evaluateTime',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
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
    field: 'equipId',
    label: '设备Id',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'personCharge',
    label: '评估人',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'score',
    label: '得分(≥)',
    component: 'Input',
    colProps: { span: 3 },
  },
  {
    field: 'status',
    label: '设备状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
    colProps: { span: 3 },
  },
];
// 新增页面的效果
export const formSchema: FormSchema[] = [
  {
    field: 'equipNo',
    required: true,
    label: '设备编号',
    component: 'Input',
  },
  {
    field: 'roleValue',
    label: '角色值',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleValue',
    label: '角色值',
    required: true,
    component: 'Input',
  },

  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
