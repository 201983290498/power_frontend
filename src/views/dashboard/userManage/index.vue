<template>
  <Card
    style="
      border: 1px solid #ccc;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
      border-radius: 8px;
      padding: 10px;
    "
  >
    <div class="custom-table-title" style="position: absolute; top: 120px; left: 50px">
      用户列表
    </div>
    <BasicTable :searchInfo="searchModel" @register="registerTable" :scroll="{ x: 1800, y: 3000 }">
      <template #toolbar>
        <a-button type="primary" class="button-link" @click="handleCreate">新增用户</a-button>
        <a-button @click="toggleSortOrder" class="button-link">切换排序</a-button>
        <!-- 右上角的按钮 -->
        <!-- 搜索表单 -->
        <!-- BasicForm :schemas="searchFormSchema" :model="searchModel" @submit="handleSearch" /-->
        <!-- <a-button v-if="record.role === 'ADMIN'" type="primary" @click="handleCreate">新增用户</a-button> -->
      </template>
      <template #action="{ record }">
        <TableAction :actions="getActions(record)" />
      </template>
    </BasicTable>
    <UserModal @register="registerModal" @success="handleSuccess" />
  </Card>
</template>
<script lang="ts" setup>
  import { defineProps, reactive, ref, watch } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getUserList, deleteUser } from '/@/api/sys/Euser';
  import { UserdeleteParams } from '/@/api/sys/model/userModel';
  import { columns, searchFormSchema } from './user.data';
  import { useModal } from '/@/components/Modal';
  import UserModal from './UserModel.vue';
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
    userName: '',
    organization: '',
    personCharge: '',
    sortBy: 'user_id',
    sortOrder: 'asc',
    page: 1,
    pageSize: 1000,
    role: '',
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
    //title: '用户列表',
    api: (query) => getUserList({ ...query, sortBy: 'user_id', sortOrder: sortOrder.value }),
    //api: (query) => getUserList({ ...query, ...searchModel }),
    //beforeFetch: (params) => console.log('请求参数', params),
    afterFetch: (data) => {
      pagination.total = data.rowCount;
      pagination.current = data.pageCount;
      return data;
    },
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      baseRowStyle: {
        height: '80px',
      },
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
      width: 60, // 调整宽度确保内容对齐
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      ellipsis: true,
      fixed: 'right',
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
            textAlign: 'left', // 确保内容居中
          },
        };
      },
    },
    handleSearchInfoFn(info) {
      return info;
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
    const params: UserdeleteParams = {
      adminPwd: '123456', // Assuming this is hardcoded, you might want to get it from a modal or form.
      adminName: 'zhanghua',
      userId: record.userId,
    };
    deleteUser(params).then(() => {
      reload();
    });
  }
  function handleView(record) {
    // Assuming `viewDevice` is a function that fetches device details from the API
    openModal(true, { record, isView: true }); // Ensure the modal knows it's in view mode
  }
  function handleSuccess() {
    reload(); // 成功后重新加载数据
  }
  function getActions(record) {
    const actions = [
      {
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, record),
        label: '编辑',
        auth: 'ADMIN',
      },
      {
        icon: 'ant-design:search-outlined',
        color: 'success',
        label: '查看',
        onClick: handleView.bind(null, record),
      },
    ];

    // 检查用户角色是否为 "ADMIN"，如果是则显示删除按钮
    if (record.role !== 'ADMIN') {
      actions.push({
        icon: 'ant-design:delete-outlined',
        label: '删除',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          placement: 'left',
          confirm: handleDelete.bind(null, record),
        },
        auth: 'ADMIN',
      });
    }
    return actions;
  }
</script>
<script lang="ts">
  export default {
    name: 'UserManagement',
  };
</script>
<style scoped>
  .state-id-link {
    color: #007bff; /* Blue color */
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
  }
  .button-link {
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
  }
  .state-id-link:hover {
    text-decoration: underline;
  }
  .custom-table-title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 16px;
  }
  .select_two {
    padding: 0 0 !important;
    background: orange !important;
    color: #fff !important;
  }
  .form-container {
    margin-bottom: 20px; /* 调整搜索表单的位置 */
  }
  .custom-label {
    font-weight: bold !important;
  }
</style>
