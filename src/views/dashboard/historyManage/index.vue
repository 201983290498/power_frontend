<template>
  <Card>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!-- 右上角的按钮 -->
        <!-- 搜索表单 -->
        <BasicForm :schemas="searchFormSchema" :model="searchModel" @submit="handleSearch" />
        <a-button type="primary" @click="handleCreate"> 新增历史数据 </a-button>
        <a-button @click="toggleSortOrder">切换排序</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
              },
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
  import { getHistoryList, searchHistory } from '/@/api/sys/history';
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
  });

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

  const searchModel = reactive({
    equipId: '',
    testId: '',
    sortBy: '',
    sortOrder: '',
    page: 1,
    pageSize: 10,
  });
  const sortOrder = ref('asc'); // 排序方向

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
    api: async (params) => {
      try {
        const response = await getHistoryList(params);
        // 确保这里返回的是一个对象，其中包含 items 数组和可能的其他元数据
        return { data: response.items, total: response.rowCount };
      } catch (error) {
        console.error('Failed to fetch history data:', error);
        return { data: [], total: 0 };
      }
    }, // 使用箭头函数s包装原 API 调用 (query) => getHistoryList({ ...query, sortBy: sortBy.value, sortOrder: sortOrder.value })
    afterFetch: (data) => {
      // data 是从 API 获得的数据，params 是请求参数
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
    handleSearch(); // 更新数据而不是调用 reload
  }

  function handleCreate() {
    openModal(true, { isUpdate: true });
  }

  function handleEdit(record) {
    openModal(true, { record, isUpdate: false });
  }

  function handleDelete(record) {
    console.log('Delete', record);
  }

  function handleSearch() {
    searchHistory(searchModel)
      .then((result) => {
        // 更新表格数据逻辑，需要根据您的组件具体实现来定
        pagination.total = result.rowCount; // 更新分页的总数
        setTableData(result.items); // 更新表格数据
        reload();
      })
      .catch((error) => {
        console.error('Error searching historydata:', error);
      });
  }

  function handleSuccess() {
    reload(); // 成功后重新加载数据
  }
  function setTableData(data) {
    // 这里应该是更新表格数据的逻辑，具体取决于您的表格组件是如何接收数据的
    // 例如，如果 useTable 返回了一个方法来更新数据，您可能需要调用这个方法
    setProps({ dataSource: data });
  }
  /*function setTableData(data) {
    tableData.value = data; // 直接更新响应式引用的值
  }*/
</script>
<script lang="ts">
  export default {
    name: 'HistoryManagement',
  };
</script>
