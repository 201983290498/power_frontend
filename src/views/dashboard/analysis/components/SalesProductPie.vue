<template>
  <Card title="最新运维检修建议" :loading="loading" style="background-color: #46B35F">
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
      default: '350px',
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
      textStyle: {
        color: '#fff',
        fontSize: 18,
      },
    },
    series: [
      {
        name: '建议检修方式的风险收益成本比',
        type: 'pie',
        radius: '73%',
        center: ['50%', '50%'],
        color: ['#5ab1ef', '#67e0e3'],
        label: {
          color: '#fff',
          fontSize: 18,
        },
        data: [
          {
            value: props.result.riskRewardCostRatio,
            name: '风险成本系数: ' + props.result.riskRewardCostRatio,
          },
          {
            value: 1,
            name: '经济性成本系数: ' + 1,
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
