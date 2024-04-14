// 引入错误日志信息的类型定义
import type { ErrorLogInfo } from '/#/store';

// 引入Pinia相关函数
import { defineStore } from 'pinia';
import { store } from '/@/store';

// 引入日期格式化工具函数
import { formatToDateTime } from '/@/utils/dateUtil';
// 引入项目设置
import projectSetting from '/@/settings/projectSetting';

// 引入错误类型枚举
import { ErrorTypeEnum } from '/@/enums/exceptionEnum';

// 定义错误日志状态的接口
export interface ErrorLogState {
  errorLogInfoList: Nullable<ErrorLogInfo[]>; // 错误日志信息列表，可能为空
  errorLogListCount: number; // 错误日志数量
}

// 定义错误日志store
export const useErrorLogStore = defineStore({
  id: 'app-error-log', // store的唯一标识
  state: (): ErrorLogState => ({
    // 初始化状态
    errorLogInfoList: null,
    errorLogListCount: 0,
  }),
  getters: {
    // 定义状态的getter方法
    getErrorLogInfoList(): ErrorLogInfo[] {
      return this.errorLogInfoList || [];
    },
    getErrorLogListCount(): number {
      return this.errorLogListCount;
    },
  },
  actions: {
    // 定义修改状态的方法
    // 添加错误日志信息
    addErrorLogInfo(info: ErrorLogInfo) {
      const item = {
        ...info,
        time: formatToDateTime(new Date()), // 记录错误发生的时间
      };
      this.errorLogInfoList = [item, ...(this.errorLogInfoList || [])]; // 将新的错误信息添加到列表前部
      this.errorLogListCount += 1; // 错误计数增加
    },

    // 设置错误日志列表的计数
    setErrorLogListCount(count: number): void {
      this.errorLogListCount = count;
    },

    /**
     * 在AJAX请求错误后触发
     * @param error 错误对象
     * @returns
     */
    addAjaxErrorInfo(error) {
      const { useErrorHandle } = projectSetting; // 从项目设置中获取是否使用错误处理的配置
      if (!useErrorHandle) {
        return; // 如果不使用错误处理，则直接返回
      }
      const errInfo: Partial<ErrorLogInfo> = {
        message: error.message,
        type: ErrorTypeEnum.AJAX, // 指定错误类型为AJAX
      };
      if (error.response) {
        const {
          config: { url = '', data: params = '', method = 'get', headers = {} } = {},
          data = {},
        } = error.response;
        errInfo.url = url; // 记录请求URL
        errInfo.name = 'Ajax Error!';
        errInfo.file = '-'; // 文件位置不适用于AJAX错误，故置为'-'
        errInfo.stack = JSON.stringify(data); // 将错误的响应数据转为字符串
        errInfo.detail = JSON.stringify({ params, method, headers }); // 记录请求的详细信息
      }
      this.addErrorLogInfo(errInfo as ErrorLogInfo); // 将错误信息添加到日志中
    },
  },
});

// 提供一个在setup之外使用的错误日志store的函数
export function useErrorLogStoreWithOut() {
  return useErrorLogStore(store);
}
