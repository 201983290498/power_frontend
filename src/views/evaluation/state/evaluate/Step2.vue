<template>
  <div>
    <Card
      title="运行环境"
      :bordered="props.bordered"
      headStyle="font-weight: bold; font-size: 20px"
    >
      <BasicForm @register="register1" />
    </Card>
    <Card
      title="油色谱分析"
      :bordered="props.bordered"
      class="!mt-2"
      headStyle="font-weight: bold; font-size: 20px"
    >
      <BasicForm @register="register2" />
    </Card>
    <Card
      title="电气试验"
      :bordered="props.bordered"
      class="!mt-2"
      headStyle="font-weight: bold; font-size: 20px"
    >
      <BasicForm @register="register3" />
    </Card>
    <Card
      title="油化试验"
      :bordered="props.bordered"
      class="!mt-2"
      headStyle="font-weight: bold; font-size: 20px"
    >
      <BasicForm @register="register4" />
    </Card>
    <Card
      title="其他项目"
      :bordered="props.bordered"
      class="!mt-2"
      headStyle="font-weight: bold; font-size: 20px"
    >
      <BasicForm @register="register5" />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';
  import { step1Schemas, step2Schemas, step3Schemas, step4Schemas, step5Schemas } from './data';
  import { Card } from 'ant-design-vue';
  import { transformDataToField } from '/@/utils/listToFiled';

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
    }
  });

  const [
    register4,
    { getFieldsValue: getFieldsValue4, setFieldsValue: setFieldsValue4, validate: validate4 },
  ] = useForm({
    layout: 'vertical',
    schemas: step4Schemas(props.showMode),
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
    register5,
    { getFieldsValue: getFieldsValue5, setFieldsValue: setFieldsValue5, validate: validate5 },
  ] = useForm({
    layout: 'vertical',
    schemas: step5Schemas(props.showMode),
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
      await validate4();
      await validate5();
      const record1 = getFieldsValue1();
      const record2 = getFieldsValue2();
      const record3 = getFieldsValue3();
      const record4 = getFieldsValue4();
      const record5 = getFieldsValue5();
      const record = {
        ...record1,
        ...record2,
        ...record3,
        ...record4,
        ...record5,
      };
      return record;
    } catch (error) {
      return null;
    }
  }

  function setFormFields(data) {
    const fileds: Record<string, any> = transformDataToField(data);
    setFieldsValue1(fileds);
    setFieldsValue2(fileds);
    setFieldsValue3(fileds);
    setFieldsValue4(fileds);
    setFieldsValue5(fileds);
  }

  defineExpose({
    submitData,
    setFormFields,
  });
</script>
