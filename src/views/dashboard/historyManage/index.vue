<template>
  <Card>
    <BasicTable :searchInfo="searchModel" @register="registerTable" :scroll="{ x: 2000, y: 3000 }">
      <template #toolbar>
        <!--a-button type="primary" @click="handleCreate"> 写入历史数据 </a-button-->
        <a-button @click="toggleSortOrder">切换排序</a-button>
        <a-button @click="handleExportSelected" type="primary" :innerText="loadText" />
        <a-button v-if="isLoadOut" type="primary" :innerText="`取消导出`" @click="quitLoadout" />
        <!-- <a-button v-if="isLoadOut" type="primary" @click="toggleSelectAll">{{
          selectAllText
        }}</a-button> -->
      </template>
      <template #stateId="{ record }">
        <!-- <div style="width: 100%; height: 100%" @click="console.log(111)">
          {{ record.stateId }}
        </div> -->
        <a-button v-if="record.stateId !== -1" @click="handleWatch(record, type1)">{{
          record.stateId
        }}</a-button>
      </template>
      <template #reliabilityId="{ record }">
        <!-- <div style="width: 100%; height: 100%" @click="console.log(111)">
          {{ record.stateId }}
        </div> -->
        <a-button v-if="record.reliabilityId !== -1" @click="handleWatch(record, type2)">{{
          record.reliabilityId
        }}</a-button>
      </template>
      <template #economyId="{ record }">
        <!-- <div style="width: 100%; height: 100%" @click="console.log(111)">
          {{ record.stateId }}
        </div> -->
        <a-button v-if="record.economyId !== -1" @click="handleWatch(record, type3)">{{
          record.economyId
        }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getActions(record)" />
      </template>
    </BasicTable>
  </Card>
</template>
<script lang="ts" setup>
  import { defineProps, reactive, ref, watch } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getHistoryList } from '/@/api/sys/history';
  import { columns, downloadJsonRecord, searchFormSchema } from './history.data';
  import { Card } from 'ant-design-vue';
  import { Props } from '/@/components/Table/src/hooks/useTable';
  import { useMessage } from '/@/hooks/web/useMessage';
  import logo from '/@/assets/images/1.jpg';
  import { viewDevice } from '/@/api/sys/device';
  import { getDevopsRecordInput, getDevopsRecordOutput } from '/@/api/evalution/devops';
  import { getStateRecordInput, getStateRecordOutput } from '/@/api/evalution/state';
  import { getReliableRecordInput, getReliableRecordOutput } from '/@/api/evalution/reliability';
  import { getEconomyRecordInput, getEconomyRecordOutput } from '/@/api/evalution/economy';
  import { useRouteParams } from '/@/store/modules/route';
  import { useGo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';

  const { createMessage } = useMessage();
  const { warning } = createMessage;
  const emit = defineEmits(['select']);
  const loadText = ref('导出数据');
  const selectAllText = ref('全选');
  const props = defineProps({
    reSize: {
      type: Boolean,
      default: true,
    },
    maxHeight: {
      type: Number,
      default: -1,
    },
    chooseMode: {
      type: Boolean,
      default: false,
    },
    conditions: {
      type: Object,
      default: () => ({}),
    },
  });
  //保存一组被选中的记录
  const selectedRows = ref(new Set());
  const routeParam = useRouteParams();
  const go = useGo();
  const type1 = 'state';
  const type2 = 'reliability';
  const type3 = 'economy';
  const searchModel = reactive({
    equipNo: '',
    personCharge: '',
    equipId: 0, // 初始化为number类型
    sortBy: 'evaluateTime', // 默认排序字段
    sortOrder: 'desc', // 默认降序
    page: 1,
    pageSize: 10,
    decisionId: 0, // 初始化为空值
    economyId: 0, // 初始化为空值
    stateId: 0, // 初始化为空值
    reliabilityId: 0, // 初始化为空值
  });
  const sortBy = ref('evaluateTime'); // 默认排序字段
  const sortOrder = ref('desc'); // 默认降序排序
  const isLoadOut = ref(false);
  const pagination = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['5', '10', '20', '30', '40'],
    showTotal: (total, range) => `显示 ${range[0]}-${range[1]} 共 ${total} 条`,
  });

  const tableConfig: Props = {
    title: '历史数据列表',
    api: (query) => getHistoryList({ ...query, sortBy: sortBy.value, sortOrder: sortOrder.value }),
    beforeFetch: (data) => {
      console.log('param', data);
    },
    afterFetch: (data) => {
      console.log('历史数据', data);
      pagination.total = data.rowCount;
      pagination.current = data.page;
      pagination.pageSize = data.pageSize;
      return data;
    },
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    fetchSetting: {
      pageField: 'page',
      sizeField: 'pageSize',
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    pagination,
    canResize: props.reSize,
    handleSearchInfoFn(info) {
      console.log('handleSearchInfoFn', info);
      return info;
    },
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: props.chooseMode ? 'left' : 'right',
      ellipsis: true,
    },
  };

  props.maxHeight == -1 || (tableConfig['maxHeight'] = props.maxHeight);
  const [registerTable, { reload, setProps }] = useTable(tableConfig);

  function toggleSortOrder() {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    reload();
  }

  async function handleExport(record) {
    downloadJsonRecord(record.testId);
  }
  async function handleExportSelected() {
    if (loadText.value === '导出数据') {
      loadText.value = '确认导出';
      isLoadOut.value = true;
    } else {
      const testList = [];
      for (const record of selectedRows.value) {
        testList.push(record.testId);
      }
      await downloadJsonRecord(testList);
    }
  }

  async function handleView(record) {
    warning('正在进行页面跳转...');
    const params = {
      device: {},
      src: logo,
      hasAnalysis: true,
      results: {},
      formData: {},
      showHistory: true,
      testId: record.testId,
    };
    params['device'] = await viewDevice({ id: record.equipId });
    if (record['decisionId'] !== -1) {
      // 跳转到运维评估页面
      params['formData'] = await getDevopsRecordInput({ evaluateId: record['decisionId'] });
      params['results'] = await getDevopsRecordOutput({ evaluateId: record['decisionId'] });
      routeParam.setParams(params);
      go(PageEnum.Devops_Evaluate_Page);
    } else if (record['stateId'] !== -1) {
      // 跳转到状态评估页面
      params['formData'] = await getStateRecordInput({ evaluateId: record['stateId'] });
      params['results'] = await getStateRecordOutput({ evaluateId: record['stateId'] });
      routeParam.setParams(params);
      go(PageEnum.State_Evaluate_Page);
    } else if (record['reliabilityId'] !== -1) {
      // 跳转到可靠性评估页面
      params['formData'] = await getReliableRecordInput({ evaluateId: record['reliabilityId'] });
      params['results'] = await getReliableRecordOutput({ evaluateId: record['reliabilityId'] });
      routeParam.setParams(params);
      go(PageEnum.Reliability_Evaluate_Page);
    } else if (record['economyId'] !== -1) {
      // 跳转到经济性评估页面
      params['formData'] = await getEconomyRecordInput({ evaluateId: record['economyId'] });
      params['results'] = await getEconomyRecordOutput({ evaluateId: record['economyId'] });
      routeParam.setParams(params);
      go(PageEnum.Economy_Evaluate_Page);
    }
  }

  //handleSelect函数切换行的选定状态并记录选定的行。
  function handleSelect(record) {
    if (selectedRows.value.has(record)) {
      selectedRows.value.delete(record);
    } else {
      selectedRows.value.add(record);
    }
    emit('select', selectedRows.value);
  }

  function isSelected(record) {
    return selectedRows.value.has(record);
  }
  function getActions(record) {
    const actions = [
      {
        icon: 'clarity:backup-line',
        divider: true,
        ifShow: !props.chooseMode && !isLoadOut.value,
        onClick: handleExport.bind(null, record),
      },
      {
        icon: 'ant-design:search-outlined',
        divider: true,
        ifShow: !props.chooseMode && !isLoadOut.value,
        onClick: handleView.bind(null, record),
      },
      {
        icon: 'clarity:check-circle-solid',
        label: '选中',
        color: isSelected(record) ? 'success' : 'default',
        divider: true,
        ifShow: props.chooseMode || isLoadOut.value,
        onClick: handleSelect.bind(null, record),
      },
    ];
    return actions;
  }

  watch(
    () => props.maxHeight,
    (newValue) => {
      if (newValue !== -1) {
        setProps({ maxHeight: newValue });
      }
    },
  );
  watch(
    () => props.reSize,
    (newValue) => {
      if (newValue) {
        setProps({ canResize: newValue });
      }
    },
  );
  watch(
    () => props.conditions,
    (newValue) => {
      // 按照条件搜索展示表格
      if (newValue) {
        searchModel.equipId = newValue.equipId;
        // 设置筛选条件
        if (newValue.type === 'state') {
          searchModel.stateId = -2;
        } else if (newValue.type === 'devops') {
          searchModel.decisionId = -2;
        } else if (newValue.type === 'reliability') {
          searchModel.reliabilityId = -2;
        } else if (newValue.type === 'economy') {
          searchModel.economyId = -2;
        } else if (newValue.type === 'all') {
          searchModel.decisionId = -1;
          searchModel.reliabilityId = 0;
          searchModel.economyId = 0;
          searchModel.stateId = 0;
        }
        reload();
      }
    },
  );
  function quitLoadout() {
    loadText.value = '导出数据';
    isLoadOut.value = false;
    selectedRows.value.clear();
  }
  async function handleWatch(record, type) {
    warning('正在进行页面跳转...');
    const params = {
      device: {},
      src: logo,
      hasAnalysis: true,
      results: {},
      formData: {},
      showHistory: true,
      testId: record.testId,
    };
    params['device'] = await viewDevice({ id: record.equipId });

    if (type === 'state' && record['stateId'] !== -1) {
      // 跳转到状态评估页面
      params['formData'] = await getStateRecordInput({ evaluateId: record['stateId'] });
      params['results'] = await getStateRecordOutput({ evaluateId: record['stateId'] });
      routeParam.setParams(params);
      go(PageEnum.State_Evaluate_Page);
    } else if (type === 'reliability' && record['reliabilityId'] !== -1) {
      // 跳转到可靠性评估页面
      params['formData'] = await getReliableRecordInput({ evaluateId: record['reliabilityId'] });
      params['results'] = await getReliableRecordOutput({ evaluateId: record['reliabilityId'] });
      routeParam.setParams(params);
      go(PageEnum.Reliability_Evaluate_Page);
    } else if (type === 'economy' && record['economyId'] !== -1) {
      // 跳转到经济性评估页面
      params['formData'] = await getEconomyRecordInput({ evaluateId: record['economyId'] });
      params['results'] = await getEconomyRecordOutput({ evaluateId: record['economyId'] });
      routeParam.setParams(params);
      go(PageEnum.Economy_Evaluate_Page);
    }
  }
</script>

<script lang="ts">
  export default {
    name: 'HistoryManagement',
  };
</script>
