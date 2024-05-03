import { defineStore } from 'pinia';

interface RouteParams {
  params: Object;
}

export const useRouteParams = defineStore({
  id: 'route-params',
  state: (): RouteParams => ({ params: {} }),
  getters: {
    getParams(): Object {
      return this.params;
    },
  },
  actions: {
    setParams(params: Object): void {
      this.params = params;
    },
  },
});
