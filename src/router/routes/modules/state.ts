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
    orderNo: 11,
  },
  children: [
    {
      path: 'index',
      name: 'StateIndexPage',
      component: () => import('../../../views/evaluation/state/main/index.vue'),
      meta: {
        title: t('routes.dashboard.stateEvaluation'),
        icon: 'ion:albums',
        hideMenu: true,
      },
    },
    {
      path: 'evaluate',
      name: 'StateEvaluatePage',
      component: () => import('../../../views/evaluation/state/evaluate/index.vue'),
      meta: {
        title: t('routes.dashboard.stateEvaluationSub'),
        icon: 'ion:albums',
        hideMenu: true,
      },
    },
  ],
};

export default State;
