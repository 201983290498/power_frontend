<template>
  <div class="flex flex-row w-full h-60 !mt-2" style="background-color: #fff">
    <DeviceDetail class="h-full w-3/4 p-4 pl-10" :device="device" :src="src" />
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
  import { Button } from 'ant-design-vue';
  import { watch, ref } from 'vue';
  import DeviceDetail from './DeviceDetail.vue';
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
