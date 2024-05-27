<template>
  <Card title="最新运维检修建议" :loading="loading" headStyle="font-weight: bold">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { EChartsOption } from 'echarts';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  defineOptions({
    name: 'SalesProductPie',
  });

  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
    result: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  });
  const options: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '0',
      left: 'center',
    },
    series: [
      {
        name: '建议检修方式的风险收益成本比',
        type: 'pie',
        radius: '73%',
        center: ['50%', '50%'],
        color: ['#5ab1ef', '#67e0e3'],
        data: [
          {
            value: props.result.riskRewardCostRatio,
            name: '不维修的风险系数:' + props.result.riskRewardCostRatio,
          },
          {
            value: 1,
            name: '维修收益系数:' + 1,
          },
        ],
        roseType: 'radius',
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
        animationDelay: function () {
          return Math.random() * 100;
        },
      },
    ],
  };
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      if (props.result.evaluateId === null) {
        createMessage.warning('该设备没有任何运维评估相关的测评');
      } else {
        setOptions(options);
      }
    },
    { immediate: true },
  );
</script>
<script lang="ts">
  export default {
    name: 'SalesProductPie',
  };
</script>
