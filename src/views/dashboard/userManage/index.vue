<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增用户</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            { icon: 'clarity:note-edit-line', onClick: () => handleEdit(record) },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除?',
                placement: 'left',
                confirm: () => handleDelete(record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <UserModel @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getUserList, addUser, updateUser, deleteUser } from '/@/api/sys/Euser';
  import { PaginationProps } from '/@/components/Table/src/types/pagination';
  import { columns, searchFormSchema } from './user.data';
  import { useModal } from '/@/components/Modal';
  import UserModel from './UserModel.vue';
  import { Props } from '/@/components/Table/src/hooks/useTable';
  import { watch, ref, Ref } from 'vue';

  defineOptions({ name: 'userManagement' });
  const currentRecord: Ref<data.total | null> = ref(null);
  const props = defineProps({
    reSize: { type: Boolean, default: true },
    maxHeight: { type: Number, default: -1 },
  });

  watch(
    () => props.maxHeight,
    (newValue) => {
      setProps({ maxHeight: newValue });
    },
  );
  watch(
    () => props.reSize,
    (newValue) => {
      setProps({ canResize: newValue });
    },
  );

  const [registerModal, { openModal }] = useModal();

  let pagination: PaginationProps = {
    total: 0,
    defaultCurrent: 1,
    defaultPageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['5', '10', '20', '30', '40'],
    showTotal: (total) => `共 ${total} 条数据`,
  };

  const tableConfig: Props = {
    title: '用户列表',
    api: getUserList,
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
  props.maxHeight == -1 || setProps({ maxHeight: props.maxHeight });
  const [registerTable, { reload, setProps }] = useTable(tableConfig);

  function handleCreate(record) {
    currentRecord.value = record;
    openModal(true, { isUpdate: false });
  }

  function handleEdit(record) {
    currentRecord.value = record;
    openModal(true, { record, isUpdate: true });
  }

  async function handleDelete(record) {
    try {
      await deleteUser(record.id);
      reload();
    } catch (error) {
      console.error('Failed to delete user:', error);
      // Optionally, inform the user of the failure via a UI notification
    }
  }
  function handleSuccess(action: string) {
    if (action === 'create' && currentRecord.value) {
      // Assuming createUser is an async function that requires a User object
      addUser(currentRecord.value);
    } else if (action === 'update' && currentRecord.value) {
      // Ensure that updateUser is called only when currentRecord.value is not null
      updateUser(currentRecord.value.userID, currentRecord.value);
    }
    reload();
    getUserList();
  }
  /*async function handleSuccess(action) {
    if (action === 'create') {
      await addUser(currentRecord.value);
    } else if (action === 'update') {
      // Ensure currentRecord.value has the user ID and other necessary fields
      await updateUser(currentRecord.value.id, currentRecord.value);
    }
    reload(); // Reload table data on successful operation
  }*/
</script>