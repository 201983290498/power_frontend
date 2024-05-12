<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <template v-if="!isView">
      <BasicForm @register="registerForm" />
    </template>
    <template v-else>
      <BasicForm :schemas="Viewform" :model="formData" />
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
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const formData = ref({}); // Shared data object
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (data) {
      formData.value = { ...data.record };
      isView.value = !!data.isView;
      if (data.isUpdate) {
        setFieldsValue({
          ...data.record,
        });
      }
    }
    isView.value = !!data?.isView;
  });

  const getTitle = computed(() => {
    return unref(isView) ? '查看用户' : isUpdate.value ? '编辑用户' : '新增用户';
  });
  async function handleSubmit() {
    if (unref(isView)) {
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
        const result = await updateUser(params);
        console.log('Device updated:', result);
      } else {
        // 否则，添加新用户
        const result = await addUser(params);
        console.log('New device added:', result);
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
