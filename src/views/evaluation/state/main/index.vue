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
    <DeviceManagement @chooseDevice="selectDevice" :re-size="!showDetail" :max-height="maxHeight" />
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
  import logo from '/@/assets/images/1.jpg';
  import { ref, Ref } from 'vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRouteParams } from '/@/store/modules/route';
  import { useEvaluateStore } from '/@/store/modules/evaluate';
  import { useMessage } from '/@/hooks/web/useMessage';

  const routeParam = useRouteParams();
  const go = useGo();
  const btnTexts = ref<Array<string>>(['进入状态评估', '历史评估结果']);
  const maxHeight: Ref<number | string> = ref(-1);
  const showDetail = ref(false);
  const deviceInfo = ref<Partial<any> | null>(null); // 设备信息
  const evaluateState = useEvaluateStore();
  const { createMessage } = useMessage();
  evaluateState.getDeviceInfo !== null && devicePreProcess();

  function selectDevice(device) {
    deviceInfo.value = device;
    showDetail.value = true;
    maxHeight.value = 200;
    evaluateState.setDeviceInfo(device);
    evaluateState.setDeviceImage(logo);
  }

  async function goEvaluation() {
    routeParam.setParams({ src: logo, device: deviceInfo.value });
    go(PageEnum.State_Evaluate_Page);
  }

  async function goHistory() {
    go(PageEnum.HistoryManage_Page);
  }

  function devicePreProcess() {
    createMessage.info('默认选择上次测评的设备');
    deviceInfo.value = evaluateState.getDeviceInfo;
    evaluateState.setDeviceImage(logo);
    showDetail.value = true;
  }
</script>
