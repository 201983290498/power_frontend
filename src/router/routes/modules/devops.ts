import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const Devops: AppRouteModule = {
  path: '/devops',
  name: 'Devops',
  component: LAYOUT,
  redirect: '/devops/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ion:heart',
    title: t('routes.dashboard.devops'),
    orderNo: 14,
  },
  children: [
    {
      path: 'index',
      name: 'DevopsPage',
      component: () => import('/@/views/evaluation/devops/index.vue'),
      meta: {
        title: t('routes.dashboard.devops'),
        icon: 'ion:heart',
        hideMenu: true,
      },
    },
  ],
};

export default Devops;
