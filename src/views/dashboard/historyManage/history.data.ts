import { BasicColumn, FormSchema } from '/@/components/Table';
import moment from 'moment';
import { exportHistory } from '/@/api/sys/history';

// 注册的列名
export const columns: BasicColumn[] = [
  {
    title: '设备Id',
    dataIndex: 'equipId',
    width: 50,
    ellipsis: true,
    sorter: (a, b) => a.equipId - b.equipId,
  },
  {
    title: '设备编号',
    dataIndex: 'equipNo',
    width: 80,
    ellipsis: true,
    sorter: (a, b) => a.equipNo - b.equipNo,
  },
  {
    title: '评估时间',
    dataIndex: 'evaluateTime',
    width: 100,
    customRender: ({ text }) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    ellipsis: true,
    sorter: (a, b) => {
      const dateA = moment(a.evaluateTime);
      const dateB = moment(b.evaluateTime);
      return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
    },
  },
  {
    title: '评估人',
    dataIndex: 'personCharge',
    width: 50,
    ellipsis: true,
  },
  {
    title: '状态评估Id',
    dataIndex: 'stateId',
    width: 50,
    ellipsis: true,
  },
  {
    title: '状态评估得分',
    dataIndex: 'lastResult',
    sorter: (a, b) => a.lastResult - b.lastResult,
    width: 50,
    ellipsis: true,
  },
  {
    title: '可靠性评估Id',
    dataIndex: 'reliabilityId',
    width: 70,
    ellipsis: true,
    // customRender: ({ text }) => {
    //   if (text === -1) {
    //     return {
    //       children: undefined,
    //       attrs: {
    //         style: 'background-color: blue; color: blue;',
    //       },
    //     };
    //   }
    //   return text;
    // },
  },
  {
    title: '剩余可靠性寿命',
    dataIndex: 'resReliabilityLife',
    width: 50,
    ellipsis: true,
    sorter: (a, b) => a.resReliabilityLife - b.resReliabilityLife,
  },
  {
    title: '经济性评估Id',
    dataIndex: 'economyId',
    width: 50,
    ellipsis: true,
  },
  {
    title: '年均成本',
    dataIndex: 'avgAnnualCost',
    sorter: (a, b) => a.avgAnnualCost - b.avgAnnualCost,
    width: 50,
    ellipsis: true,
  },
  {
    title: '运维决策Id',
    dataIndex: 'decisionId',
    width: 50,
    ellipsis: true,
  },
  {
    title: '建议检修方式',
    dataIndex: 'suggestedMaintenanceMethod',
    width: 50,
    ellipsis: true,
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
    field: 'personCharge',
    label: '评估人',
    component: 'Input',
    colProps: { span: 4 },
  },
];

// 新增页面的效果
export const formSchema: FormSchema[] = [
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

// 导出页面的效果
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

// 其他表单
export const stateSchema: FormSchema[] = [
  {
    field: 'decisionId',
    label: '运维决策Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
];
export const reliabilitySchema: FormSchema[] = [
  {
    field: 'decisionId',
    label: '运维决策Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
];
export const economySchema: FormSchema[] = [
  {
    field: 'decisionId',
    label: '运维决策Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
];
export const decisionSchema: FormSchema[] = [
  {
    field: 'decisionId',
    label: '运维决策Id',
    labelWidth: 150,
    required: true,
    component: 'InputNumber',
  },
];

export async function downloadJsonRecord(testId) {
  try {
    const params = {
      testId,
    };

    // 调用 API 获取数据
    const response = await exportHistory(params);
    if (response) {
      const data = response.result;
      // 创建 JSON 文件
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `history_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      console.error('Failed to export data:');
    }
  } catch (error) {
    console.error('Export failed:', error);
  }
}
