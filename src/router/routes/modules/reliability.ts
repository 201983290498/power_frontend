import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const reliability: AppRouteModule = {
  path: '/reliability',
  name: 'Reliability',
  component: LAYOUT,
  redirect: '/reliability/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ion:home',
    title: t('routes.dashboard.reliability'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'ReliabilityPage',
      component: () => import('/@/views/evaluation/reliability/index.vue'),
      meta: {
        title: t('routes.dashboard.reliability'),
        icon: 'ion:home',
        hideMenu: true,
      },
    },
  ],
};

export default reliability;
