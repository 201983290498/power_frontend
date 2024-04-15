import { StateInput, StateOutput } from '/#/baseClass';

export type StateParam = Partial<StateInput>;

export type StateReponse = StateOutput;

export interface SaveParam {
  evaluateId: string | undefined;
}
