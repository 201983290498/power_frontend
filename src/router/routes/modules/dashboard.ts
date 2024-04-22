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
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashboard.workbench'),
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
    {
      path: 'databaseManage',
      name: 'databaseManage',
      component: () => import('/@/views/dashboard/databaseManage/index.vue'),
      meta: {
        title: t('routes.dashboard.databaseManage'),
      },
    },
    {
      path: 'deviceInfoManage',
      name: 'deviceInfoManage',
      component: () => import('/@/views/dashboard/deviceInfoManage/index.vue'),
      meta: {
        title: t('routes.dashboard.deviceInfoManage'),
      },
    },
  ],
};

export default dashboard;
