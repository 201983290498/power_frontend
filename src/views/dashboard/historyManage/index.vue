<template>
  <Card>
    <BasicTable :searchInfo="searchModel" @register="registerTable" :scroll="{ x: 2000, y: 3000 }">
      <template #toolbar>
        <a-button @click="toggleSortOrder">切换排序</a-button>
        <a-button @click="handleExportSelected" type="primary">{{ loadText }}</a-button>
        <a-button v-if="isLoadOut" type="primary" @click="quitLoadout">取消导出</a-button>
        <a-button v-if="isLoadOut" type="primary" @click="toggleSelectAll">{{
          selectAllText
        }}</a-button>
      </template>
      <template #stateId="{ record }">
        <template v-if="record.stateId !== -1">
          <a-button @click="handleWatch(record, type1)" title="查看测评记录">{{
            record.stateId
          }}</a-button>
        </template>
        <template v-else> —— </template>
      </template>
      <template #reliabilityId="{ record }">
        <template v-if="record.reliabilityId !== -1">
          <a-button @click="handleWatch(record, type2)" title="查看测评记录">{{
            record.reliabilityId
          }}</a-button>
        </template>
        <template v-else> —— </template>
      </template>
      <template #economyId="{ record }">
        <template v-if="record.economyId !== -1">
          <a-button @click="handleWatch(record, type3)" title="查看测评记录">{{
            record.economyId
          }}</a-button>
        </template>
        <template v-else> —— </template>
      </template>
      <template #decisionId="{ record }">
        <template v-if="record.decisionId !== -1">
          <a-button @click="handleWatch(record, type4)" title="查看测评记录">{{
            record.decisionId
          }}</a-button>
        </template>
        <template v-else> —— </template>
      </template>
      <template #lastResult="{ record }">
        <template
          v-if="record.lastResult === 0 || record.lastResult === '' || record.lastResult === null"
        >
          ——</template
        >
        <template v-else>
          <div class="select_one">
            {{ record.lastResult }}
          </div>
        </template>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getActions(record)" />
      </template>
    </BasicTable>
  </Card>
</template>

<script lang="ts" setup>
  import { defineProps, onBeforeMount, onMounted, onUpdated, reactive, ref, watch } from 'vue';
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
  const selectAllText = ref('全选'); //
  const selectedRowKeys = ref(new Set());
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
  const type4 = 'decision';
  const searchModel = reactive({
    equipNo: '',
    personCharge: '',
    equipId: 0, // 初始化为number类型
    sortBy: 'evaluateTime', // 默认排序字段
    sortOrder: 'desc', // 默认降序
    page: 1,
    pageSize: 20,
    decisionId: 0, // 初始化为空值
    economyId: 0, // 初始化为空值
    stateId: 0, // 初始化为空值
    reliabilityId: 0, // 初始化为空值
  });
  if (routeParam.getParams?.equipId !== null) {
    searchModel.equipId = routeParam.getParams?.equipId;
    setSearchForm(routeParam.getParams?.type);
  }
  console.log('param', searchModel, routeParam.getParams);
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
    api: (query) => getHistoryList({ ...query, ...searchModel }),
    afterFetch: (data) => {
      pagination.total = data.rowCount;
      pagination.current = data.pageCount;
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
    clearSelectOnPageChange: false,
    showIndexColumn: false,
    pagination,
    inset: true,
    canResize: props.reSize,
    handleSearchInfoFn(info) {
      searchModel.equipId = '';
      // 设置筛选条件
      setSearchForm(info.type);
      return info;
    },
    actionColumn: {
      width: 40,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: props.chooseMode ? 'left' : 'right',
      ellipsis: true,
    },
  };
  // 监听分页变化

  props.maxHeight == -1 || (tableConfig['maxHeight'] = props.maxHeight);
  const [registerTable, { reload, setProps, getDataSource }] = useTable(tableConfig);
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
      isLoadOut.value = false;
      loadText.value = '导出数据';
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
      selectedRowKeys.value.delete(record.testId);
    } else {
      selectedRows.value.add(record);
      selectedRowKeys.value.add(record.testId);
    }
    emit('select', selectedRows.value);
  }
  function isSelected(record) {
    return selectedRowKeys.value.has(record.testId);
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
        setSearchForm(newValue.type);
        reload();
      }
    },
  );
  function quitLoadout() {
    loadText.value = '导出数据';
    isLoadOut.value = false;
    selectedRows.value.clear();
    selectedRowKeys.value.clear();
    selectAllText.value = '全选';
  }

  function toggleSelectAll() {
    const tableData = getDataSource();
    if (!tableData || tableData.length === 0) return;

    if (selectAllText.value === '全选') {
      // 全选所有行
      tableData.forEach((record) => {
        selectedRows.value.add(record);
        selectedRowKeys.value.add(record.testId);
      });
      selectAllText.value = '取消全选';
    } else {
      // 取消全选
      selectedRows.value.clear();
      selectedRowKeys.value.clear();
      selectAllText.value = '全选';
    }
    emit('select', selectedRows.value);
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
    } else if (type === 'decision' && record['decisionId'] !== -1) {
      // 跳转到运维评估页面
      params['formData'] = await getDevopsRecordInput({ evaluateId: record['decisionId'] });
      params['results'] = await getDevopsRecordOutput({ evaluateId: record['decisionId'] });
      routeParam.setParams(params);
      go(PageEnum.Devops_Evaluate_Page);
    }
  }
  function setSearchForm(type: String) {
    if (type === 'state') {
      searchModel.stateId = -2;
    } else if (type === 'devops') {
      searchModel.decisionId = -2;
    } else if (type === 'reliability') {
      searchModel.reliabilityId = -2;
    } else if (type === 'economy') {
      searchModel.economyId = -2;
    } else if (type === 'all') {
      searchModel.decisionId = -1;
      searchModel.reliabilityId = 0;
      searchModel.economyId = 0;
      searchModel.stateId = 0;
    }
  }
  onMounted(() => {
    setTimeout(() => {
      Array.prototype.forEach.call(document.getElementsByClassName('select_one'), (element) => {
        if (parseFloat(element.textContent) < 75) {
          console.log(element.textContent);
          element.parentNode.classList.add('select_two');
        }
      });
    }, 100);
  });
</script>
<script lang="ts">
  export default {
    name: 'HistoryManagement',
  };
</script>

<style>
  .select_two {
    padding: 0 0 !important;
    background: orange !important;
    color: #fff !important;
  }
</style>
