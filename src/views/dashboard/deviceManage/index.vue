<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!-- 右上角的按钮 -->
        <a-button type="primary" @click="handleCreate"> 新增设备 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
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
      </template>
    </BasicTable>
    <DeviceModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDeviceList } from '/@/api/sys/device';
  import { columns, searchFormSchema } from './device.data';
  import { useModal } from '/@/components/Modal';
  import DeviceModal from './DeviceModal.vue';

  defineOptions({ name: 'DeviceManagement' });

  const [registerModal, { openModal }] = useModal();
  let tem = await getDeviceList();

  const [registerTable, { reload }] = useTable({
    title: '设备列表',
    api: getDeviceList,
    afterFetch: () => {
      return tem;
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
      // slots: { customRender: 'action' },
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
