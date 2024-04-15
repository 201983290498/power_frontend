import { StateInput, StateOutput } from '/#/baseClass';

export type StateParam = Partial<StateInput>;

export type StateReponse = StateOutput;

export type SaveParam = {
  evaluateId: string;
};
