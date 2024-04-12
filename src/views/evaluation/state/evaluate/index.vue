<template>
  <PageWrapper
    title="设备状态评估详情页"
    content="请按照步骤完成下列表单的填写，最终会得到相关的状态测评结果。"
    contentClass="p-4"
  >
    <Card :bordered="false">
      <Steps :current="current" class="step-form-form">
        <Steps.Step title="基本信息" />
        <Steps.Step title="状态评估" />
        <Steps.Step title="评估结果" />
      </Steps>
    </Card>
    <Card :bordered="false" class="!mt-5">
      <Step1 @next="handleStepNext" v-show="current === 0" />
      <Step2
        @prev="handleStepPrev"
        @next="handleStepNext"
        v-show="current === 1"
        v-if="state.initStep2"
      />
      <Step3 v-show="current === 2" @redo="handleGiveup" v-if="state.initStep3" />
    </Card>
    <template #rightFooter>
      <a-button ghost type="primary" class="mr-4" @click="analysisFile" v-if="current === 1">
        数据导入
      </a-button>
      <a-button ghost type="primary" class="mr-4" @click="historyFilledIn" v-if="current === 1">
        历史数据填充</a-button
      >
      <a-button ghost type="primary" class="mr-4" @click="goHistory" v-if="current === 2">
        历史评估结果
      </a-button>
      <a-button ghost type="primary" class="mr-4" @click="goReliability" v-if="current === 2">
        可靠性寿命预测
      </a-button>
      <a-button ghost type="primary" class="mr-4" @click="downloadRecord" v-if="current === 2">
        导出
      </a-button>
      <a-button type="primary" class="mr-4" color="primary" @click="handleStepPrev">
        上一步
      </a-button>
      <a-button
        type="primary"
        color="success"
        class="mr-4"
        @click="saveRecord"
        v-if="current === 2"
      >
        保存
      </a-button>
      <a-button
        type="primary"
        class="mr-4"
        color="success"
        @click="handleStepNext"
        v-if="current === 0 || current === 1"
      >
        下一步</a-button
      >
      <a-button type="primary" class="mr-4" color="warning" @click="handleGiveup"> 放弃 </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import Step1 from './Step1.vue';
  import Step2 from './Step2.vue';
  import Step3 from './Step3.vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card } from 'ant-design-vue';
  import { Steps } from 'ant-design-vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRoute, useRouter } from 'vue-router';
  import { useMultipleTabStore } from '/@/store/modules/multipleTab';

  const go = useGo();
  const route = useRoute();
  const router = useRouter();
  const tabStore = useMultipleTabStore();

  defineOptions({ name: 'FormStepPage' });

  const current = ref(0);

  const state = reactive({
    initStep2: false,
    initStep3: false,
  });

  async function closeTab() {
    const fullPath = route.fullPath;
    await tabStore.closeTabByKey(fullPath, router);
  }

  function handleStepPrev() {
    current.value--;
    if (current.value === -1) {
      console.log(PageEnum.State_Main_Page);
      go(PageEnum.State_Main_Page);
      closeTab();
    }
  }

  function handleStepNext() {
    current.value++;
    current.value === 1 && (state.initStep2 = true);
    current.value === 2 && (state.initStep3 = true);
  }

  function handleGiveup() {
    // TODO 放弃 需要发送删除的请求
    current.value = 0;
    go(PageEnum.State_Main_Page);
    closeTab();
  }

  function analysisFile() {
    // TODO uploadFiles
  }

  function downloadRecord() {
    // TODO downloadRecord
  }

  function saveRecord() {
    // TODO saveRecord
  }

  function historyFilledIn() {
    // TODO historyFilledIn
  }

  function goHistory() {
    go(PageEnum.HistoryManage_Page);
    closeTab();
  }

  function goReliability() {
    go(PageEnum.Reliability_Main_Page);
    closeTab();
  }
</script>
<script lang="ts">
  export default {
    name: 'FormStepPage',
  };
</script>
<style lang="less" scoped>
  .step-form-content {
    padding: 24px;
    background-color: @component-background;
  }

  .step-form-form {
    width: 750px;
    margin: 0 auto;
  }
</style>
