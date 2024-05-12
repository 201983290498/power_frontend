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
    title: '设备型号',
    dataIndex: 'type',
    width: 100,
  },

  {
    title: '综合得分',
    dataIndex: 'score',
    width: 100,
  },
  {
    title: '安装位置',
    dataIndex: 'location',
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
    customRender: ({ text }) => {
      // Check the value of 'status' and return the appropriate label
      return text === 1 ? '已上线' : '停用';
    },
  },
];
// 顶部搜索框
export const searchFormSchema: FormSchema[] = [
  {
    field: 'equipId',
    label: '设备Id',
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
    label: '设备状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
    colProps: { span: 3 },
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
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
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
