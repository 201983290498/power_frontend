<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './history.data';
  import { addHistory, exportHistory } from '/@/api/sys/history';

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
  const getTitle = computed(() => (!unref(isUpdate) ? '新增历史数据' : '导出历史数据'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      if (isUpdate.value) {
        // 如果 isUpdate 为 true，导出历史数据
        const result = await exportHistory(values.id, values); // 确保 values 包含 id 和其他必要信息
        console.log('History export:', result);
      } else {
        // 否则，添加新的历史数据
        const result = await addHistory(values);
        console.log('New history added:', result);
      }

      closeModal();
      emit('success');
    } catch (error) {
      console.error('Failed to submit history data:', error);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
