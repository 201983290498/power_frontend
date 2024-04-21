<template>
  <div class="flex flex-row w-full h-60 !mt-4" style="background-color: #fff">
    <div class="h-full w-3/4 flex !flex-row p-4">
      <div class="flex h-full !w-auto border-image">
        <Image class="!h-full !w-52" preview :src="src" />
      </div>
      <div class="flex flex-col h-full w-full p-4 info-content">
        <div class="flex flex-col w-1/2 font-sans">
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
    <div class="h-full w-1/4 flex p-4">
      <div class="flex flex-col justify-center h-full w-1/2">
        <Button
          class="!mt-4 !mb-3 !bg-blue-600 font-serif !text-lg !h-14 !font-bold !rounded-xl"
          type="primary"
          @click="emit('next')"
          style="box-shadow: 0px 0px 4px 4px #e5e8ef !important"
        >
          {{ btnTexts[0] }}
        </Button>
        <Button
          class="!mt-2 !mb-4 !bg-blue-600 font-serif !h-14 !text-lg !font-bold !rounded-xl"
          type="primary"
          style="box-shadow: 0px 0px 4px 4px #e5e8ef !important"
          @click="emit('history')"
        >
          {{ btnTexts[1] }}
        </Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { Image, Divider, Button } from 'ant-design-vue';

  import { watch, ref } from 'vue';
  const device = ref({});
  const btnTexts = ref<Array<any>>(['设备详情', '设备维护']);
  const emit = defineEmits(['history', 'next']);
  defineOptions({
    name: 'DeviceInfo',
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
    buttonTexts: {
      type: Array<string>,
      default: () => Array(['设备详情', '设备维护']),
      requried: false,
    },
  });
  watch(
    () => props.device,
    (newValue) => {
      device.value = newValue;
    },
  );
  watch(
    () => props.buttonTexts,
    (newValue) => {
      btnTexts.value = newValue;
    },
  );
  btnTexts.value = props.buttonTexts;
  device.value = props.device;
</script>
<script lang="ts">
  export default {
    name: 'DeviceInfo',
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
