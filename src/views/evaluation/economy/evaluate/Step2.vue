<template>
  <div>
    <Card title="经济性寿命" :bordered="bordered" 
    headStyle="font-weight: bold; font-size: 20px">
      <BasicForm @register="register1" />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';
  import { step1Schemas } from './data';
  import { Card } from 'ant-design-vue';

  const props = defineProps({
    bordered: {
      type: Boolean,
      default: true,
    },
    showMode: {
      type: Boolean,
      default: false,
    },
  });

  const [
    register1,
    { getFieldsValue: getFieldsValue1, setFieldsValue: setFieldsValue1, validate },
  ] = useForm({
    layout: 'vertical',
    schemas: step1Schemas(props.showMode),
    actionColOptions: {
      span: 24,
    },
    showResetButton: false,
    showAdvancedButton: false,
    showSubmitButton: false,
    baseRowStyle: {
      fontSize: '20px',
      fontWeight: 600,
    },
  });

  async function submitData() {
    try {
      await validate();
      return getFieldsValue1();
    } catch (error) {
      return null;
    }
  }

  function setFormFields(data) {
    setFieldsValue1(data);
  }

  defineExpose({
    submitData,
    setFormFields,
  });
</script>
