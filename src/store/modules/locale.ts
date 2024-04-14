// 引入本地化设置和语言类型的类型定义
import type { LocaleSetting, LocaleType } from '/#/config';
// 引入Pinia相关函数
import { defineStore } from 'pinia';
import { store } from '/@/store';
// 引入本地化相关的枚举值，用于定义本地存储中语言设置的键
import { LOCALE_KEY } from '/@/enums/cacheEnum';
// 引入创建本地存储实例的工具函数
import { createLocalStorage } from '/@/utils/cache';
// 引入默认的本地化设置
import { localeSetting } from '/@/settings/localeSetting';
// 创建本地存储实例
const ls = createLocalStorage();
// 尝试从本地存储中获取语言设置，如果不存在，则使用默认设置
const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

// 定义本地化状态的接口
interface LocaleState {
  localInfo: LocaleSetting; // 当前的本地化信息
}
// 定义本地化store
export const useLocaleStore = defineStore({
  id: 'app-locale', // store的唯一标识
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting, // 初始化状态
  }),

  getters: {
    getShowPicker(): boolean {
      // 获取是否显示语言选择器的状态，这通常用于控制应用界面上语言切换选项的显示
      return !!this.localInfo?.showPicker;
    },
    getLocale(): LocaleType {
      // 获取当前设置的语言类型，默认为'zh_CN'（简体中文）
      return this.localInfo?.locale ?? 'zh_CN';
    },
  },
  actions: {
    /**
     * 设置多语言信息并缓存
     * @param info 需要设置的多语言信息，这是一个部分更新，允许只更新部分信息
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      // 更新本地状态信息
      this.localInfo = { ...this.localInfo, ...info };
      // 将新的本地化设置保存到本地存储，以便下次加载时使用
      ls.set(LOCALE_KEY, this.localInfo);
    },
    /**
     * 初始化多语言信息，加载存在的配置从本地缓存
     */
    initLocale() {
      // 将默认设置和当前本地存储中的设置合并，实现初始化
      // 这样可以确保即使部分设置被更新，也能保留其他未被更新的设置
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
});

// 提供一个在setup函数之外使用的locale store的函数
// 这允许在Vue组件的setup函数外部访问和使用这个store
export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
