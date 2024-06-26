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
        <div ref="chartRef" :style="{ width, height }"></div>
      </Card>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, CardGrid } from 'ant-design-vue';
  import { reactive, ref, Ref, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useEvaluateStore } from '/@/store/modules/evaluate';
  import DeviceDetail from '../../common/DeviceDetail.vue';
  import type { EChartsOption } from 'echarts';
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
      default: '400px',
    },
  });
  const headStyle = { fontWeight: '700', fontSize: '20px' };
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  const evaluateStore = useEvaluateStore();
  const device = ref(evaluateStore.getDeviceInfo);
  const src = ref(evaluateStore.getDeviceImage);
  const data1 = [
    {
      name: '寿命进程',
      value:
        props.result.lifespanProcess > 100
          ? 100
          : Math.floor(props.result.lifespanProcess * 10) / 10,
    },
  ];
  const colorTemplate1 = [
    [0.2, 'rgba(255,0,0,0.8)'],
    [0.8, 'rgba(0,255,255,0.8)'],
    [1, 'rgba(0,255,0,0.8)'],
  ];
  const option: EChartsOption = {
    backgroundColor: '#eee',
    tooltip: {
      // 本系列特定的 tooltip 设定。
      show: true,
      formatter: '{b}：{c}%',
      backgroundColor: 'rgba(50,50,50,0.7)', // 提示框浮层的背景颜色。注意：series.tooltip 仅在 tooltip.trigger 为 'item' 时有效。
      borderColor: '#333', // 提示框浮层的边框颜色。...
      borderWidth: 0, // 提示框浮层的边框宽。...
      padding: 5, // 提示框浮层内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。...
      textStyle: {
        // 提示框浮层的文本样式。...
        // color ,fontStyle ,fontWeight ,fontFamily ,fontSize ,lineHeight ,.......
      },
    },
    series: [
      {
        name: '单仪表盘示例', // 系列名称,用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
        type: 'gauge', // 系列类型
        radius: '80%', // 参数:number, string。 仪表盘半径,默认 75% ，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值。
        center: ['50%', '55%'], // 仪表盘位置(圆心坐标)
        startAngle: 225, // 仪表盘起始角度,默认 225。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
        endAngle: -45, // 仪表盘结束角度,默认 -45
        clockwise: true, // 仪表盘刻度是否是顺时针增长,默认 true。
        min: 0, // 最小的数据值,默认 0 。映射到 minAngle。
        max: 100, // 最大的数据值,默认 100 。映射到 maxAngle。
        splitNumber: 10, // 仪表盘刻度的分割段数,默认 10。
        axisLine: {
          // 仪表盘轴线(轮廓线)相关配置。
          show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
          lineStyle: {
            // 仪表盘轴线样式。
            color: colorTemplate1, //仪表盘的轴线可以被分成不同颜色的多段。每段的  结束位置(范围是[0,1]) 和  颜色  可以通过一个数组来表示。默认取值：[[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
            opacity: 1, //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
            width: 30, //轴线宽度,默认 30。
            shadowBlur: 20, //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
            shadowColor: '#ddd', //阴影颜色。支持的格式同color。
          },
        },

        splitLine: {
          // 分隔线样式。
          show: true, // 是否显示分隔线,默认 true。
          length: 30, // 分隔线线长。支持相对半径的百分比,默认 30。
          lineStyle: {
            // 分隔线样式。
            color: '#666', //线的颜色,默认 #eee。
            opacity: 1, //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
            width: 3, //线度,默认 2。
            type: 'solid', //线的类型,默认 solid。 此外还有 dashed,dotted
            shadowBlur: 10, //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
            shadowColor: '#bbb', //阴影颜色。支持的格式同color。
          },
        },

        axisTick: {
          // 刻度(线)样式。
          show: true, // 是否显示刻度(线),默认 true。
          splitNumber: 5, // 分隔线之间分割的刻度数,默认 5。
          length: 8, // 刻度线长。支持相对半径的百分比,默认 8。
          lineStyle: {
            // 刻度线样式。
            color: '#222', //线的颜色,默认 #eee。
            opacity: 1, //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
            width: 1, //线度,默认 1。
            type: 'solid', //线的类型,默认 solid。 此外还有 dashed,dotted
            shadowBlur: 10, //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
            shadowColor: '#888', //阴影颜色。支持的格式同color。
          },
        },

        axisLabel: {
          // 刻度标签。
          show: true, // 是否显示标签,默认 true。
          distance: 5, // 标签与刻度线的距离,默认 5。
          color: '#000', // 文字的颜色,默认 #fff。
          fontSize: 12, // 文字的字体大小,默认 5。
          formatter: '{value}', // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。 示例:// 使用字符串模板，模板变量为刻度默认标签 {value},如:formatter: '{value} kg'; // 使用函数模板，函数参数分别为刻度数值,如formatter: function (value) {return value + 'km/h';}
        },

        pointer: {
          // 仪表盘指针。
          show: true, // 是否显示指针,默认 true。
          length: '70%', // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
          width: 8, // 指针宽度,默认 8。
        },

        itemStyle: {
          // 仪表盘指针样式。
          color: 'auto', // 指针颜色，默认(auto)取数值所在的区间的颜色
          opacity: 1, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
          borderWidth: 0, // 描边线宽,默认 0。为 0 时无描边。
          borderType: 'solid', // 柱条的描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'。
          borderColor: '#fff', // 图形的描边颜色,默认 "#000"。支持的颜色格式同 color，不支持回调函数。
          shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
          shadowColor: '#fff', // 阴影颜色。支持的格式同color。
        },

        emphasis: {
          // 高亮的 仪表盘指针样式
          itemStyle: {
            //高亮 和正常  两者具有同样的配置项,只是在不同状态下配置项的值不同。
          },
        },

        title: {
          // 仪表盘标题。
          show: true, // 是否显示标题,默认 true。
          offsetCenter: [0, '20%'], //相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
          color: '333', // 文字的颜色,默认 #333。
          fontSize: 25, // 文字的字体大小,默认 15。
        },

        detail: {
          // 仪表盘详情，用于显示数据。
          show: true, // 是否显示详情,默认 true。
          offsetCenter: [0, '50%'], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
          color: 'auto', // 文字的颜色,默认 auto。
          fontSize: 40, // 文字的字体大小,默认 15。
          formatter: '{value}%', // 格式化函数或者字符串
        },

        data: data1,
      },
    ],
  };
  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      console.log(props.result);
      setOptions(option);
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
