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
  import { formSchema, Viewform } from './device.data';
  import { addDevice, updateDevice } from '/@/api/sys/device';

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
    return unref(isView) ? '查看设备' : isUpdate.value ? '编辑设备' : '新增设备';
  });
  async function handleSubmit() {
    if (unref(isView)) {
      closeModal();
      return;
    }
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      if (isUpdate.value) {
        // 如果 isUpdate 为 true，更新设备信息
        const result = await updateDevice(values.id, values); // 确保 values 包含 id 和其他必要信息
        console.log('Device updated:', result);
      } else {
        // 否则，添加新设备
        const result = await addDevice(values);
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
