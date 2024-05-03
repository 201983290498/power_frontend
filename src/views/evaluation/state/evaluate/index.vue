<template>
  <PageWrapper
    title="设备状态评估详情页"
    content="请按照步骤完成下列表单的填写，最终会得到相关的状态测评结果。"
    contentClass="p-4"
    @back="handleStepPrev"
  >
    <Card :bordered="boardered" class="!mb-4">
      <Steps :current="current" class="step-form-form">
        <Steps.Step title="基本信息" />
        <Steps.Step title="状态评估" />
        <Steps.Step title="评估结果" />
      </Steps>
    </Card>
    <Step1 v-if="src !== undefined" v-show="current === 0" :device="devInfo" :src="src" />
    <Step2 ref="childRef" v-show="current === 1" v-if="state.initStep2" :bordered="boardered" />
    <Step3 v-show="current === 2" v-if="state.initStep3" :bordered="boardered" />
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
      <a-button type="primary" class="mr-4" @click="handleStepPrev"> 上一步 </a-button>
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
        @click="handleStepNext"
        v-if="current === 0 || (current === 1 && hasAnalysis)"
      >
        下一步</a-button
      >
      <a-button type="primary" class="mr-4" color="success" @click="evaluate" v-if="current === 1">
        提交
      </a-button>
      <a-button type="primary" class="mr-4" color="warning" @click="handleGiveup"> 放弃 </a-button>
    </template>
    <HistoryModal @register="registerModal" @success="chooseSuccess" />
    <input
      ref="inputRef"
      type="file"
      v-show="false"
      accept=".xlsx, .xls, .csv"
      @change="handleInputClick"
    />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref, reactive, unref } from 'vue';
  import Step1 from './Step1.vue';
  import Step2 from './Step2.vue';
  import Step3 from './Step3.vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card } from 'ant-design-vue';
  import { Steps } from 'ant-design-vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRouter } from 'vue-router';
  import HistoryModal from '../../common/HistoryModal.vue';
  import { useModal } from '/@/components/Modal';
  import { readCsv } from '../../common/xlsx';
  import { mapObjectToInterface, stateInputFields } from '/@/utils/listToFiled';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getStateRecordInput, saveStateRcord, stateEvaluation } from '/@/api/evalution/state';
  import { useRouteParams } from '/@/store/modules/route';
  import { closeTab } from '../../common/common';

  const deviceId = '-1';
  const userId = '-1';

  const go = useGo();
  const router = useRouter();
  const routeParams = useRouteParams();
  const { createMessage, createConfirm } = useMessage();
  const { warning, error } = createMessage;
  const devInfo = routeParams.params.device;
  const src = routeParams.params.src;
  const currentPage = PageEnum.State_Evaluate_Page;

  if (!routeParams.params.hasOwnProperty('device')) {
    warning('为选择任何设备, 即将返回主页');
    closeTab(PageEnum.State_Evaluate_Page, router);
    go(PageEnum.State_Main_Page);
  }

  const boardered = ref(false);
  const inputRef = ref(null);
  const childRef = ref(null);
  let hasAnalysis = false; // 是否已经提交了

  const results = ref();
  defineOptions({ name: 'StateEvaluatePage' });
  const current = ref(0);
  const [registerModal, { openModal }] = useModal();

  const state = reactive({
    initStep2: false,
    initStep3: false,
  });

  async function handleStepPrev() {
    current.value--;
    if (current.value === -1) {
      await closeTab(currentPage, router);
      go(PageEnum.State_Main_Page);
    }
  }

  function handleStepNext() {
    // 判断是否是否已经提交了
    if (current.value === 1 && !hasAnalysis) {
      createConfirm({
        iconType: 'error',
        title: 'tips',
        content: '请先提交数据进行测评。',
      });
      return;
    }
    current.value++;
    current.value === 1 && (state.initStep2 = true);
    current.value === 2 && (state.initStep3 = true);
    current.value === 2 && hasAnalysis && warning('显示上次的测评结果！');
  }

  async function handleGiveup() {
    // 放弃按钮，返回测试主页
    current.value = 0;
    hasAnalysis = false;
    await closeTab(currentPage, router);
    go(PageEnum.State_Main_Page);
  }

  function analysisFile() {
    const inputRefDom = unref(inputRef);
    inputRefDom && inputRefDom.click();
  }

  function downloadRecord() {
    // TODO downloadRecord
  }

  function saveRecord() {
    hasAnalysis && saveStateRcord({ evaluateId: results.value?.evaluateId });
    !hasAnalysis && warning('请先测评！');
  }

  function historyFilledIn() {
    // TODO 传入参数, 设备Id和排序字段, 排序方式
    openModal(true, {
      equipId: '1', // 设备Id
      sortField: 'createTime', // 按照时间
      decending: true, // 降序
      searched: true, // 是否排序
    });
  }

  async function evaluate() {
    if (childRef.value !== null) {
      const formData = await childRef.value.submitData();
      if (formData === null) {
        error('存在部分字段未填写, 请先填写完整');
        return;
      }
      const evaluateResult = await stateEvaluation({ items: formData, userId, deviceId });
      results.value = evaluateResult;
      hasAnalysis = true;
      current.value++;
      current.value === 2 && (state.initStep3 = true);
    }
  }

  async function goHistory() {
    go(PageEnum.HistoryManage_Page);
  }

  async function goReliability() {
    await closeTab(currentPage, router);
    await closeTab(PageEnum.State_Main_Page, router);
    go(PageEnum.Reliability_Main_Page);
  }

  async function chooseSuccess(evaluateId: string) {
    const formData = await getStateRecordInput({ evaluateId });
    childRef.value?.setFormFields(formData);
  }

  async function handleInputClick(e: Event) {
    const files = e && (e.target as HTMLInputElement).files;
    const rawFile = files && files[0]; // only setting files[0]
    if (!rawFile) return;
    const inputRefDom = unref(inputRef);
    if (inputRefDom) {
      // fix can't select the same excel
      inputRefDom.value = '';
    }
    const dataList = await readCsv(rawFile);
    if (typeof dataList[0] === 'object') {
      const result = mapObjectToInterface(
        dataList[0],
        JSON.parse(JSON.stringify(stateInputFields)),
      );
      childRef.value !== null && childRef.value.setFormFields(result);
    }
  }
</script>
<script lang="ts">
  export default {
    name: 'StateEvaluatePage',
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
