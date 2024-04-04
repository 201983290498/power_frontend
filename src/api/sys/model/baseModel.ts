export interface BaseRespModel<T> {
  code: number;
  message: string;
  data: T;
}
