<template>
  <!-- 卡片 -->
  <Card
    title="剩余可靠性寿命进程(剩余寿命/设计寿命)"
    :loading="loading"
    headStyle="font-weight: bold"
  >
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { EChartsOption } from 'echarts';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  defineOptions({
    name: 'VisitRadar',
  });

  // 接受传递的参数
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
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
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
        name: '寿命进程(剩余寿命/设计寿命)',
        type: 'pie',
        radius: '73%',
        center: ['50%', '50%'],
        color: ['#3BA272', '#EE6666'],
        data: [
          {
            value: props.result.lifespanProcess / 100,
            name:
              '剩余寿命:' +
              (Math.round(props.result.lifespanProcess * 10) / 10 < 0
                ? 0
                : Math.round(props.result.lifespanProcess * 10) / 10) +
              '%',
          },
          {
            value: 1 - props.result.lifespanProcess / 100,
            name:
              '已用寿命:' +
              (Math.round((100 - props.result.lifespanProcess) * 10) / 10 > 100
                ? 100
                : Math.round((100 - props.result.lifespanProcess) * 10) / 10) +
              '%',
          },
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
        animationDelay: function () {
          return Math.random() * 100;
        },
      },
    ],
  };
  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      if (props.result.evaluateId === null) {
        createMessage.warning('该测评没有任何可靠性评估相关的测评');
      } else {
        setOptions(options);
      }
    },
    { immediate: true },
  );
</script>
<script lang="ts">
  export default {
    name: 'VisitRadar',
  };
</script>
