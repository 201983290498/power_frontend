import moment from 'moment';
import { BasicColumn, FormSchema } from '/@/components/Table';
// 注册的列名
export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'userName',
    width: 50,
    ellipsis: true,
    customHeaderCell: () => {
      return {
        style: {
          fontWeight: 'bold',
        },
      };
    },
  },
  {
    title: '用户id',
    dataIndex: 'userId',
    width: 50,
    sorter: (a, b) => a.userId - b.userId,
    ellipsis: true,
    customHeaderCell: () => {
      return {
        style: {
          fontWeight: 'bold',
        },
      };
    },
  },
  {
    title: '所属单位',
    dataIndex: 'organization',
    width: 50,
    ellipsis: true,
    customHeaderCell: () => {
      return {
        style: {
          fontWeight: 'bold',
        },
      };
    },
  },
  {
    title: '责任人',
    dataIndex: 'personCharge',
    width: 50,
    ellipsis: true,
    customHeaderCell: () => {
      return {
        style: {
          fontWeight: 'bold',
        },
      };
    },
  },
  {
    title: '用户类型',
    dataIndex: 'role',
    width: 50,
    customRender: ({ text }) => {
      return text === 'ADMIN' ? '管理员' : '普通用户';
    },
    sorter: (a, b) => a.role.length - b.role.length,
    ellipsis: true,
    customHeaderCell: () => {
      return {
        style: {
          fontWeight: 'bold',
        },
      };
    },
  },
  {
    title: '上次登录时间',
    dataIndex: 'lastLogin',
    width: 100,
    customRender: ({ text }) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    ellipsis: true,
    sorter: (a, b) => {
      const dateA = moment(a.lastLogin);
      const dateB = moment(b.lastLogin);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
    customHeaderCell: () => {
      return {
        style: {
          fontWeight: 'bold',
        },
      };
    },
  },
  {
    title: '权限等级',
    dataIndex: 'level',
    width: 50,
    sorter: (a, b) => a.level - b.level,
    ellipsis: true,
    customHeaderCell: () => {
      return {
        style: {
          fontWeight: 'bold',
        },
      };
    },
  },
];
// 顶部搜索框
export const searchFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    colProps: { span: 4 },
    componentProps: {
      style: {
        borderRadius: '20px', // 调整圆角半径
        border: '2px solid #ccc', // 边框颜色改为灰色
      },
    },
  },
  {
    field: 'organization',
    label: '所属单位',
    component: 'Input',
    colProps: { span: 4 },
    componentProps: {
      style: {
        borderRadius: '20px', // 调整圆角半径
        border: '2px solid #ccc', // 边框颜色改为灰色
      },
    },
  },
  {
    field: 'personCharge',
    label: '责任人',
    component: 'Input',
    colProps: { span: 4 },
    componentProps: {
      style: {
        borderRadius: '20px', // 调整圆角半径
        border: '2px solid #ccc', // 边框颜色改为灰色
      },
    },
  },
  {
    field: 'role',
    label: '用户类型',
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
      style: {
        border: '2px solid #ccc', // 边框颜色改为灰色
        // 增加内边距以确保样式应用
        boxSizing: 'border-box',
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
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'adminPwd',
    label: '管理员密码',
    required: true,
    component: 'InputPassword',
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'userName',
    required: true,
    label: '用户名',
    component: 'Input',
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'userId',
    label: '用户ID',
    required: false,
    component: 'InputNumber',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'password',
    label: '密码',
    required: true,
    component: 'InputPassword',
    componentProps: {
      style: { width: '80%' },
    },
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
      style: { width: '80%' },
    },
  },
  {
    field: 'organization',
    label: '所属单位',
    required: true,
    component: 'Input',
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'personCharge',
    label: '责任人',
    required: true,
    component: 'Input',
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'level',
    label: '权限等级',
    required: true,
    component: 'InputNumber',
    componentProps: {
      style: { width: '80%' },
    },
  },
];

export const Viewform: FormSchema[] = [
  {
    field: 'userName',
    required: true,
    label: '用户名',
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'userId',
    label: '用户ID',
    required: false,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'password',
    label: '密码',
    required: true,
    component: 'InputPassword',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'role',
    label: '用户类型',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'organization',
    label: '所属单位',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'personCharge',
    label: '责任人',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'level',
    label: '权限等级',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
];
