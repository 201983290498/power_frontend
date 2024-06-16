<template>
  <div class="flex-auto xl:flex">
    <!-- 卡片 -->
    <template v-for="(item, index) in gridList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="w-full !<xl:mt-2 !xl:mt-4"
        :class="[index + 1 < 4 && '!md:mr-4']"
        :canExpan="false"
        headStyle="font-size: 24px; font-weight: 700; color: #fff; bodder: 0px;"
        :style="{ background: item.bgcolor + 'f0', color: '#fff'}"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <!-- 金钱和图片 -->
        <div class="py-4 px-4 flex justify-between">
          <CountTo prefix="" :startVal="1" :endVal="item.value" class="text-6xl font-bold mt-2 mb-2 ml-2" />
          <Icon :icon="item.icon" :size="60" />
        </div>
        <!-- 总共多少 -->
        <div class="px-4 flex justify-between text-lg font-bold">
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
  import { getEvaluateAnalysis } from '/@/api/sys/device';

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
