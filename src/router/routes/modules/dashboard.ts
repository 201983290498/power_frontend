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
      path: 'userManage',
      name: 'UserManage',
      component: () => import('/@/views/dashboard/userManage/index.vue'),
      meta: {
        title: t('routes.dashboard.userManage'),
        orderNo: 1,
      },
    },
    {
      path: 'deviceManage',
      name: 'deviceManage',
      component: () => import('/@/views/dashboard/deviceManage/index.vue'),
      meta: {
        title: t('routes.dashboard.deviceManage'),
        orderNo: 2,
      },
    },
    {
      path: 'deviceInfoManage',
      name: 'deviceInfoManage',
      component: () => import('/@/views/dashboard/deviceInfoManage/index.vue'),
      meta: {
        title: t('routes.dashboard.deviceInfoManage'),
        orderNo: 3,
      },
    },
    {
      path: 'historyManage',
      name: 'historyManage',
      component: () => import('/@/views/dashboard/historyManage/index.vue'),
      meta: {
        title: t('routes.dashboard.historyManage'),
        orderNo: 4,
      },
    },
    {
      path: 'databaseManage',
      name: 'databaseManage',
      component: () => import('/@/views/dashboard/databaseManage/index.vue'),
      meta: {
        title: t('routes.dashboard.databaseManage'),
        orderNo: 5,
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashboard.workbench'),
        orderNo: 6,
      },
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/dashboard/analysis/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.analysis'),
        orderNo: 7,
      },
    },
  ],
};

export default dashboard;
