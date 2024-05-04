<template>
  <Card>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!-- 右上角的按钮 -->
        <!-- 搜索表单 -->
        <BasicForm :schemas="searchFormSchema" :model="searchModel" @submit="handleSearch" />
        <a-button type="primary" @click="handleCreate"> 新增设备 </a-button>
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
    <DeviceModal @register="registerModal" @success="handleSuccess" />
  </Card>
</template>
<script lang="ts" setup>
  import { defineProps, reactive, ref, watch } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDeviceList, searchDevice, viewDevice } from '/@/api/sys/device';
  import { columns, searchFormSchema,viewFormSchema } from './device.data';
  import { useModal } from '/@/components/Modal';
  import DeviceModal from './DeviceModal.vue';
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
    type: '',
    location: '',
    page: 1,
    pageSize: 10,
  });
  const sortBy = ref('defaultField'); // 默认排序字段
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
    title: '设备列表',
    beforeFetch: (data) => {
      return data.data;
    },
    api: (query) => getDeviceList({ ...query, sortBy: sortBy.value, sortOrder: sortOrder.value }), // 使用箭头函数包装原 API 调用
    afterFetch: (data) => {
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

  function handleSearch() {
    searchDevice(searchModel)
      .then((result) => {
        // 更新表格数据逻辑，需要根据您的组件具体实现来定
        pagination.total = result.rowCount; // 使用返回的总数据数量更新分页的总数
        setTableData(result.items); // 使用 setData 来更新表格数据
        reload();
      })
      .catch((error) => {
        console.error('Error searching users:', error);
      });
  }

  function handleSuccess() {
    reload(); // 成功后重新加载数据
  }
</script>
<script lang="ts">
  export default {
    name: 'DeviceManagement',
  };
</script>
