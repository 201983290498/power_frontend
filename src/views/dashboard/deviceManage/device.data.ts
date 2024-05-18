import moment from 'moment';
import { BasicColumn, FormSchema } from '/@/components/Table';
// 注册的列名
export const columns: BasicColumn[] = [
  {
    title: '设备ID',
    dataIndex: 'equipId',
    width: 60,
    ellipsis: true,
    sorter: (a, b) => a.equipId - b.equipId,
  },
  {
    title: '设备编号',
    dataIndex: 'equipNo',
    width: 120,
    ellipsis: true,
    sorter: (a, b) => a.equipNo.length - b.equipNo.length,
  },
  {
    title: '评估人',
    dataIndex: 'personCharge',
    width: 120,
    ellipsis: true,
  },
  {
    title: '设备型号',
    dataIndex: 'type',
    width: 120,
    ellipsis: true,
  },
  {
    title: '综合得分',
    dataIndex: 'score',
    width: 120,
    sorter: (a, b) => a.score - b.score,
    ellipsis: true,
  },
  {
    title: '安装位置',
    dataIndex: 'location',
    width: 120,
    ellipsis: true,
  },
  {
    title: '评估时间',
    dataIndex: 'evaluateTime',
    width: 120,
    customRender: ({ text }) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    ellipsis: true,
    sorter: (a, b) => {
      const dateA = moment(a.evaluateTime);
      const dateB = moment(b.evaluateTime);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ text }) => {
      const numericStatus = Number(text);
      return numericStatus === 1 ? '启用' : '停用';
    },
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
    field: 'type',
    label: '设备型号',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'location',
    label: '安装位置',
    component: 'Input',
    colProps: { span: 4 },
  },
  /*{
    field: 'status',
    label: '状态',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
      onChange: (value) => {
        console.log('Selected Status:', value);
        // 可以在这里根据 value 的变化做进一步处理
      },
    },
    colProps: { span: 4 },
  },*/
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
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
  {
    field: 'capacity',
    label: '容量',
    required: true,
    component: 'Input',
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
    label: '安置地点',
    required: true,
    component: 'Input',
  },
  {
    field: 'manufactureDate',
    label: '制造日期',
    required: true,
    component: 'Input',
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
    component: 'Input',
  },
  {
    field: 'noLoadLoss',
    label: '空载损耗',
    required: true,
    componentProps: { step: 0.0001, precision: 4 },
    component: 'Input',
  },
  {
    field: 'operationTime',
    label: '投运时间',
    required: true,
    component: 'Input',
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
    component: 'Input',
  },
  {
    field: 'ratedVoltage',
    label: '额定电压',
    required: true,
    componentProps: { step: 0.0001, precision: 4 },
    component: 'Input',
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
    component: 'Input',
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
    label: '安置地点',
    required: true,
    component: 'Input',
    componentProps: { disabled: true },
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
