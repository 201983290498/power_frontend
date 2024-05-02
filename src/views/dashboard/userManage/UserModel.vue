<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './user.data';
  import { addUser, updateUser } from '/@/api/sys/Euser';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);

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

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'));

  /*async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      console.log(values);
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }*/ 
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      if (isUpdate.value) {
        // 如果 isUpdate 为 true，更新用户信息
        const result = await updateUser(values.id, values); // 确保 values 包含 id 和其他必要信息
        console.log('User updated:', result);
      } else {
        // 否则，添加新用户
        const result = await addUser(values);
        console.log('New user added:', result);
      }

      closeModal();
      emit('success');
    } catch (error) {
      console.error('Failed to submit user data:', error);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
