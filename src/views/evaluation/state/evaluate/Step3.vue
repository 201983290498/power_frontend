<template>
  <Card
    class="step3"
    title="评估结果"
    :bordered="true"
    :headStyle="headStyle"
    :body-style="{ padding: '5px' }"
  >
    <Card style="width: 100%">
      <DeviceDetail :src="src" :device="device" />
    </Card>
    <Card
      style="width: 100%"
      :body-style="{ padding: '15px' }"
      class="!mt-4 !mb-15"
      title="详细信息"
      head-style="font-weight: 700; font-size: 20px"
    >
      <CardGrid class="grid" :style="{ backgroundColor: bkcolor }">
        <span class="text-3xl">{{ props.result.personCharge }}</span> <br />
        <span class="text-sm">责任人</span>
      </CardGrid>
      <CardGrid class="grid" :style="{ backgroundColor: bkcolor }">
        <span class="text-3xl">{{ new Date(props.result.evaluateTime).toLocaleString() }}</span> <br />
        <span>评估时间</span>
      </CardGrid>
      <CardGrid class="grid" :style="{ backgroundColor: bkcolor }">
        <span class="text-3xl">{{ props.result.statusValue }}</span> <br />
        <span>健康指数</span>
      </CardGrid>
      <CardGrid class="grid" :style="{ backgroundColor: bkcolor }">
        <span class="text-3xl">{{ props.result.status }}</span> <br />
        <span>运行状态</span>
      </CardGrid>
    </Card>
  </Card>
</template>
<script lang="ts" setup>
  import { useEvaluateStore } from '/@/store/modules/evaluate';
  import { ref } from 'vue';
  import DeviceDetail from '../../common/DeviceDetail.vue';
  import { Card, CardGrid } from 'ant-design-vue';

  const textColor = {
    success: '#55d187',
    primary: '#0960bd',
    warning: '#efbd47',
    danger: '#ed6f6f',
  };

  const bkcolor = ref(textColor.success);
  const evaluateStore = useEvaluateStore();
  const device = ref(evaluateStore.getDeviceInfo);
  const src = ref(evaluateStore.getDeviceImage);
  const headStyle = { fontWeight: '700', fontSize: '20px' };
  const props = defineProps({
    result: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
    },
  });
  console.log(props.result);
  switch (props.result.status) {
    case '正常':
      bkcolor.value = textColor.success;
      break;
    case '注意':
      bkcolor.value = textColor.primary;
      break;
    case '异常':
      bkcolor.value = textColor.warning;
      break;
    case '严重':
      bkcolor.value = textColor.danger;
      break;
  }
</script>
<style scoped>
  .grid {
    text-align: center;
    width: 50%;
    padding: 1.5rem;
    color: #fff;
  }
</style>
