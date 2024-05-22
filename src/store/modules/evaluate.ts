import { defineStore } from 'pinia';
import { Device, EvaluateId, User } from '/#/baseClass';
import { deviceDemo, EvaluatedIds } from '/@/views/evaluation/common/data';
import { useMessage } from '/@/hooks/web/useMessage';
import { EvaluateStatusEnum } from '/@/enums/evaluateEnum';
import logo from '/@/assets/images/1.jpg';

const { createConfirm } = useMessage();
const ttl: number = 600 * 1000;
interface EvaluateStore {
  ids: EvaluatedIds;
  userInfo: Partial<User> | null;
  deviceInfo: Partial<Device> | null;
  deviceImage: any;
  expiryTime: number; // 毫秒
}
export const useEvaluateStore = defineStore({
  id: 'evaluateStore',
  state: (): EvaluateStore => ({
    ids: {
      stateId: null,
      economicId: null,
      reliabilityId: null,
      devopsId: null,
    },
    userInfo: null,
    deviceInfo: null,
    deviceImage: null,
    expiryTime: Date.now(),
  }),
  getters: {
    getStateId(): EvaluateId {
      return this.ids?.stateId ?? -1;
    },
    getEconomicId(): EvaluateId {
      return this.ids?.economicId ?? -1;
    },
    getReliabilityId(): EvaluateId {
      return this.ids?.reliabilityId ?? -1;
    },
    getDevopsId(): EvaluateId {
      return this.ids?.devopsId ?? -1;
    },
    getUserInfo(): Partial<User> | null {
      return this.userInfo;
    },
    getDeviceInfo(): Partial<Device> | null {
      if (Date.now() > this.expiryTime) {
        return null;
      }
      return this.deviceInfo ?? deviceDemo;
    },
    getEvaluateIds(): EvaluateId[] {
      const ids: EvaluateId[] = [-1, -1, -1, -1];
      this.ids.stateId && (ids[0] = this.ids.stateId);
      this.ids.economicId && (ids[1] = this.ids.economicId);
      this.ids.reliabilityId && (ids[2] = this.ids.reliabilityId);
      this.ids.devopsId && (ids[3] = this.ids.devopsId);
      return ids;
    },
    getDeviceImage(): any {
      return this.deviceImage ?? logo;
    },
  },
  actions: {
    setStateId(stateId: EvaluateId) {
      this.ids.stateId = stateId;
    },
    setEconomicId(economicId: EvaluateId) {
      this.ids.economicId = economicId;
    },
    setReliabilityId(reliabilityId: EvaluateId) {
      this.ids.reliabilityId = reliabilityId;
    },
    setDevopsId(devopsId: EvaluateId) {
      this.ids.devopsId = devopsId;
    },
    setUserInfo(userId: Partial<User>) {
      this.userInfo = userId;
    },
    setDeviceInfo(deviceId: Partial<Device>) {
      this.expiryTime = Date.now() + ttl;
      this.deviceInfo = deviceId;
    },
    setDeviceImage(image: any) {
      this.deviceImage = image;
    },
    checkContinue(status: EvaluateStatusEnum) {
      const ids = this.getEvaluateIds;
      switch (status) {
        case EvaluateStatusEnum.State:
          break;
        case EvaluateStatusEnum.Reliability:
          if (ids[1] === -1) {
            createConfirm({
              iconType: 'warning',
              title: '提示',
              content: '您已经跳过状态评估测试。',
            });
          }
          break;
        case EvaluateStatusEnum.Economy:
          if (ids[0] === -1 || ids[1] === -1) {
            createConfirm({
              iconType: 'warning',
              title: '提示',
              content: '请选择本次测评依赖的状态评估测试和可靠性评估测试。',
            });
          }
          break;
        case EvaluateStatusEnum.Devops:
          if (ids[2] === -1 || ids[1] === -1 || ids[0] === -1) {
            createConfirm({
              iconType: 'warning',
              title: '提示',
              content: '请选择本次测评依赖的状态评估测试、可靠性评估测评和经济型测评。',
            });
            console.log(ids);
            return false;
          }
          break;
        case EvaluateStatusEnum.Others:
          break;
      }
      return true;
    },
    clearRecord() {
      this.ids = {
        stateId: null,
        economicId: null,
        reliabilityId: null,
        devopsId: null,
      };
    },
  },
});
