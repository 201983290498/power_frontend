<template>
  <Card
    style="
      border: 1px solid #ccc;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
      border-radius: 8px;
      padding: 10px;
    "
  >
    <div class="custom-table-title" style="position: absolute; top: 133px; left: 50px">
      设备列表
    </div>
    <BasicTable
      :searchInfo="searchModel"
      :columns="columns"
      :rowClassName="getRowClassName"
      @register="registerTable"
      @rowClick="itemonclick"
      :scroll="{ x: 2000, y: 3000 }"
    >
      <template #toolbar>
        <a-button type="primary" class="button-link" @click="handleCreate">新增设备</a-button>
        <a-button @click="toggleSortOrder" class="button-link">切换排序</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              label: '编辑',
              onClick: handleEdit.bind(null, record),
              auth: 'ADMIN',
            },
            {
              icon: 'ant-design:search-outlined',
              color: 'success',
              label: '查看',
              onClick: handleView.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
              },
              auth: 'ADMIN',
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
  import { getDeviceList, deleteDevice } from '/@/api/sys/device';
  import { columns, searchFormSchema } from './device.data';
  import { useModal } from '/@/components/Modal';
  import DeviceModal from './DeviceModal.vue';
  import { Card } from 'ant-design-vue';
  import { Props } from '/@/components/Table/src/hooks/useTable';
  import { DevicedeleteParams } from '/@/api/sys/model/deviceModel';

  const emit = defineEmits(['chooseDevice']);
  const props = defineProps({
    reSize: {
      type: Boolean,
      default: true,
    },
    maxHeight: {
      type: Number,
      default: -1,
    },
    showAction: {
      type: Boolean,
      default: true,
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
    equipNo: '',
    type: '',
    location: '',
    status: '', // 初始化为 undefined，可以在后面设置为 1 或 0
    page: 1,
    pageSize: 1000,
    sortBy: '',
    operationTime: '',
    sortOrder: '',
    equipName: '',
    substationName: '',
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
  });
  const tableConfig: Props = {
    //title: '设备列表',
    api: (query) => getDeviceList({ ...query, sortBy: sortBy.value, sortOrder: sortOrder.value }),
    afterFetch: (data) => {
      pagination.total = data.rowCount;
      pagination.current = data.pageCount;
      pagination.pageSize = data.pageSize;
      return data.data;
    },
    columns,
    formConfig: {
      labelWidth: 160,
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
      return info;
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      ellipsis: true,
      slots: { customRender: 'action' },
      fixed: 'right',
      ifShow: () => props.showAction,
      customHeaderCell: () => {
        return {
          style: {
            fontWeight: 'bold',
            textAlign: 'center', // 确保表头居中
          },
        };
      },
      customCell: () => {
        return {
          style: {
            textAlign: 'center', // 确保内容居中
          },
        };
      },
    },
  };
  props.maxHeight == -1 || (tableConfig['maxHeight'] = props.maxHeight);
  const [registerTable, { reload, setProps }] = useTable(tableConfig);
  function toggleSortOrder() {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    reload();
  }

  function handleCreate() {
    openModal(true, { isUpdate: false });
  }

  function handleEdit(record) {
    openModal(true, { record, isUpdate: true });
  }

  function handleView(record) {
    openModal(true, { record, isView: true });
  }

  function handleDelete(record) {
    const params: DevicedeleteParams = {
      fixedPwd: '123456', // Assuming this is hardcoded, you might want to get it from a modal or form.
      equipId: record.equipId,
    };
    deleteDevice(params).then(() => {
      reload();
    });
  }
  const selectedRowKeys = ref(new Set());
  function itemonclick(record) {
    if (selectedRowKeys.value.has(record.equipId)) {
      selectedRowKeys.value.delete(record.equipId);
    } else {
      selectedRowKeys.value.clear();
      selectedRowKeys.value.add(record.equipId);
    }
    emit('chooseDevice', record);
  }

  function getRowClassName(record) {
    return selectedRowKeys.value.has(record.equipId) ? 'highlight-row' : '';
  }
  function handleSuccess() {
    reload();
  }
</script>

<script lang="ts">
  export default {
    name: 'DeviceManagement',
  };
</script>
<style scoped>
  .custom-table-title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 16px;
  }
  .button-link {
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
  }
  .highlight-row {
    background-color: #f5f5f5;
  }
</style>
