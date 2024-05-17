import { defineStore } from 'pinia';

interface RouteParams {
  params: { [key: string]: any };
  expire: number; // 过期时间
}

export const useRouteParams = defineStore({
  id: 'route-params',
  state: (): RouteParams => ({ params: {}, expire: 1 }),
  getters: {
    getParams(): Object {
      if (this.expire < 0) return {};
      else return this.params;
    },
  },
  actions: {
    setParams(params: Object): void {
      this.expire = 1;
      this.params = params;
    },
    expireParams(): void {
      this.expire = this.expire - 1;
    },
  },
});
