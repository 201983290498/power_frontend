import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { PageEnum } from '/@/enums/pageEnum';

// 关闭tab
const tabStore = useMultipleTabStore();

export async function closeTab(fullPath: PageEnum, router) {
  // 规定关闭的类型
  await tabStore.closeTabByKey(fullPath, router);
}
