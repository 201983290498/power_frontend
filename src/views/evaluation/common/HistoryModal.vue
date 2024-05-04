<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register1"
    title="历史数据导入"
    :helpMessage="['提示1', '提示2']"
    width="1000px"
    @fullscreen="onFullscreen"
    @ok="handleOk"
  />
</template>
<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import { EvaluatedIds } from './data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable } from '/@/components/Table';

  const emit = defineEmits(['success']);
  defineOptions({
    name: 'HistoryModal',
  });

  const selectTable = ref<InstanceType<typeof BasicTable> | undefined>();
  const evaluateId: EvaluatedIds = {};

  const onFullscreen = async () => {
    await nextTick();
    selectTable.value?.redoHeight();
  };
  const [register1, { closeModal }] = useModalInner();

  function handleOk() {
    emit('success', evaluateId);
    closeModal();
  }
</script>
<script lang="ts">
  export default {
    name: 'HistoryModal',
  };
</script>
