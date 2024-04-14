<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!-- 右上角的按钮 -->
        <a-button type="primary" @click="handleCreate"> 新增用户 </a-button>
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
    <UserModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getUserList } from '/@/api/sys/Euser';
  import { columns, searchFormSchema } from './user.data';
  import { useModal } from '/@/components/Modal';
  import UserModal from './UserModel.vue'; // 不是问题

  defineOptions({ name: 'UserManagement' });
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '用户列表',
    api: getUserList,
    afterFetch: (data) => {
      console.log(data);
      return data.data;
    },
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    // 打开modal框
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    console.log(record);
  }

  function handleSuccess() {
    // 成功之后的处理
    reload();
  }
</script>
