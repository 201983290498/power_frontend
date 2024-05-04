import { defineStore } from 'pinia';
import { Device, EvaluateId, User } from '/#/baseClass';
import { EvaluatedIds } from '/@/views/evaluation/common/data';

interface EvaluateStore {
  ids: EvaluatedIds;
  userInfo: Partial<User> | null;
  deviceInfo: Partial<Device> | null;
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
  }),
  getters: {
    getStateId(): EvaluateId {
      return this.ids?.stateId;
    },
    getEconomicId(): EvaluateId {
      return this.ids?.economicId;
    },
    getReliabilityId(): EvaluateId {
      return this.ids?.reliabilityId;
    },
    getDevopsId(): EvaluateId {
      return this.ids?.devopsId;
    },
    getUserInfo(): Partial<User> | null {
      return this.userInfo;
    },
    getDeviceInfo(): Partial<Device> | null {
      return this.deviceInfo;
    },
    getEvaluateIds(): EvaluateId[] {
      const ids: EvaluateId[] = [-1, -1, -1, -1];
      this.ids.stateId && (ids[0] = this.ids.stateId);
      this.ids.economicId && (ids[1] = this.ids.economicId);
      this.ids.reliabilityId && (ids[2] = this.ids.reliabilityId);
      this.ids.devopsId && (ids[3] = this.ids.devopsId);
      return ids;
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
      this.deviceInfo = deviceId;
    },
  },
});
