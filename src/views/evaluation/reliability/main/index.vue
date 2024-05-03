<template>
  <PageWrapper title="变压器可靠性寿命预测主页">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          对设备进行可靠性寿命评估。<strong style="color: dodgerblue">请选选择设备。</strong><br />
          为了得到最终的测试结果，用户需要依次对设备进行状态评估，<strong style="color: dodgerblue"
            >可靠性寿命评估</strong
          >，可靠性经济评估，最终获取运维决策的信息。
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
  const routeParam = useRouteParams();

  const go = useGo();
  const btnTexts = ref<Array<string>>(['可靠性寿命预测', '历史评估结果']);
  const deviceInfo = ref(deviceDemo);
  const maxHeight: Ref<number | string> = ref(-1);
  const showDetail = ref(true);

  function selectDevice(device) {
    deviceInfo.value = device;
    showDetail.value = true;
    maxHeight.value = 200;
    // 渲染详细信息
  }
  async function goEvaluation() {
    routeParam.setParams({ src: logo, device: deviceInfo.value });
    go(PageEnum.Reliability_Evaluate_Page);
  }
  async function goHistory() {
    go(PageEnum.HistoryManage_Page);
  }
</script>
