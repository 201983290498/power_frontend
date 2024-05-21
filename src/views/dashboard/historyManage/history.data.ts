import { BasicColumn, FormSchema } from '/@/components/Table';
import moment from 'moment';
import { exportHistory } from '/@/api/sys/history';
import { ExportHistoryData } from '/@/api/sys/model/historyModal';
import { forEach } from '/@/utils/helper/treeHelper';

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
    //   return text === -1
    //     ? '<span style="background-color:  blue; color: white;"></span>'
    //     : `<span>${text}</span>`;
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

function objectToCSV(objects: Array<Object>): string {
  console.log('objects', objects);
  // 将数组对象转换成csv.
  const headers = Object.keys(objects[0]['input']);
  console.log('inputs', objects[0]['input']);
  headers.push('divider');
  headers.push(...Object.keys(objects[0]['output']));
  if (objects.length > 1) {
    //合并导出
    let csv = headers.join(',') + '\n'; // 将对象的键作为CSV的头部
    for (const obj of objects) {
      const newObj = { ...obj['input'], ...obj['output'], divider: '输入输出分界线' };
      const values = headers.map((header) => {
        return `"${newObj[header].toString().replace(/"/g, '""')}"`; // 将每个属性值转换为CSV格式
      });
      csv += values.join(',') + '\n'; // 将每个对象的属性值拼接成一行
    }
    return csv;
  } else {
    // 单个导出
    let csv = '数据字段,数据值\n';
    const newObj = { ...objects[0]['input'], ...objects[0]['output'], divider: '输入输出分界线' };
    for (const header of headers) {
      csv += `${header},${newObj[header]}\n`;
    }
    return csv;
  }
}

export async function downloadJsonRecord(testId: Array<string | number> | string | number) {
  try {
    if (!(testId instanceof Array)) {
      testId = [testId];
    }
    const writeData: Array<ExportHistoryData> = [];
    for (const tmpId of testId) {
      const response: ExportHistoryData = await exportHistory({ testId: tmpId });
      writeData.push(response);
    }
    if (writeData.length > 0) {
      // 创建 JSON 文件
      const dataList = [[], [], [], []];
      writeData.forEach((data) => {
        if (data['stateEvaluate']['input'] !== null) {
          dataList[0].push(data['stateEvaluate']);
        }
        if (data['reliabilityEvaluate']['input'] !== null) {
          dataList[1].push(data['reliabilityEvaluate']);
        }
        if (data['economyEvaluate']['input'] !== null) {
          dataList[2].push(data['economyEvaluate']);
        }
        if (data['decisionEvaluate']['input'] !== null) {
          dataList[3].push(data['decisionEvaluate']);
        }
      });
      dataList.forEach((data, idx) => {
        if (data.length === 0) return;
        const names = [
          '状态评估历史记录',
          '可靠性评估历史记录',
          '经济性评估历史记录',
          '运维决策历史记录',
        ];
        const csv = objectToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${names[idx]}.csv`;
        a.style.visibility = 'hidden';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    } else {
      console.error('Failed to export data:');
    }
  } catch (error) {
    console.error('Export failed:', error);
  }
}
