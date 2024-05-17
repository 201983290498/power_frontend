<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="registerModal"
    title="历史数据导入"
    :helpMessage="['提示1', '提示2']"
    width="80%"
    style="top: 0px !important"
    @fullscreen="onFullscreen"
    @ok="handleOk"
  >
    <HistoryManagement :chooseMode="true" @select="selectValue" :conditions="filter" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import { EvaluatedIds } from './data';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable } from '/@/components/Table';
  import HistoryManagement from '/@/views/dashboard/historyManage/index.vue';

  const emit = defineEmits(['success']);
  const selectItem = ref();
  const filter = ref({});
  defineOptions({
    name: 'HistoryModal',
  });
  const [registerModal] = useModalInner((data) => {
    filter.value = data;
  });

  const props = defineProps({
    checkFunction: {
      type: Function,
      default: () => {},
    },
  });

  const selectTable = ref<InstanceType<typeof BasicTable> | undefined>();
  const evaluateId: EvaluatedIds = {};

  const onFullscreen = async () => {
    await nextTick();
    selectTable.value?.redoHeight();
  };

  function handleOk() {
    if (props.checkFunction(selectItem.value)) {
      emit('success', evaluateId);
    }
  }

  function selectValue(items) {
    selectItem.value = items;
  }
</script>
<script lang="ts">
  export default {
    name: 'HistoryModal',
  };
</script>
