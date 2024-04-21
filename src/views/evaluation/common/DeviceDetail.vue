<template>
  <div class="flex !flex-row">
    <div class="flex h-full !w-auto border-image">
      <Image class="!w-51 !w-51" preview :src="src" />
    </div>
    <div class="flex flex-col w-3/4 h-full p-4 info-content">
      <div class="flex flex-col font-sans">
        <span class="text-lg font-bold">
          <label class="mr-1">设备编号:</label> {{ device.equipNo }}
        </span>
        <Divider class="!mt-2 !mb-2" />
        <span class="text-base font-semibold">
          <label class="mr-1">单位名称:</label> {{ device.organization }}
        </span>
        <span class="text-base mt-1 font-semibold">
          <label class="mr-1">变电站名称:</label> {{ device.substationName }}
        </span>
        <span class="text-base mt-1 font-semibold">
          <label class="mr-1">运行编号:</label> {{ device.runNo }}
        </span>
        <span class="text-base mt-1 font-semibold">
          <label class="mr-1">投运时间:</label> {{ device.operationTime }}
        </span>
        <span class="text-base mt-1 font-semibold">
          <label class="mr-1">电压等级:</label> {{ device.systemNominalVoltage }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { Image, Divider } from 'ant-design-vue';
  import { watch, ref } from 'vue';
  const device = ref({});
  defineOptions({
    name: 'DeviceDetail',
  });
  const props = defineProps({
    src: {
      type: String,
      default: '',
    },
    device: {
      type: Object,
      default: () => {},
      requried: true,
    },
  });
  watch(
    () => props.device,
    (newValue) => {
      device.value = newValue;
    },
  );
  device.value = props.device;
</script>
<script lang="ts">
  export default {
    name: 'DeviceDetail',
  };
</script>
<style scoped>
  .border-image {
    border: 2px solid #e5e8ef;
    /* 根据需要添加其他样式，如边框圆角 */
    border-radius: 2px;
  }
  .info-content {
    color: #4e5969d4 !important;
  }
</style>
