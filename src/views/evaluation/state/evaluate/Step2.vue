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
  import { step1Schemas, step2Schemas, step3Schemas, step4Schemas, step5Schemas } from './data';  import { ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';

  const [register1] = useForm({
    labelWidth: 200,
    schemas: step1Schemas,
    actionColOptions: {
      span: 24,
    },
    showResetButton: false,
    showAdvancedButton: false,
    showSubmitButton: false,
  });

  const [register2] = useForm({
    labelWidth: 200,
    schemas: step2Schemas,
    actionColOptions: {
      span: 24,
    },
    showResetButton: false,
    showAdvancedButton: false,
    showSubmitButton: false,
  });

  const [register3] = useForm({
    labelWidth: 200,
    schemas: step3Schemas,
    actionColOptions: {
      span: 24,
    },
    showResetButton: false,
    showAdvancedButton: false,
    showSubmitButton: false,
  });

  const [register4] = useForm({
    labelWidth: 200,
    schemas: step4Schemas,
    actionColOptions: {
      span: 24,
    },
    showResetButton: false,
    showAdvancedButton: false,
    showSubmitButton: false,
  });

  const [register5] = useForm({
    labelWidth: 200,
    schemas: step5Schemas,
    actionColOptions: {
      span: 24,
    },
    showResetButton: false,
    showAdvancedButton: false,
    showSubmitButton: false,
  });

  defineProps({
    bordered: {
      type: Boolean,
      default: true,
    },
  });
</script>
