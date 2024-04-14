<template>
  <BasicModal
    v-bind="$attrs"
    title="历史数据导入"
    :helpMessage="['提示1', '提示2']"
    width="1000px"
    @fullscreen="onFullscreen"
  />
</template>
<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';

  const selectTable = ref<InstanceType<typeof BasicTable> | undefined>();

  const onFullscreen = async () => {
    await nextTick();
    selectTable.value?.redoHeight();
  };
</script>
