import { defineStore } from 'pinia';

interface RouteParams {
  params: Object;
}

export const useRouteParams = defineStore({
  id: 'route-params',
  state: (): RouteParams => ({ params: {} }),
  actions: {
    setParams(params: Object): void {
      this.params = params;
    },
  },
});
