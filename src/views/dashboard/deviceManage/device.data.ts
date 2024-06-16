import moment from 'moment';
import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '设备ID',
    dataIndex: 'equipId',
    width: 60,
    ellipsis: true,
    sorter: (a, b) => a.equipId - b.equipId,
    customHeaderCell: () => {
      return {
        style: {
          fontWeight: 'bold',
        },
      };
    },
  },
  {
    title: '设备名称',
    dataIndex: 'equipName',
    width: 60,
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
    title: '设备编号',
    dataIndex: 'equipNo',
    width: 60,
    ellipsis: true,
    sorter: (a, b) => a.equipNo.length - b.equipNo.length,
    customHeaderCell: () => {
      return {
        style: {
          fontWeight: 'bold',
        },
      };
    },
  },
  {
    title: '变电站名称',
    dataIndex: 'substationName',
    width: 60,
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
    title: '投运时间',
    dataIndex: 'operationTime',
    width: 80,
    customRender: ({ text }) => moment(text).format('YYYY-MM-DD'),
    ellipsis: true,
    sorter: (a, b) => {
      const dateA = moment(a.operationTime);
      const dateB = moment(b.operationTime);
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
    title: '评估人',
    dataIndex: 'personCharge',
    width: 60,
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
    title: '设备型号',
    dataIndex: 'type',
    width: 60,
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
    title: '综合得分',
    dataIndex: 'score',
    width: 50,
    sorter: (a, b) => a.score - b.score,
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
    title: '最新运行状态',
    dataIndex: 'status',
    width: 40,
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
    field: 'equipNo',
    label: '设备编号',
    component: 'Input',
    colProps: { span: 3 },
    componentProps: {
      class: 'custom-search-input',
    },
  },
  {
    field: 'equipName',
    label: '设备名称',
    component: 'Input',
    colProps: { span: 4 },
    componentProps: {
      class: 'custom-search-input',
    },
  },
  {
    field: 'operationTime',
    label: '投运时间',
    component: 'Input',
    colProps: { span: 4 },
    helpMessage: '请输入年份即可,例如2024',
    componentProps: {
      class: 'custom-search-input',
    },
  },
  {
    field: 'type',
    label: '设备型号',
    component: 'Input',
    colProps: { span: 3 },
    componentProps: {
      class: 'custom-search-input',
    },
  },
  {
    field: 'substationName',
    label: '变电站名称',
    component: 'Input',
    colProps: { span: 4 },
    componentProps: {
      class: 'custom-search-input',
    },
  },
  {
    field: 'status',
    label: '最新运行状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '严重', value: '严重' },
        { label: '异常', value: '异常' },
        { label: '注意', value: '注意' },
        { label: '正常', value: '正常' },
      ],
      class: 'custom-search-input',
    },
    colProps: { span: 4 },
  },
];

// 新增页面的效果
export const formSchema: FormSchema[] = [
  {
    field: 'fixedPwd',
    label: '管理员密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'equipId',
    label: '设备Id',
    component: 'InputNumber',
    required: false,
    componentProps: { disabled: true },
  },
  {
    field: 'equipName',
    label: '设备名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'equipNo',
    required: true,
    label: '设备编号',
    component: 'Input',
  },
  {
    field: 'personCharge',
    label: '评估人',
    required: true,
    component: 'Input',
  },
  {
    field: 'score',
    label: '综合得分',
    required: true,
    component: 'Input',
  },
  {
    field: 'evaluateTime',
    label: '评估日期',
    required: true,
    component: 'DatePicker',
    componentProps: {
      showTime: true, // 显示时间选择器
      format: 'YYYY-MM-DD HH:mm:ss', // 设置日期时间格式
      style: { width: '100%' },
    },
  },
  {
    field: 'status',
    label: '最新运行状态',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '严重', value: '严重' },
        { label: '异常', value: '异常' },
        { label: '注意', value: '注意' },
        { label: '正常', value: '正常' },
      ],
    },
  },
  {
    field: 'capacity',
    label: '容量',
    required: true,
    component: 'InputNumber',
    componentProps: { step: 0.0001, precision: 4 },
  },
  {
    field: 'connectionSymbol',
    label: '联结组标号',
    required: true,
    component: 'Input',
  },
  {
    field: 'factoryNo',
    label: '出厂序号',
    required: true,
    component: 'Input',
  },
  {
    field: 'location',
    label: '安装位置',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '室内', value: 'indoor' },
        { label: '室外', value: 'outdoor' },
      ],
    },
  },
  {
    field: 'manufactureDate',
    label: '制造日期',
    required: true,
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      style: { width: '100%' },
    },
  },
  {
    field: 'manufacturer',
    label: '制造厂家',
    required: true,
    component: 'Input',
  },
  {
    field: 'type',
    label: '型号',
    required: true,
    component: 'Input',
  },
  {
    field: 'noLoadCurrent',
    label: '空载电流',
    required: true,
    componentProps: { step: 0.0001, precision: 4 },
    component: 'InputNumber',
  },
  {
    field: 'noLoadLoss',
    label: '空载损耗',
    required: true,
    componentProps: { step: 0.0001, precision: 4 },
    component: 'InputNumber',
  },
  {
    field: 'operationTime',
    label: '投运时间',
    required: true,
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      style: { width: '100%' },
    },
  },
  {
    field: 'organization',
    label: '单位',
    required: true,
    component: 'Input',
  },
  {
    field: 'phase',
    label: '相数',
    required: true,
    componentProps: { step: 0.0001, precision: 4 },
    component: 'InputNumber',
  },
  {
    field: 'ratedVoltage',
    label: '额定电压',
    required: true,
    componentProps: { step: 0.0001, precision: 4 },
    component: 'InputNumber',
  },
  {
    field: 'runNo',
    label: '运行编号',
    required: true,
    component: 'Input',
  },
  {
    field: 'substationName',
    label: '变电站名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'systemNominalVoltage',
    label: '系统标称电压',
    required: true,
    componentProps: { step: 0.0001, precision: 4 },
    component: 'InputNumber',
  },
];
export const Viewform: FormSchema[] = [
  {
    field: 'equipId',
    label: '设备Id',
    component: 'InputNumber',
    required: true,
    componentProps: { disabled: true },
  },
  {
    field: 'equipName',
    label: '设备名称',
    component: 'Input',
    required: true,
    componentProps: { disabled: true },
  },
  {
    field: 'equipNo',
    required: true,
    label: '设备编号',
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'personCharge',
    label: '评估人',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'score',
    label: '综合得分',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'evaluateTime',
    label: '评估日期',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'status',
    label: '状态',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'capacity',
    label: '容量',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'connectionSymbol',
    label: '联结组标号',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'factoryNo',
    label: '出厂序号',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'location',
    label: '安装位置',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '室外', value: 'indoor' }, // 将indoor的label改为室外
        { label: '室外', value: 'outdoor' }, // 保持outdoor的label为室外
      ],
      disabled: true,
    },
    // 确保组件不可修改
  },
  {
    field: 'manufactureDate',
    label: '制造日期',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'manufacturer',
    label: '制造厂家',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'type',
    label: '型号',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'noLoadCurrent',
    label: '空载电流',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'noLoadLoss',
    label: '空载损耗',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'operationTime',
    label: '投运时间',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'organization',
    label: '单位',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'phase',
    label: '相数',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'ratedVoltage',
    label: '额定电压',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'runNo',
    label: '运行编号',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'substationName',
    label: '变电站名称',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'systemNominalVoltage',
    label: '系统标称电压',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
  },
];
export const DeleteSchema: FormSchema[] = [];
