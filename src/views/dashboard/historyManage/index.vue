<template>
  <Card>
    <BasicTable @register="registerTable" :searchModel="searchModel">
      <template #toolbar>
        <!-- 右上角的按钮 -->
        <!-- 搜索表单 -->
        <a-button type="primary" @click="handleCreate"> 写入历史数据 </a-button>
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
  import { getHistoryList } from '/@/api/sys/history';
  import { columns, searchFormSchema } from './history.data';
  import { useModal } from '/@/components/Modal';
  import HistoryModal from './HistoryModal.vue';
  import { Card } from 'ant-design-vue';
  import { Props } from '/@/components/Table/src/hooks/useTable';
  //import { BasicForm } from '/@/components/Form';

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
  const sortBy = ref(''); // 默认排序字段
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
    api: (query) => getHistoryList({ ...query, sortBy: sortBy.value, sortOrder: sortOrder.value }), // 使用箭头函数s包装原 API 调用 (query) => getHistoryList({ ...query, sortBy: sortBy.value, sortOrder: sortOrder.value })
    afterFetch: (data) => {
      // data 是从 API 获得的数据，params 是请求参数
      console.log('data', data.data);
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
    reload(); // 重新加载数据，应用新的排序
  }

  function handleCreate() {
    openModal(true, { isUpdate: false });
  }

  function handleEdit(record) {
    openModal(true, { record, isUpdate: true });
  }

  function handleDelete(record) {
    console.log('Delete', record);
  }

  function handleSuccess() {
    reload(); // 成功后重新加载数据
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
