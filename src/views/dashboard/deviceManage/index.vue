<template>
  <Card>
    <BasicTable :searchModel="searchModel" @register="registerTable" @rowClick="itemonclick">
      <template #toolbar>
        <!-- 右上角的按钮 -->
        <!-- 搜索表单 -->
        <!--BasicForm :schemas="searchFormSchema" :model="searchModel" @submit="handleSearch" /-->
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
              popConfirm: {
                title: '是否确认删除',
                color: 'error',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
              },
            },
            {
              icon: 'ant-design:search-outlined',
              color: 'success',
              onClick: handleView.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <DeviceModal @register="registerModal" @success="handleSuccess" />
    <!--PasswordModal :isVisible="isPwdModalVisible" @confirm="confirmDelete" @cancel="cancelDelete" /-->
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
  //const [registerPwdModal, { openModal: openPwdModal }] = useModal();
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
    sortBy: '',
    sortOrder: '',
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
    title: '设备列表',

    api: (query) => getDeviceList({ ...query, sortBy: sortBy.value, sortOrder: sortOrder.value }), // 使用箭头函数包装原 API 调用
    afterFetch: (data) => {
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
  function handleView(record) {
    // Assuming `viewDevice` is a function that fetches device details from the API
    openModal(true, { record, isView: true }); // Ensure the modal knows it's in view mode
  }
 /*const currentRecord = ref<Recordable<any> | null>();
  const isPwdModalVisible = ref(false);
  function cancelDelete() {
    isPwdModalVisible.value = false;
    currentRecord.value = null;
  }
  function handleDelete(record) {
    currentRecord.value = record; // 保存当前要删除的记录，便于后续使用
    isPwdModalVisible.value = true; // 打开密码输入模态框
  }

  async function confirmDelete(adminPwd: string) {
    if (currentRecord.value) {
      const params: DevicedeleteParams = {
        fixedPwd: adminPwd,
        equipId: currentRecord.value.equipId,
      };
      try {
        await deleteDevice(params);
        console.log('设备删除成功');
        reload();
      } catch (error) {
        console.error('删除失败', error);
      } finally {
        isPwdModalVisible.value = false;
        currentRecord.value = null;
      }
    }
  }*/
  function handleDelete(record) {
    console.log('handleDelete', record);
    const params: DevicedeleteParams = {
      fixedPwd: '123456',
      equipId: record.equipId,
    };
    deleteDevice(params).then((res) => {
      console.log('res', res);
      reload();
    });
  }

  function itemonclick(record) {
    emit('chooseDevice', record);
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
