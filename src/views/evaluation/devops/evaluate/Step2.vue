<template>
  <div>
    <Card title="运维决策" :bordered="bordered">
      <BasicForm @register="register1" />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';
  import { step1Schemas } from './data';
  import { Card } from 'ant-design-vue';

  const [register1, { getFieldsValue: getFieldsValue1, setFieldsValue: setFieldsValue1 }] = useForm(
    {
      labelWidth: 200,
      schemas: step1Schemas,
      actionColOptions: {
        span: 24,
      },
      showResetButton: false,
      showAdvancedButton: false,
      showSubmitButton: false,
    },
  );

  defineProps({
    bordered: {
      type: Boolean,
      default: true,
    },
  });

  function submitData() {
    return getFieldsValue1();
  }

  function setFormFields(data) {
    setFieldsValue1(data);
  }

  defineExpose({
    submitData,
    setFormFields,
  });
</script>
