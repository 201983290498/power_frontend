import { StateInput, StateOutput } from '/#/baseClass';

export type StateParam = {
  items: Partial<StateInput>;
  userId?: string;
  deviceId?: string;
};

export type StateReponse = StateOutput;

export interface SaveParam {
  evaluateId: string | undefined;
}
