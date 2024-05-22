<template>
  <div class="p-4">
    <!-- 卡片显示 -->
    <GrowCard :loading="loading" class="enter-y" />
    <Card
      title="设备列表"
      style="margin-top: 0.5rem; margin-bottom: 0.5rem"
      bodyStyle="padding:0.5rem"
      headStyle="font-size: 1.3rem; font-weight: bold;"
    >
      <div class="text">请选择合适的设备，并查看该设备的整体状态。</div>
      <DeviceManagement
        @chooseDevice="selectDevice"
        :re-size="!showDetail"
        :max-height="maxHeight"
      />
    </Card>
    <!-- 访问流量
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" /> -->
    <!-- 三张卡片 -->
    <div class="md:flex enter-y" v-if="showDetail">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading"/>
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Ref, ref } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import VisitSource from './components/VisitSource.vue';
  import VisitRadar from './components/VisitRadar.vue';
  import SalesProductPie from './components/SalesProductPie.vue';
  import { Card } from 'ant-design-vue';
  import { useEvaluateStore } from '/@/store/modules/evaluate';
  import DeviceManagement from '/@/views/dashboard/deviceManage/index.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  const loading = ref(true);
  const maxHeight: Ref<number | string> = ref(-1);
  const showDetail = ref(false);
  const deviceInfo = ref<Partial<any> | null>(null); // 设备信息
  const evaluateState = useEvaluateStore();
  const { createMessage } = useMessage();
  evaluateState.getDeviceInfo !== null && devicePreProcess();

  async function selectDevice(device) {
    evaluateState.setDeviceInfo(device);
  }
  setTimeout(() => {
    loading.value = false;
  }, 1500);

  function devicePreProcess() {
    createMessage.info('默认选择上次测评的设备');
    deviceInfo.value = evaluateState.getDeviceInfo;
    showDetail.value = true;
  }
</script>
<style scoped>
  .text {
    font-size: 1rem;
    color: #D81E06;
    margin-left: 1rem;
    width: 100%;
  }
</style>
