<template>
  <Card class="step1">
    <DeviceDetail :src="src" :device="device" />
  </Card>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import DeviceDetail from '../../common/DeviceDetail.vue';
  import { Card } from 'ant-design-vue';
  const device = ref({});
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

<style lang="less" scoped>
  .step1 {
    &-form {
      width: 450px;
      margin: 0 auto;
    }

    h3 {
      margin: 0 0 12px;
      color: @text-color-base;
      font-size: 16px;
      line-height: 32px;
    }

    h4 {
      margin: 0 0 4px;
      color: @text-color-base;
      font-size: 14px;
      line-height: 22px;
    }

    p {
      color: @text-color-base;
    }
  }
</style>
