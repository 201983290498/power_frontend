<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="'输入密码'" @ok="handleSubmit">
    <a-form :form="form" layout="vertical">
      <a-form-item
        name="password"
        label="密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input-password v-model:value="formModel.password" />
      </a-form-item>
    </a-form>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useForm } from 'ant-design-vue'; // 确保路径正确

  const formModel = ref({ password: '' });
  const { modelRef, validate, resetFields } = useForm(formModel);

  const emit = defineEmits(['confirm']);

  const [registerModal, { setModalProps, closeModal }] = useModalInner();

  async function handleSubmit() {
    try {
      await validate();
      emit('confirm', modelRef.value.password);
      closeModal();
    } catch (error) {
      console.error('Validation failed:', error);
      setModalProps({ confirmLoading: false });
    }
  }

  registerModal(() => {
    resetFields(); // 每次打开模态框时重置表单字段
  });
</script>
