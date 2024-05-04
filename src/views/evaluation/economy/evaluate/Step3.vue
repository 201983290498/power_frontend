<template>
  <Card
    class="step3 !pb-15"
    title="评估结果"
    :bordered="true"
    :headStyle="headStyle"
    :body-style="{ padding: '5px' }"
  >
    <Card
      :body-style="{ padding: '15px' }"
      class="flex flex-col !mt-4 !mb-4 w-9/10 !m-auto"
      :bordered="false"
    >
      <CardGrid class="grid mr-4" :style="{ backgroundColor: textColor.success }">
        <span class="text-3xl">{{ props.result.operatingYears }}</span> <br />
        <span>运行年限</span>
      </CardGrid>
      <CardGrid class="grid" :style="{ backgroundColor: textColor.warning }">
        <span class="text-3xl">{{ props.result.avgAnnualCost }}</span> <br />
        <span>年均成本</span>
      </CardGrid>
    </Card>
    <div class="flex enter-y w-9/10 !m-auto" :style="{ padding: '0px 15px' }">
      <Card
        class="w-98/100"
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
  import { reactive, ref, Ref, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  const textColor = reactive({
    success: '#55d187',
    primary: '#0960bd',
    warning: '#efbd47',
    danger: '#ed6f6f',
  });
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
      default: '300px',
    },
  });
  const headStyle = { fontWeight: '700', fontSize: '20px' };
  const chartRef1 = ref<HTMLDivElement | null>(null);
  const chartRef2 = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef1 as Ref<HTMLDivElement>);
  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      console.log(props.loading);
      setOptions({
        title: {
          text: '寿命进程', //标题文本内容
        },
        toolbox: {
          //可视化的工具箱
          show: true,
          feature: {
            restore: {
              //重置
              show: true,
            },
            saveAsImage: {
              //保存图片
              show: true,
            },
          },
        },
        tooltip: {
          //弹窗组件
          formatter: '{a} <br/>{b} : {c}%',
        },
        series: [
          {
            name: '寿命进程',
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [
              { value: Math.round(props.result.lifespanProcess * 100), name: '剩余寿命/设计寿命' },
            ],
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
    width: 48%;
    padding: 1.5rem;
    color: #fff;
  }
</style>
