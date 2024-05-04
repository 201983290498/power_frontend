<template>
  <PageWrapper title="变压器经济性寿命预测主页">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          对设备进行经济性寿命评估。<strong style="color: dodgerblue">请选选择设备。</strong><br />
          为了得到最终的测试结果，用户需要依次对设备进行状态评估，可靠性寿命评估，<strong
            style="color: dodgerblue"
            >可靠性经济评估</strong
          >，最终获取运维决策的信息。
        </span>
      </div>
    </template>
    <DeviceManagement @chooseDevice="selectDevice" :re-size="false" :max-height="maxHeight" />
    <Card class="!mt-1">
      <template #title> 依赖测评 </template>
      <template #extra>
        <a-button type="primary" @click="chooseEvaluationRecord"> 选择测评记录 </a-button>
      </template>
      <Form :model="formData" :label-col="{ span: 4 }" :wrapper-col="{ span: 6 }">
        <FormItem
          label="状态评估结果数据选择"
          :colon="false"
          :rules="[{ required: true, message: '请点击右上角选择状态评估结果数据!' }]"
        >
          <Input :value="formData.stateId" :disabled="true" placeholder="请选择状态测评的ID" />
        </FormItem>
        <FormItem
          label="可靠性寿命评估数据选择"
          :colon="false"
          :rules="[{ required: true, message: '请点击右上角选择可靠性寿命评估测试!' }]"
        >
          <Input
            :value="formData.reliabilityId"
            placeholder="请选择可靠性寿命评估测试的ID"
            :disabled="true"
          />
        </FormItem>
      </Form>
    </Card>
    <DeviceInfo
      :src="logo"
      :buttonTexts="btnTexts"
      @next="goEvaluation"
      @history="goHistory"
      :device="deviceInfo"
      v-if="showDetail"
    />
    <HistoryModal @register="registerModal" @success="chooseSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import DeviceManagement from '/@/views/dashboard/deviceManage/index.vue';
  import DeviceInfo from '../../common/DeviceInfo.vue';
  import { deviceDemo } from '../../common/data';
  import logo from '/@/assets/images/1.jpg';
  import { ref, Ref } from 'vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRouteParams } from '/@/store/modules/route';
  import { Card, FormItem, Input, Form } from 'ant-design-vue';
  import { reactive } from 'vue';
  import { EvaluatedIds } from '../../common/data';
  import HistoryModal from '../../common/HistoryModal.vue';
  import { useModal } from '/@/components/Modal';

  const routeParam = useRouteParams();
  const formData = reactive<EvaluatedIds>({
    stateId: '',
    reliabilityId: '',
  });
  const [registerModal, { openModal }] = useModal();
  const go = useGo();
  const btnTexts = ref<Array<string>>(['经济性寿命预测', '历史评估结果']);
  const deviceInfo = ref(deviceDemo);
  const maxHeight: Ref<number | string> = ref(-1);
  const showDetail = ref(true);

  function selectDevice(device) {
    deviceInfo.value = device;
    showDetail.value = true;
    maxHeight.value = 200;
    // 渲染详细信息
  }

  function goEvaluation() {
    routeParam.setParams({ src: logo, device: deviceInfo.value });
    go(PageEnum.Economy_Evaluate_Page);
  }

  function goHistory() {
    go(PageEnum.HistoryManage_Page);
  }

  function chooseEvaluationRecord() {
    // TODO
    openModal(true, {
      equipId: '1', // 设备Id
      sortField: 'createTime', // 按照时间
      decending: true, // 降序
      searched: true, // 是否排序
    });
  }

  async function chooseSuccess(selectID: EvaluatedIds) {
    formData.stateId = selectID.stateId;
    formData.reliabilityId = selectID.reliabilityId;
    console.log('选择成功', selectID);
  }
</script>
