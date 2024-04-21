<template>
  <PageWrapper title="设备状态评估主页">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          对设备进行状态评估。<br />
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

  const go = useGo();
  const btnTexts = ref<Array<string>>(['进入状态评估', '历史评估结果']);
  const deviceInfo = ref(deviceDemo);
  const maxHeight: Ref<number | string> = ref('auto');
  const showDetail = ref(false);

  function selectDevice(device) {
    deviceInfo.value = device;
    showDetail.value = true;
    maxHeight.value = 200;
    // 渲染详细信息
  }
  function goEvaluation() {
    go(PageEnum.State_Evaluate_Page);
  }
  function goHistory() {
    go(PageEnum.HistoryManage_Page);
  }
</script>
