<template>
  <div class="md:flex">
    <!-- 卡片 -->
    <template v-for="(item, index) in gridList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0 !mt-4"
        :class="[index + 1 < 4 && '!md:mr-4']"
        :canExpan="false"
        headStyle="font-size: 20px"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <!-- 金钱和图片 -->
        <div class="py-4 px-4 flex justify-between">
          <CountTo prefix="" :startVal="1" :endVal="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" />
        </div>
        <!-- 总共多少 -->
        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}数</span>
          <CountTo prefix="" :startVal="1" :endVal="item.total" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { Tag, Card } from 'ant-design-vue';
  import { CountTo } from '/@/components/CountTo/index';
  import { Icon } from '/@/components/Icon';
  import { growCardList } from '../data';
  import { ref } from 'vue';
  import { getDeviceList, getEvaluateAnalysis } from '/@/api/sys/device';
  import { getHistoryList } from '/@/api/sys/history';
  import { getUserList } from '/@/api/sys/Euser';

  defineOptions({
    name: 'GrowGrid',
  });
  const gridList = ref(growCardList);
  getTotalInfo();
  async function getTotalInfo() {
    const result = await getEvaluateAnalysis({});
    gridList.value[0].total = result.equip;
    gridList.value[0].value = result.equip;
    gridList.value[1].total = result.evaluate;
    gridList.value[1].value = result.evaluate;
    gridList.value[2].total = result.abnormal;
    gridList.value[2].value = result.abnormal;
    gridList.value[3].total = result.user;
    gridList.value[3].value = result.user;
  }
  defineProps({
    loading: {
      type: Boolean,
    },
  });
</script>
<script lang="ts">
  export default {
    name: 'GrowGrid',
  };
</script>
