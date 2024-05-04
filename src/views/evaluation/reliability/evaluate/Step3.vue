<template>
  <Card
    class="step3 !pb-15"
    title="评估结果"
    :bordered="true"
    :headStyle="headStyle"
    :body-style="{ padding: '5px' }"
  >
    <Card :body-style="{ padding: '15px' }" class="!mt-4 !mb-4 w-9/10 !m-auto" :bordered="false">
      <CardGrid class="grid mr-4" :style="{ backgroundColor: bkcolor }">
        <span class="text-3xl">{{ props.result.healthIndex }}</span> <br />
        <span>健康指数</span>
      </CardGrid>
      <CardGrid class="grid mr-4" :style="{ backgroundColor: bkcolor }">
        <span class="text-3xl">{{ props.result.hotSpotTemper }}</span> <br />
        <span>热点温度</span>
      </CardGrid>
      <CardGrid class="grid" :style="{ backgroundColor: bkcolor }">
        <span class="text-3xl">{{ props.result.resReliabilityLife }}</span> <br />
        <span>剩余可靠性寿命</span>
      </CardGrid>
    </Card>
    <div class="flex enter-y w-9/10 !m-auto" :style="{ padding: '0px 15px' }">
      <Card
        class="w-48/100 !mr-3/100"
        title="热寿命损失率"
        :loading="loading"
        :headStyle="{ fontWeight: '700' }"
      >
        <div ref="chartRef1" :style="{ width, height }"></div>
      </Card>
      <Card
        class="w-48/100"
        title="寿命进程(剩余寿命/设计寿命)"
        :loading="loading"
        :headStyle="{ fontWeight: '700' }"
      >
        <div ref="chartRef2" :style="{ width, height }"></div>
      </Card>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, CardGrid } from 'ant-design-vue';
  import { ref, Ref, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  const props = defineProps({
    result: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
    },
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '400px',
    },
  });
  const bkcolor = ref('#55d187');
  const headStyle = { fontWeight: '700', fontSize: '20px' };
  const chartRef1 = ref<HTMLDivElement | null>(null);
  const chartRef2 = ref<HTMLDivElement | null>(null);
  const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>);
  const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>);
  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      setOptions1({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          bottom: '0',
          left: 'center',
        },
        series: [
          {
            name: '热寿命损失率',
            type: 'pie',
            radius: ['0%', '80%'],
            avoidLabelOverlap: false,
            data: [
              {
                value: props.result.thermalLifeLossRate,
                name:
                  '热寿命损失率:' + Math.round(props.result.thermalLifeLossRate * 1000) / 10 + '%',
              },
              {
                value: 1 - props.result.thermalLifeLossRate,
                name:
                  '已损失率:' +
                  Math.round((1 - props.result.thermalLifeLossRate) * 1000) / 10 +
                  '%',
              },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            animationType: 'scale',
            animationEasing: 'exponentialInOut',
            animationDelay: function () {
              return Math.random() * 100;
            },
          },
        ],
      });
      setOptions2({
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
            radius: '80%',
            center: ['50%', '50%'],
            color: ['#3BA272', '#EE6666'],
            data: [
              {
                value: props.result.lifespanProcess,
                name: '剩余寿命:' + Math.round(props.result.lifespanProcess * 1000) / 10 + '%',
              },
              {
                value: 1 - props.result.lifespanProcess,
                name:
                  '已用寿命:' + Math.round((1 - props.result.lifespanProcess) * 1000) / 10 + '%',
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
      });
    },
    { immediate: true },
  );
</script>
<style scoped>
  .grid {
    text-align: center;
    width: 32%;
    padding: 1.5rem;
    color: #fff;
  }
</style>
