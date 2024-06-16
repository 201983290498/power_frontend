<template>
  <Card
    class="step3 !pb-15"
    title="评估结果"
    :bordered="true"
    :headStyle="headStyle"
    :body-style="{ padding: '5px' }"
  >
    <Card class="w-88/100 !m-auto">
      <DeviceDetail :src="src" :device="device" />
    </Card>
    <div class="flex enter-y w-9/10 !m-auto !mt-4" :style="{ padding: '0px 15px' }">
      <Card class="w-48/100" title="建议检修方式" :headStyle="{ fontWeight: '700' }">
        <div class="text-center text-lg" style="height: 200px; overflow-y: auto">
          {{ props.result.suggestedMaintenanceMethod }}
        </div>
      </Card>
      <Card class="w-48/100 !ml-4/100" title="检修内容" :headStyle="{ fontWeight: '700' }">
        <div class="text-center text-lg" style="height: 200px; overflow-y: auto">
          {{ props.result.maintenanceContent }}
        </div>
      </Card>
    </div>
    <Card
      :body-style="{ padding: '15px' }"
      class="flex flex-col !mt-2 w-9/10 !m-auto"
      :bordered="false"
    >
      <CardGrid class="grid mr-4" :style="{ backgroundColor: textColor.success }">
        <span class="text-5xl">{{ props.result.riskRewardCostRatio }}</span> <br />
        <span class="text-xl">建议检修方式的风险收益成本比</span>
      </CardGrid>
    </Card>
  </Card>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { reactive, ref } from 'vue';
  import { useEvaluateStore } from '/@/store/modules/evaluate';
  import DeviceDetail from '../../common/DeviceDetail.vue';

  const textColor = reactive({
    success: '#55d187',
    primary: '#0960bd',
    warning: '#efbd47',
    danger: '#ed6f6f',
  });
  const headStyle = { fontWeight: '700', fontSize: '20px' };
  const evaluateStore = useEvaluateStore();
  const device = ref(evaluateStore.getDeviceInfo);
  const src = ref(evaluateStore.getDeviceImage);
  const props = defineProps({
    result: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
    },
  });
</script>
<style scoped>
  .grid {
    text-align: center;
    width: 98%;
    padding: 1.5rem;
    color: #fff;
    margin: 0 auto;
  }
</style>
