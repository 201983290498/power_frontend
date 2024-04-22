<template>
  <div>
    <Card title="运行环境" :bordered="bordered">
      <BasicForm @register="register1" />
    </Card>
    <Card title="油色谱分析" :bordered="bordered" class="!mt-2">
      <BasicForm @register="register2" />
    </Card>
    <Card title="电气试验" :bordered="bordered" class="!mt-2">
      <BasicForm @register="register3" />
    </Card>
    <Card title="油化试验" :bordered="bordered" class="!mt-2">
      <BasicForm @register="register4" />
    </Card>
    <Card title="其他项目" :bordered="bordered" class="!mt-2">
      <BasicForm @register="register5" />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';
  import { step1Schemas, step2Schemas, step3Schemas, step4Schemas, step5Schemas } from './data';
  import { Card } from 'ant-design-vue';
  import { transformDataToField } from '/@/utils/listToFiled';

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

  const [register2, { getFieldsValue: getFieldsValue2, setFieldsValue: setFieldsValue2 }] = useForm(
    {
      labelWidth: 200,
      schemas: step2Schemas,
      actionColOptions: {
        span: 24,
      },
      showResetButton: false,
      showAdvancedButton: false,
      showSubmitButton: false,
    },
  );

  const [register3, { getFieldsValue: getFieldsValue3, setFieldsValue: setFieldsValue3 }] = useForm(
    {
      labelWidth: 200,
      schemas: step3Schemas,
      actionColOptions: {
        span: 24,
      },
      showResetButton: false,
      showAdvancedButton: false,
      showSubmitButton: false,
    },
  );

  const [register4, { getFieldsValue: getFieldsValue4, setFieldsValue: setFieldsValue4 }] = useForm(
    {
      labelWidth: 200,
      schemas: step4Schemas,
      actionColOptions: {
        span: 24,
      },
      showResetButton: false,
      showAdvancedButton: false,
      showSubmitButton: false,
    },
  );

  const [register5, { getFieldsValue: getFieldsValue5, setFieldsValue: setFieldsValue5 }] = useForm(
    {
      labelWidth: 200,
      schemas: step5Schemas,
      actionColOptions: {
        span: 24,
      },
      showResetButton: false,
      showAdvancedButton: false,
      showSubmitButton: false,
    },
  );

  const props = defineProps({
    bordered: {
      type: Boolean,
      default: true,
    },
  });
  console.log(props.bordered);
  function submitData() {
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
