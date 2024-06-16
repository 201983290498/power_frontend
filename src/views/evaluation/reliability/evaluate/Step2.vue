<template>
  <div>
    <Card title="基本参数" :bordered="props.bordered" 
    headStyle="font-weight: bold; font-size: 20px">
      <BasicForm @register="register1" />
    </Card>
    <Card title="关键参数" :bordered="props.bordered" class="!mt-2" 
    headStyle="font-weight: bold; font-size: 20px">
      <BasicForm @register="register2" />
    </Card>
    <Card title="检修与运行状况" :bordered="props.bordered" class="!mt-2" 
    headStyle="font-weight: bold; font-size: 20px">
      <BasicForm @register="register3" />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';
  import { step1Schemas, step2Schemas, step3Schemas } from './data';
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
    { getFieldsValue: getFieldsValue1, setFieldsValue: setFieldsValue1, validate: validate1 },
  ] = useForm({
    layout: 'vertical',
    schemas: step1Schemas(true),
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

  const [
    register2,
    { getFieldsValue: getFieldsValue2, setFieldsValue: setFieldsValue2, validate: validate2 },
  ] = useForm({
    layout: 'vertical',
    schemas: step2Schemas(props.showMode),
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

  const [
    register3,
    { getFieldsValue: getFieldsValue3, setFieldsValue: setFieldsValue3, validate: validate3 },
  ] = useForm({
    layout: 'vertical',
    schemas: step3Schemas(props.showMode),
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
      await validate1();
      await validate2();
      await validate3();
      const record1 = getFieldsValue1();
      const record2 = getFieldsValue2();
      const record3 = getFieldsValue3();
      let tem = record3.appearanceScore;
      record3.appearanceScore = ['0', '0', '0', '0', '0'];
      for (let i = 0; i < tem.length; i++) {
        record3.appearanceScore[tem[i] - 1] = '1';
      }
      record3.appearanceScore = record3.appearanceScore.join('');
      const record = {
        ...record1,
        ...record2,
        ...record3,
      };
      return record;
    } catch (error) {
      return null;
    }
  }

  function setFormFields(data) {
    if (data.hasOwnProperty('appearanceScore') && data.appearanceScore.length === 5) {
      for (let i = 0; i < data.appearanceScore.length; i++){
        if (data.appearanceScore[i] === '1') {
          data.appearanceScore = i + 1;
          break;
        }
      }
    }
    setFieldsValue1(data);
    setFieldsValue2(data);
    setFieldsValue3(data);
  }

  defineExpose({
    submitData,
    setFormFields,
  });
</script>
