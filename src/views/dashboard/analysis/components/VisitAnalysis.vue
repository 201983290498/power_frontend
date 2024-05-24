<template>
  <Card title="设备状态健康指数(%)" :loading="props.loading" headStyle="font-weight: bold">
    <div ref="chartRef" :style="{ height, width }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { ref, Ref, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { basicProps } from './props';
  import { Card } from 'ant-design-vue';

  defineOptions({
    name: 'VisitAnalysis',
  });
  const props = defineProps({
    ...basicProps,
    loading: {
      type: Boolean,
      default: false,
    },
  });
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          width: 1,
          color: '#019680',
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'solid',
          color: 'rgba(226,226,226,0.5)',
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        type: 'value',
        max: 100,
        splitNumber: 4,
        axisTick: {
          show: false,
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
          },
        },
      },
    ],
    grid: { left: '2%', right: '2%', top: '2%', bottom: 0, containLabel: true },
    series: [
      {
        smooth: true,
        data: [],
        type: 'line',
        areaStyle: {},
        itemStyle: {
          color: '#5ab1ef',
        },
      },
      {
        smooth: true,
        data: [],
        type: 'line',
        areaStyle: {},
        itemStyle: {
          color: '#ff00002f',
        },
      },
    ],
  };
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  watch(
    () => props.loading,
    () => {
      if (props.loading) return;
      options.xAxis.data = [];
      for (let i = 0; i <= props.result.status.length; i++) {
        options.xAxis.data.push(''+i);
      }
      options.series[0].data = props.result.status;
      setOptions(options);
    },
  );
  watch(
    () => props.result,
    () => {
      if (props.loading) return;
      options.xAxis.data = [];
      options.series[1].data = [];
      for (let i = 1; i <= props.result.status.length; i++) {
        options.xAxis.data.push(''+i);
        options.series[1].data.push(60);
      }
      options.series[0].data = props.result.status;
      console.log(options.series[1].data);
      setOptions(options);
    },
  );
</script>
<script lang="ts">
  export default {
    name: 'VisitAnalysis',
  };
</script>
