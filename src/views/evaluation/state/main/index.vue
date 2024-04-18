<template>
  <PageWrapper title="设备状态评估主页">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          对设备进行状态评估，为了得到最终的测试结果。
          用户需要依次对设备进行状态评估，可靠性寿命评估，可靠性经济评估，最终获取运维决策的信息。
        </span>
      </div>
    </template>
    <DeviceManagement @chooseDevice="selectDevice" :re-size="true" :max-height="200" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import DeviceManagement from '/@/views/dashboard/deviceManage/index.vue';

  function selectDevice(device) {
    console.log(device);
    // 渲染详细信息
  }
</script>
