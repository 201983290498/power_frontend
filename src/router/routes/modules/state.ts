import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const State: AppRouteModule = {
  path: '/state',
  name: 'State',
  component: LAYOUT,
  redirect: '/state/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ion:albums',
    title: t('routes.dashboard.stateEvaluation'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'StatePage',
      component: () => import('/@/views/evaluation/state/index.vue'),
      meta: {
        title: t('routes.dashboard.stateEvaluation'),
        icon: 'ion:albums',
        hideMenu: true,
      },
    },
  ],
};

export default State;
