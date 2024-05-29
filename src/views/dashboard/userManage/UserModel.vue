<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <template v-if="!isView">
      <BasicForm :model="formData" :schemas="formSchema" @register="registerForm" />
    </template>
    <template v-else>
      <BasicForm :model="formData" :schemas="Viewform" />
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema, Viewform } from './user.data';
  import { addUser, updateUser } from '/@/api/sys/Euser';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const isView = ref(false);
  const formData = ref({}); // Shared data object
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    isUpdate.value = !!data?.isUpdate;
    isView.value = !!data?.isView;

    // 根据模式初始化表单数据
    if (data) {
      formData.value = { ...data.record };
      if (isUpdate.value) {
        setFieldsValue({ ...data.record });
      }
    }
  });

  const getTitle = computed(() => {
    return unref(isView) ? '查看用户' : isUpdate.value ? '编辑用户' : '新增用户';
  });
  async function handleSubmit() {
    if (isView.value) {
      closeModal();
      return;
    }
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      const data = {
        userId: values.userId, // 确保 userId 被正确设置
        userName: values.userName,
        password: values.password,
        organization: values.organization,
        personCharge: values.personCharge,
        level: values.level,
        lastLogin: values.lastLogin, // 如果有上次登录字段
        role: values.role,
      };

      const params = {
        adminName: values.adminName,
        adminPwd: values.adminPwd,
        data,
      };

      if (isUpdate.value) {
        // 如果 isUpdate 为 true，更新用户
        await updateUser(params);
      } else {
        // 否则，添加新用户
        await addUser(params);
      }

      closeModal();
      emit('success');
    } catch (error) {
      console.error('Failed to submit device data:', error);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
