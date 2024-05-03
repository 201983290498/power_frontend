<template>
  <Card>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!-- 右上角的按钮 -->
        <a-button type="primary" @click="handleCreate"> 新增设备 </a-button>
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
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDeviceList } from '/@/api/sys/device';
  import { PaginationProps } from '/@/components/Table/src/types/pagination';

  import { columns, searchFormSchema } from './device.data';
  import { useModal } from '/@/components/Modal';
  import DeviceModal from './DeviceModal.vue'; // 不是问题
  import { watch } from 'vue';
  import { Props } from '/@/components/Table/src/hooks/useTable';
  import { Card } from 'ant-design-vue';

  defineOptions({ name: 'DeviceManagement' }); // 定义组件的名称

  const props = defineProps({
    // 这里定义的props，在父组件中使用时, 父亲组件向子组件传递值，需要加上v-model
    // 例如：<DeviceManagement v-model:visible="visible" />
    reSize: {
      type: Boolean,
      default: true,
    },
    maxHeight: {
      type: Number,
      default: -1,
    },
  });

  // 监控父组件值的变化
  watch(
    () => props.maxHeight,
    (newValue) => {
      if (newValue !== -1) {
        setProps({
          maxHeight: newValue,
        });
      }
    },
  );
  watch(
    () => props.reSize,
    (newValue) => {
      setProps({
        canResize: newValue,
      });
    },
  );

  const [registerModal, { openModal }] = useModal();

  let pagination: PaginationProps = {
    total: 10,
    defaultCurrent: 1,
    defaultPageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['5', '10', '20', '30', '40'],
    showTotal: (total) => `共 ${total} 条数据`,
  };
  const tableConfig: Props = {
    title: '设备列表',
    api: getDeviceList,
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
  props.maxHeight === -1 || (tableConfig['maxHeight'] = props.maxHeight);
  const [registerTable, { reload, setProps }] = useTable(tableConfig);

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

<script lang="ts">
  export default {
    name: 'DeviceManagement',
  };
</script>
