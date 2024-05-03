<template>
  <PageWrapper title="设备状态评估主页">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          对设备进行状态评估。<strong style="color: dodgerblue">请选选择设备。</strong><br />
          为了得到最终的测试结果，用户需要依次对设备进行
          <strong style="color: dodgerblue"> 状态评估</strong
          >，可靠性寿命评估，可靠性经济评估，最终获取运维决策的信息。
        </span>
      </div>
    </template>
    <DeviceManagement @chooseDevice="selectDevice" :re-size="true" :max-height="maxHeight" />
    <DeviceInfo
      :src="logo"
      :buttonTexts="btnTexts"
      @next="goEvaluation"
      @history="goHistory"
      :device="deviceInfo"
      v-if="showDetail"
    />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import DeviceManagement from '/@/views/dashboard/deviceManage/index.vue';
  import DeviceInfo from '../../common/DeviceInfo.vue';
  import { deviceDemo } from '../../common/data';
  import logo from '/@/assets/images/1.jpg';
  import { ref, Ref } from 'vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRouteParams } from '/@/store/modules/route';
  import { closeTab } from '../../common/common';
  import { useRouter } from 'vue-router';
  import { useEvaluateStore } from '/@/store/modules/evaluate';
  const routeParam = useRouteParams();

  const currentPage = PageEnum.State_Main_Page;
  const router = useRouter();
  const go = useGo();
  const btnTexts = ref<Array<string>>(['进入状态评估', '历史评估结果']);
  const maxHeight: Ref<number | string> = ref(-1);
  const showDetail = ref(true);
  const deviceInfo = ref<Partial<any> | null>(deviceDemo);
  const evaluateState = useEvaluateStore();

  evaluateState.getDeviceInfo !== null && devicePreProcess();

  function selectDevice(device) {
    deviceInfo.value = device;
    evaluateState.setDeviceInfo(device);
    showDetail.value = true;
    maxHeight.value = 200;
  }

  async function goEvaluation() {
    routeParam.setParams({ src: logo, device: deviceInfo.value });
    go(PageEnum.State_Evaluate_Page);
  }

  async function goHistory() {
    await closeTab(currentPage, router);
    go(PageEnum.HistoryManage_Page);
  }

  function devicePreProcess() {
    deviceInfo.value = evaluateState.getDeviceInfo;
  }
</script>
