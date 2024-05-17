<template>
  <Card>
    <BasicTable @register="registerTable" :searchModel="searchModel" :scroll="{ x: 1600, y: 3000 }">
      <template #toolbar>
        <!--a-button type="primary" @click="handleCreate"> 写入历史数据 </a-button-->
        <a-button @click="toggleSortOrder">切换排序</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:backup-line',
              label: '导出',
              divider: true,
              ifShow: !props.chooseMode,
              onClick: handleExport.bind(null, record),
            },
            {
              icon: 'clarity:check-circle-solid',
              label: '选中',
              color: isSelected(record) ? 'success' : 'default',
              divider: true,
              ifShow: props.chooseMode,
              onClick: handleSelect.bind(null, record),
            },
            {
              icon: 'ant-design:search-outlined',
              label: '查看',
              divider: true,
              ifShow: !props.chooseMode,
              onClick: handleView.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <HistoryModal @register="registerModal" @success="handleSuccess" />
  </Card>
</template>

<script lang="ts" setup>
  import { defineProps, reactive, ref, watch } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getHistoryList, exportHistory } from '/@/api/sys/history';
  import { columns, searchFormSchema } from './history.data';
  import { useModal } from '/@/components/Modal';
  import HistoryModal from './HistoryModal.vue';
  import { Card } from 'ant-design-vue';
  import { Props } from '/@/components/Table/src/hooks/useTable';

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
  });

  //保存一组被选中的记录
  const selectedRows = ref(new Set());

  const searchModel = reactive({
    equipId: '',
    testId: '',
    sortBy: '',
    sortOrder: '',
    page: 1,
    pageSize: 10,
  });
  const sortBy = ref('');
  const sortOrder = ref('asc');
  const [registerModal, { openModal }] = useModal();
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
    afterFetch: (data) => {
      pagination.total = data.rowCount;
      pagination.current = data.page;
      pagination.pageSize = data.pageSize;
      return data.data;
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
    handleSearchInfoFn(info) {
      console.log('handleSearchInfoFn', info);
      return info;
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    pagination,
    canResize: props.reSize,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  };

  props.maxHeight == -1 || (tableConfig['maxHeight'] = props.maxHeight);
  const [registerTable, { reload, setProps }] = useTable(tableConfig);

  function toggleSortOrder() {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    reload();
  }

  function handleCreate() {
    openModal(true);
  }

  async function handleExport(record) {
    try {
      const params = {
        testId: record.testId,
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

        console.log('Exporting record:', record);
      } else {
        console.error('Failed to export data:');
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  }

  function handleView(record){
    // TODO
  }

  //handleSelect函数切换行的选定状态并记录选定的行。
  function handleSelect(record) {
    if (selectedRows.value.has(record)) {
      selectedRows.value.delete(record);
    } else {
      selectedRows.value.add(record);
    }
    console.log('Selected rows:', selectedRows.value);
  }

  function isSelected(record) {
    return selectedRows.value.has(record);
  }

  function handleSuccess() {
    reload();
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
</script>

<script lang="ts">
  export default {
    name: 'HistoryManagement',
  };
</script>
