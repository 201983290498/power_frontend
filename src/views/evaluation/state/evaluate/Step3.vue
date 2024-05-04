<template>
  <Card
    class="step3"
    title="评估结果"
    :bordered="true"
    :headStyle="headStyle"
    :body-style="{ padding: '5px' }"
  >
    <Card style="width: 100%" title="变压器信息">
      <DeviceDetail :src="src" :device="device" />
    </Card>
    <Card
      style="width: 100%"
      :body-style="{ padding: '0px', background: bkcolor }"
      class="!mt-4 !mb-15"
      title="详细信息"
    >
      <CardGrid class="grid">
        <span class="text-xl">{{ props.result.personCharge }}</span> <br />
        <span class="text-sm">测试负责人</span>
      </CardGrid>
      <CardGrid class="grid">
        <span class="text-xl">{{ props.result.evaluateTime }}</span> <br />
        <span>测试时间</span>
      </CardGrid>
      <CardGrid class="grid">
        <span class="text-xl">{{ props.result.statusValue }}</span> <br />
        <span>设备状态值</span>
      </CardGrid>
      <CardGrid class="grid">
        <span class="text-xl">{{ props.result.status }}</span> <br />
        <span>设备状态</span>
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
