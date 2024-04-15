import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const Economy: AppRouteModule = {
  path: '/economy',
  name: 'Economy',
  component: LAYOUT,
  redirect: '/economy/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ion:airplane',
    title: t('routes.dashboard.economyPrediction'),
    orderNo: 13,
  },
  children: [
    {
      path: 'index',
      name: 'EconomyPage',
      component: () => import('../../../views/evaluation/economy/main/index.vue'),
      meta: {
        title: t('routes.dashboard.economyPrediction'),
        icon: 'ion:airplane',
        hideMenu: true,
      },
    },
    {
      path: 'evaluate',
      name: 'EconomyEvaluatePage',
      component: () => import('../../../views/evaluation/economy/evaluate/index.vue'),
      meta: {
        title: t('routes.dashboard.economyPredictionSub'),
        icon: 'ion:airplane',
        hideMenu: true,
      },
    },
  ],
};

export default Economy;
