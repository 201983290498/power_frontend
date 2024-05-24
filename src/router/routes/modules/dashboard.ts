import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/dashboard/analysis/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.analysis'),
      },
    },
    {
      path: 'userManage',
      name: 'UserManage',
      component: () => import('/@/views/dashboard/userManage/index.vue'),
      meta: {
        title: t('routes.dashboard.userManage'),
      },
    },
    {
      path: 'deviceManage',
      name: 'deviceManage',
      component: () => import('/@/views/dashboard/deviceManage/index.vue'),
      meta: {
        title: t('routes.dashboard.deviceManage'),
      },
    },
    {
      path: 'historyManage',
      name: 'historyManage',
      component: () => import('/@/views/dashboard/historyManage/index.vue'),
      meta: {
        title: t('routes.dashboard.historyManage'),
      },
    },
  ],
};

export default dashboard;
