<template>
  <div class="p-4">
    <!-- 卡片显示 -->
    <GrowCard :loading="loading1" class="enter-y" />
    <Card
      title="设备管理"
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
    <!-- 访问流量 -->
    <VisitAnalysis
      headStyle="font-size: 1.3rem; font-weight: bold;"
      class="!my-4 enter-y"
      :loading="loading"
      :result="evaluteStatus.healthStatus"
      v-if="showDetail"
    />
    <!-- 三张卡片 -->
    <div class="flex-atuo xl:flex enter-y" v-if="showDetail">
      <VisitRadar class="w-full" :loading="loading" :result="evaluteStatus.reliability" 
      headStyle="font-size: 1.3rem; font-weight: bold; color: #fff" />
      <VisitSource
        class="w-full !xl:ml-2 !<xl:mt-4"
        :loading="loading"
        :result="evaluteStatus.economyOutput"    
        headStyle="font-size: 1.3rem; font-weight: bold; color: #fff"
      />
      <SalesProductPie
        class="w-full !xl:ml-2 !<xl:mt-4"
        :loading="loading"
        :result="evaluteStatus.decisionOutput"
        headStyle="font-size: 1.3rem; font-weight: bold; color: #fff"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, Ref, ref } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import VisitSource from './components/VisitSource.vue';
  import VisitRadar from './components/VisitRadar.vue';
  import SalesProductPie from './components/SalesProductPie.vue';
  import { Card } from 'ant-design-vue';
  import { useEvaluateStore } from '/@/store/modules/evaluate';
  import DeviceManagement from '/@/views/dashboard/deviceManage/index.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getHealthStatus, getRecentStatus } from '/@/api/sys/device';
  import VisitAnalysis from './components/VisitAnalysis.vue';

  const loading = ref(true);
  const loading1 = ref(true);
  const maxHeight: Ref<number | string> = ref(-1);
  const showDetail = ref(false);
  const evaluateState = useEvaluateStore();
  const { createMessage } = useMessage();
  const evaluteStatus = reactive({
    reliability: {},
    economyOutput: {},
    decisionOutput: {},
    healthStatus: {},
  });

  async function selectDevice(device) {
    evaluateState.setDeviceInfo(device);
    let tmp = await getHealthStatus({ equipId: device.equipId });
    tmp.status.unshift(0);
    for(let i=0; i<tmp.times.length; i++){
      tmp.times[i] = new Date(tmp.times[i]).toLocaleString('default', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2月$3日$4时').replace(/,/g, '');
    }
    tmp.times.unshift('0');
    evaluteStatus.healthStatus = tmp;
    const result = await getRecentStatus({ equipId: device.equipId });
    if (
      result.reliabilityOutput.evaluateId === null ||
      result.economyOutput.evaluateId === null ||
      result.decisionOutput.evaluateId === null ||
      tmp.status.length === 1
    ) {
      createMessage.error('该设备暂无评估结果');
      return;
    }
    evaluteStatus.reliability = result.reliabilityOutput;
    evaluteStatus.economyOutput = result.economyOutput;
    evaluteStatus.decisionOutput = result.decisionOutput;
    console.log("result", evaluteStatus.decisionOutput);
    showDetail.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  setTimeout(() => {
    loading1.value = false;
  }, 500);
</script>
<style scoped lang="less">
  .text {
    font-size: 1rem;
    color: #D81E06;
    margin-left: 1rem;
    width: 100%;
  }
</style>
