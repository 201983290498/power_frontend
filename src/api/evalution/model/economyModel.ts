import { EconomyInput, EconomyOutput } from '/#/baseClass';

export type EconomyParam = {
  userId?: string;
  deviceId?: string;
  items: Partial<EconomyInput>;
};

export type EconomyReponse = EconomyOutput;

export interface SaveParam {
  evaluateId: string | undefined;
}
