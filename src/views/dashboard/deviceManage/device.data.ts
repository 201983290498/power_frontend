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
    title: '设备编号',
    dataIndex: 'equipNo',
    width: 60,
    ellipsis: true,
    sorter: (a, b) => a.equipNo - b.equipNo,
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
    colProps: { span: 4, offset: -2 },
    componentProps: {
      style: {
        borderRadius: '8px',
        border: '2px solid #ccc',
      },
    },
  },
  {
    field: 'equipName',
    label: '设备名称',
    component: 'Input',
    colProps: { span: 4 },
    componentProps: {
      style: {
        borderRadius: '8px',
        border: '2px solid #ccc',
      },
    },
  },
  {
    field: 'operationTime',
    label: '投运时间',
    component: 'Input',
    colProps: { span: 4 },
    helpMessage: '请输入年份即可,例如2024',
    componentProps: {
      style: {
        borderRadius: '8px',
        border: '2px solid #ccc',
      },
    },
  },
  {
    field: 'type',
    label: '设备型号',
    component: 'Input',
    colProps: { span: 4 },
    componentProps: {
      style: {
        borderRadius: '8px',
        border: '2px solid #ccc',
      },
    },
  },
  {
    field: 'substationName',
    label: '变电站名称',
    component: 'Input',
    colProps: { span: 4 },
    componentProps: {
      style: {
        borderRadius: '8px',
        border: '2px solid #ccc',
      },
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
    field: 'fixedPwd',
    label: '管理员密码',
    component: 'InputPassword',
    required: true,
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'equipId',
    label: '设备Id',
    component: 'InputNumber',
    required: false,
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'equipName',
    label: '设备名称',
    component: 'Input',
    required: true,
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'equipNo',
    required: true,
    label: '设备编号',
    component: 'Input',
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'personCharge',
    label: '评估人',
    required: true,
    component: 'Input',
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'score',
    label: '综合得分',
    required: true,
    component: 'Input',
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'evaluateTime',
    label: '评估日期',
    required: true,
    component: 'DatePicker',
    componentProps: {
      showTime: true, // 显示时间选择器
      format: 'YYYY-MM-DD HH:mm:ss', // 设置日期时间格式
      style: { width: '80%' },
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
      style: { width: '80%' },
    },
  },
  {
    field: 'capacity',
    label: '容量(kVA)',
    required: true,
    component: 'InputNumber',
    componentProps: {
      step: 0.0001,
      precision: 4,
      style: { width: '80%' },
    },
  },
  {
    field: 'connectionSymbol',
    label: '联结组标号',
    required: true,
    component: 'Input',
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'factoryNo',
    label: '出厂序号',
    required: true,
    component: 'Input',
    componentProps: {
      style: { width: '80%' },
    },
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
      style: { width: '80%' },
    },
  },
  {
    field: 'manufactureDate',
    label: '制造日期',
    required: true,
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      style: { width: '80%' },
    },
  },
  {
    field: 'manufacturer',
    label: '制造厂家',
    required: true,
    component: 'Input',
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'type',
    label: '型号',
    required: true,
    component: 'Input',
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'noLoadCurrent',
    label: '空载电流(A)',
    required: true,
    componentProps: {
      step: 0.0001,
      precision: 4,
      style: { width: '80%' },
    },
    component: 'InputNumber',
  },
  {
    field: 'noLoadLoss',
    label: '空载损耗(kw)',
    required: true,
    componentProps: {
      step: 0.0001,
      precision: 4,
      style: { width: '80%' },
    },
    component: 'InputNumber',
  },
  {
    field: 'operationTime',
    label: '投运时间',
    required: true,
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      style: { width: '80%' },
    },
  },
  {
    field: 'organization',
    label: '单位',
    required: true,
    component: 'Input',
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'phase',
    label: '相数',
    required: true,
    componentProps: {
      step: 0.0001,
      precision: 4,
      style: { width: '80%' },
    },
    component: 'InputNumber',
  },
  {
    field: 'ratedVoltage',
    label: '额定电压(kV)',
    required: true,
    componentProps: {
      step: 0.0001,
      precision: 4,
      style: { width: '80%' },
    },
    component: 'InputNumber',
  },
  {
    field: 'runNo',
    label: '运行编号',
    required: true,
    component: 'Input',
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'substationName',
    label: '变电站名称',
    required: true,
    component: 'Input',
    componentProps: {
      style: { width: '80%' },
    },
  },
  {
    field: 'systemNominalVoltage',
    label: '系统标称电压(kV)',
    required: true,
    componentProps: {
      step: 0.0001,
      precision: 4,
      style: { width: '80%' },
    },
    component: 'InputNumber',
    labelWidth: 120, // 设置label的宽度为120px
  },
];
export const Viewform: FormSchema[] = [
  {
    field: 'equipId',
    label: '设备Id',
    component: 'InputNumber',
    required: true,
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'equipName',
    label: '设备名称',
    component: 'Input',
    required: true,
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'equipNo',
    required: true,
    label: '设备编号',
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'personCharge',
    label: '评估人',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'score',
    label: '综合得分',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'evaluateTime',
    label: '评估日期',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'status',
    label: '状态',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'capacity',
    label: '容量(kVA)',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'connectionSymbol',
    label: '联结组标号',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'factoryNo',
    label: '出厂序号',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
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
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'manufactureDate',
    label: '制造日期',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'manufacturer',
    label: '制造厂家',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'type',
    label: '型号',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'noLoadCurrent',
    label: '空载电流(A)',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'noLoadLoss',
    label: '空载损耗(kw)',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'operationTime',
    label: '投运时间',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'organization',
    label: '单位',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'phase',
    label: '相数',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'ratedVoltage',
    label: '额定电压(kV)',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'runNo',
    label: '运行编号',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'substationName',
    label: '变电站名称',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
      style: { width: '80%' },
    },
  },
  {
    field: 'systemNominalVoltage',
    label: '系统标称电压(kV)',
    required: true,
    componentProps: {
      step: 0.0001,
      precision: 4,
      disabled: true,
      style: { width: '80%' },
    },
    component: 'InputNumber',
  },
];

export const DeleteSchema: FormSchema[] = [];
