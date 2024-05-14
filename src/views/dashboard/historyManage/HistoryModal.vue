<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <!-- 根据 isUpdate 显示不同的表单 -->
    <BasicForm v-if="isUpdate" @register="registerForm" :schemas="formSchema" />
    <BasicForm v-else @register="registerForm" :schemas="exportSchema" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema, exportSchema } from './history.data';
  import { addHistory, exportHistory } from '/@/api/sys/history';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: isUpdate.value ? formSchema : exportSchema,
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
    return isUpdate.value ? '导出历史数据' : '历史历史数据';
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
      const params2 = {
        testId: values.testId,
      };
      if (isUpdate.value) {
        // 如果 isUpdate 为 true，写入历史数据
        const result = await exportHistory(params2);
        console.log('New device added:', result);

      } else {
        // 否则，导出历史数据
        const result = await addHistory(params);
        console.log('Device updated:', result);
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
