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

      const equipment = {
        equipNo: values.equipNo,
        personCharge: values.personCharge,
        score: values.score,
        evaluateTime: values.evaluateTime,
        status: values.status,
        organization: values.organization,
        runNo: values.runNo,
        substationName: values.substationName,
        operationTime: values.operationTime,
        systemNominalVoltage: values.systemNominalVoltage,
        type: values.type,
        phase: values.phase,
        location: values.location,
        capacity: values.capacity,
        ratedVoltage: values.ratedVoltage,
        connectionSymbol: values.connectionSymbol,
        noLoadCurrent: values.noLoadCurrent,
        noLoadLoss: values.noLoadLoss,
        manufacturer: values.manufacturer,
        manufactureDate: values.manufactureDate,
        factoryNo: values.factoryNo,
        equipId: values.equipId, // 确保 equipId 被正确设置
        equipName: values.equipName, // 确保 equipName 被正确设置
      };

      const params = {
        fixedPwd: values.fixedPwd,
        equipment,
      };

      if (isUpdate.value) {
        // 如果 isUpdate 为 true，更新设备信息
        const result = await updateDevice(params);
        console.log('Device updated:', result);
      } else {
        // 否则，添加新设备
        const result = await addDevice(params);
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
