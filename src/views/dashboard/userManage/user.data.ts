import moment from 'moment';
import { BasicColumn, FormSchema } from '/@/components/Table';
// 注册的列名
export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'userName',
    width: 100,
  },
  {
    title: '用户id',
    dataIndex: 'userId',
    width: 100,
    sorter: (a, b) => a.userId - b.userId,
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
    width: 120,
    customRender: ({ text }) => {
      return text === 'ADMIN' ? '管理员' : '普通用户';
    },
  },
  {
    title: '上次登录时间',
    dataIndex: 'lastLogin',
    width: 150,
    customRender: ({ text }) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    ellipsis: true,
    sorter: (a, b) => {
      const dateA = moment(a.lastLogin);
      const dateB = moment(b.lastLogin);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: '权限等级',
    dataIndex: 'level',
    width: 50,
    sorter: (a, b) => a.level - b.level,
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
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '管理员', value: 'ADMIN' },
        { label: '普通用户', value: 'USER' },
      ],
      onChange: (value) => {
        console.log('Selected Status:', value);
        // 可以在这里根据 value 的变化做进一步处理
      },
    },
    colProps: { span: 4 },
  },
];
// 新增页面的效果
export const formSchema: FormSchema[] = [
  {
    field: 'adminName',
    label: '管理员',
    required: true,
    component: 'Input',
  },
  {
    field: 'adminPwd',
    label: '管理员密码',
    required: true,
    component: 'InputPassword',
  },

  {
    field: 'userName',
    required: true,
    label: '用户名',
    component: 'Input',
  },
  {
    field: 'userId',
    label: '用户ID',
    required: false,
    componentProps: { disabled: true },
    component: 'InputNumber',
  },
  {
    field: 'password',
    label: '密码',
    required: true,
    component: 'InputPassword',
  },
  {
    field: 'role',
    label: '用户类型',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '管理员', value: 'ADMIN' },
        { label: '普通用户', value: 'USER' },
      ],
    },
  },
  {
    field: 'organization',
    label: '所属单位',
    required: true,
    component: 'Input',
  },
  {
    field: 'personCharge',
    label: '责任人',
    required: true,
    component: 'Input',
  },
  {
    field: 'level',
    label: '权限等级',
    required: true,
    component: 'InputNumber',
  },
];
export const Viewform: FormSchema[] = [
  {
    field: 'userName',
    required: true,
    label: '用户名',
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'userId',
    label: '用户ID',
    required: false,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'password',
    label: '密码',
    required: true,
    component: 'InputPassword',
    componentProps: { disabled: true },
  },
  {
    field: 'role',
    label: '用户类型',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'organization',
    label: '所属单位',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'personCharge',
    label: '责任人',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'level',
    label: '权限等级',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
];
