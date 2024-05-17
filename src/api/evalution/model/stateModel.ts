import { StateInput, StateOutput } from '/#/baseClass';

export type StateParam = {
  items: Partial<StateInput>;
  userId?: string | number;
  equipId?: string | number;
};

export type StateReponse = StateOutput;

export interface SaveParam {
  evaluateId: string | undefined;
}
