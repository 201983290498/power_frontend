<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <!-- 根据 isUpdate 显示不同的表单 -->
    <BasicForm v-if="isUpdate" @register="registerForm" :schemas="formSchema" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './history.data';
  import { addHistory } from '/@/api/sys/history';
  import { useMessage } from '/@/hooks/web/useMessage';
  const emit = defineEmits(['success', 'register']);

  const { createMessage } = useMessage();
  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const formData = ref({});
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (data) {
      formData.value = { ...data.record };
      if (data.isUpdate) {
        setFieldsValue({ ...data.record });
      }
    }
  });

  const getTitle = computed(() => {
    return '写入历史数据';
  });
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      const params = {
        decisionId: values.decisionId,
        stateId: values.stateId,
        economyId: values.economyId,
        equipId: values.equipId,
        reliabilityId: values.reliabilityId,
      };
      //写入历史数据
      await addHistory(params);
      closeModal();
      emit('success');
    } catch (error) {
      createMessage.error('Failed to submit device data:' + error);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
