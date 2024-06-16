<template>
  <PageWrapper
    title="可靠性寿命评估详情页"
    content="请按照步骤完成下列表单的填写，最终会得到相关的可靠性寿命评估结果。"
    contentClass="p-4"
  >
    <Card :bordered="boardered" class="!mb-4">
      <Steps :current="current" class="step-form-form">
        <Steps.Step title="基本信息" />
        <Steps.Step title="经济性寿命预测" />
        <Steps.Step title="评估结果" />
      </Steps>
    </Card>
    <Step1 v-show="current === 0" :device="receiveData.devInfo" :src="receiveData.src" />
    <Step2
      ref="childRef"
      v-show="current === 1"
      v-if="state.initStep2"
      :bordered="boardered"
      :showMode="receiveData.showHistory"
    />
    <Step3
      v-show="current === 2"
      v-if="state.initStep3"
      :bordered="boardered"
      :result="receiveData.results"
      :loading="loading"
    />
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
        运维决策
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
        v-if="current === 0 || (current === 1 && receiveData.hasAnalysis)"
      >
        下一步</a-button
      >
      <a-button
        type="primary"
        class="mr-4"
        color="success"
        @click="evaluate"
        v-if="current === 1 && !receiveData.showHistory"
      >
        提交
      </a-button>
      <a-button type="primary" class="mr-4" color="warning" @click="handleGiveup"> 放弃 </a-button>
    </template>
    <HistoryModal @register="registerModal" :checkFunction="selectCheck" />
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
  import { mapObjectToInterface, economyInputFields } from '/@/utils/listToFiled';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    getEconomyRecordInput,
    saveEconomyRcord,
    economyEvaluation,
  } from '/@/api/evalution/economy';
  import { useRouteParams } from '/@/store/modules/route';
  import { closeTab } from '../../common/common';
  import { useEvaluateStore } from '/@/store/modules/evaluate';
  import { downloadJsonRecord } from '/@/views/dashboard/historyManage/history.data';

  defineOptions({ name: 'EconomyEvaluatePage' });

  const { createMessage, createConfirm } = useMessage();
  const { warning, error, success } = createMessage;
  const evaluateState = useEvaluateStore();
  const currentPage = PageEnum.Economy_Evaluate_Page;
  const params = useRouteParams().getParams;
  const go = useGo();
  const router = useRouter();
  const boardered = ref(false);
  const inputRef = ref(null);
  const childRef = ref(null);
  const loading = ref(true);
  const current = ref(0);
  const [registerModal, { openModal, closeModal }] = useModal();

  const receiveData = reactive({
    devInfo: {},
    src: '',
    equipId: evaluateState.getDeviceInfo?.equipId ?? '-1',
    userId: evaluateState.getUserInfo?.userId ?? '-1',
    hasAnalysis: false,
    results: {},
    formData: {},
    showHistory: false,
    testId: '',
  });

  if (!params.hasOwnProperty('device')) {
    warning('未选择任何设备, 即将返回主页');
    backHome();
  } else {
    // 需要传递device,src, hasAnalysis, results, showHistory
    receiveData.devInfo = params['device']; // 设备信息
    receiveData.src = params['src'] || ''; // 图标路径
    receiveData.hasAnalysis = params['hasAnalysis'] || false; // 是否检测过
    receiveData.results = params['results'] || {}; // 结果
    receiveData.formData = params['formData'] || {}; // 填入的数据
    receiveData.showHistory = params['showHistory'] || false;
    receiveData.testId = params['testId'] || '';
  }

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
    if (current.value === 1 && !receiveData.hasAnalysis) {
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
    current.value === 2 && receiveData.hasAnalysis && warning('显示上次的测评结果！');
    if (current.value === 1) {
      setTimeout(() => {
        childRef.value?.setFormFields(receiveData.formData);
      }, 50);
    }
  }

  async function handleGiveup() {
    current.value = 0;
    receiveData.hasAnalysis = false;
    await closeTab(currentPage, router);
    go(PageEnum.Economy_Main_Page);
  }

  function analysisFile() {
    const inputRefDom = unref(inputRef);
    inputRefDom && inputRefDom.click();
  }

  function downloadRecord() {
    if (receiveData.testId === '') {
      warning('在没有保存记录前无法到处测评结果');
    } else {
      downloadJsonRecord(receiveData.testId);
    }
  }

  function saveRecord() {
    receiveData.hasAnalysis &&
      saveEconomyRcord({ evaluateId: receiveData.results?.evaluateId }).then((resp) => {
        evaluateState.clearRecord();
        receiveData.testId = resp.testId;
        success('测评记录保存成功。');
      });
    !receiveData.hasAnalysis && warning('请先测评！');
  }

  function historyFilledIn() {
    // TODO 传入参数, 设备Id和排序字段, 排序方式
    openModal(true, {
      equipId: receiveData.equipId, // 设备Id
      sortField: 'evaluateTime', // 按照时间
      decending: true, // 降序
      type: 'economy',
    });
  }

  async function evaluate() {
    if (childRef.value !== null) {
      receiveData.formData = await childRef.value.submitData();
      if (receiveData.formData === null) {
        error('存在部分字段未填写, 请先填写完整');
        return;
      }
      const evaluateResult = await economyEvaluation({
        items: receiveData.formData,
        userId: receiveData.userId,
        equipId: receiveData.equipId,
      });
      receiveData.results = evaluateResult;
      receiveData.hasAnalysis = true;
      current.value++;
      current.value === 2 && (state.initStep3 = true);
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    }
  }

  async function goHistory() {
    const routeParam = useRouteParams();
    routeParam.setParams({
      equipId: receiveData.devInfo?.equipId, // 设备Id
      sortField: 'evaluateTime', // 按照时间
      decending: true, // 降序
      type: 'economy', // 状态评估
    });
    go(PageEnum.HistoryManage_Page);
  }

  async function goReliability() {
    await closeTab(currentPage, router);
    await closeTab(PageEnum.Economy_Main_Page, router);
    go(PageEnum.Devops_Main_Page);
  }

  async function chooseSuccess(evaluateId: string) {
    closeModal();
    receiveData.formData = await getEconomyRecordInput({ evaluateId });
    childRef.value?.setFormFields(receiveData.formData);
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
      let result: any = mapObjectToInterface(
        dataList[0],
        JSON.parse(JSON.stringify(economyInputFields)),
      );
      childRef.value !== null && childRef.value.setFormFields(result);
      receiveData.formData = result;
    }
  }

  async function backHome() {
    closeTab(PageEnum.Economy_Evaluate_Page, router);
    go(PageEnum.Economy_Main_Page);
  }

  function selectCheck(items) {
    const itemList = [...items];
    if (items.size > 1 || itemList[0]['economyId'] === -1) {
      warning('请选择一条该设备的历史经济性评估数据作为导入！');
      return false;
    } else {
      chooseSuccess(itemList[0]['economyId']);
      return true;
    }
  }
</script>
<script lang="ts">
  export default {
    name: 'EconomyEvaluatePage',
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
