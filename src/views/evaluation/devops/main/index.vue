<template>
  <PageWrapper title="运维决策主页">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          对设备进行运维决策。<strong style="color: dodgerblue">请选选择设备。</strong> <br />
          为了得到最终的测试结果，用户需要依次对设备进行状态评估，可靠性寿命评估，可靠性经济评估,
          最终获取<strong style="color: dodgerblue">运维决策</strong>的信息。
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
  const btnTexts = ref<Array<string>>(['进入运维决策', '历史评估结果']);
  const deviceInfo = ref(deviceDemo);
  const maxHeight: Ref<number | string> = ref(-1);
  const showDetail = ref(true);

  function selectDevice(device) {
    deviceInfo.value = device;
    showDetail.value = true;
    maxHeight.value = 200;
    // 渲染详细信息
  }
  function goEvaluation() {
    routeParam.setParams({ src: logo, device: deviceInfo.value });
    go(PageEnum.Devops_Evaluate_Page);
  }
  function goHistory() {
    go(PageEnum.HistoryManage_Page);
  }
</script>
