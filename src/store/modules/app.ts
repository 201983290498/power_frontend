// 引入类型定义
import type {
  ProjectConfig,
  HeaderSetting,
  MenuSetting,
  TransitionSetting,
  MultiTabsSetting,
} from '/#/config';
import type { BeforeMiniState } from '/#/store';

// 引入pinia库的defineStore方法用于定义一个store
import { defineStore } from 'pinia';
// 引入store实例
import { store } from '/@/store';

// 引入枚举类型，用于主题设置
import { ThemeEnum } from '/@/enums/appEnum';
// 引入缓存键名枚举
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '/@/enums/cacheEnum';
// 引入持久化存储工具
import { Persistent } from '/@/utils/cache/persistent';
// 引入默认暗黑模式设置
import { darkMode } from '/@/settings/designSetting';
// 引入路由重置方法
import { resetRouter } from '/@/router';
// 引入深合并工具方法
import { deepMerge } from '/@/utils';

// 定义应用状态接口
interface AppState {
  darkMode?: ThemeEnum; // 主题模式
  pageLoading: boolean; // 页面加载状态
  projectConfig: ProjectConfig | null; // 项目配置对象
  beforeMiniInfo: BeforeMiniState; // 缩小窗口前的状态信息
}

// 定义一个定时器的句柄，用于页面加载状态的延迟处理
let timeId: TimeoutHandle;

// 定义应用状态管理store
export const useAppStore = defineStore({
  id: 'app', // store的唯一标识
  state: (): AppState => ({
    // 初始化状态
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY), // 从本地存储获取项目配置
    beforeMiniInfo: {},
  }),
  getters: {
    // 定义状态的getter方法
    // 获取页面加载状态
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    // 获取当前的主题模式
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
    },
    // 获取窗口缩小前的状态信息
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },
    // 获取项目配置
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    // 获取头部设置
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    // 获取菜单设置
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    // 获取页面过渡效果设置
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
    // 获取多标签设置
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    },
  },
  actions: {
    // 定义修改状态的方法
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY_, mode); // 更新本地存储的主题模式
    },

    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config); // 深合并项目配置
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig); // 更新本地存储的项目配置
    },

    async resetAllState() {
      resetRouter(); // 重置路由
      Persistent.clearAll(); // 清除所有本地存储
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId); // 清除定时器
        // 设置延迟以防止加载状态的闪烁
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// 提供一个在setup之外使用的app store的函数
export function useAppStoreWithOut() {
  return useAppStore(store);
}
