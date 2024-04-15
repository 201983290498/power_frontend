<template>
  <div>
    <Card title="基本参数" :bordered="bordered">
      <BasicForm @register="register1" />
    </Card>
    <Card title="关键参数" :bordered="bordered" class="!mt-2">
      <BasicForm @register="register2" />
    </Card>
    <Card title="电气试验" :bordered="bordered" class="!mt-2">
      <BasicForm @register="register3" />
    </Card>
    <Card title="检修与运行状况" :bordered="bordered" class="!mt-2">
      <BasicForm @register="register4" />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';
  import { step1Schemas, step2Schemas, step3Schemas, step4Schemas, step5Schemas } from './data';
  import { Card } from 'ant-design-vue';
  import { StateInput } from '/#/baseClass';
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

  defineProps({
    bordered: {
      type: Boolean,
      default: true,
    },
  });

  function submitData() {
    const record1 = getFieldsValue1();
    const record2 = getFieldsValue2();
    const record3 = getFieldsValue3();
    const record4 = getFieldsValue4();
    const record = {
      ...record1,
      ...record2,
      ...record3,
      ...record4,
    };
    return record;
  }

  function setFormFields(data: StateInput) {
    const fileds: Record<string, any> = transformDataToField(data);
    setFieldsValue1(fileds);
    setFieldsValue2(fileds);
    setFieldsValue3(fileds);
    setFieldsValue4(fileds);
  }

  defineExpose({
    submitData,
    setFormFields,
  });
</script>
