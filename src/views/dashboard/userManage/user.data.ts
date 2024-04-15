import { BasicColumn, FormSchema } from '/@/components/Table';
// 注册的列名
export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'userName',
    width: 50,
  },
  {
    title: '用户id',
    dataIndex: 'userId',
    width: 50,
  },
  {
    title: '所属单位',
    dataIndex: 'organization',
    width: 100,
  },
  {
    title: '责任人',
    dataIndex: 'personCharge',
    width: 100,
  },
  {
    title: '用户类型',
    dataIndex: 'role',
    width: 100,
  },
  {
    title: '上次登录时间',
    dataIndex: 'lastLogin',
    width: 150,
  },
  {
    title: '权限等级',
    dataIndex: 'level',
    width: 100,
  },
];
// 顶部搜索框
export const searchFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'organization',
    label: '所属单位',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'personCharge',
    label: '责任人',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'role',
    label: '用户类型',
    component: 'Input',
    colProps: { span: 4 },
  },
];
// 新增页面的效果
export const formSchema: FormSchema[] = [
  {
    field: 'userName',
    required: true,
    label: '用户名',
    component: 'Input',
  },
  {
    field: 'role',
    label: '用户类型',
    required: true,
    component: 'Input',
  },
  {
    field: 'organization',
    label: '所属单位',
    required: true,
    component: 'Input',
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
