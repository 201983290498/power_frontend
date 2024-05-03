import { DecisionInput, DecisionOutput } from '/#/baseClass';

export type DevopsParam = {
  userId?: string;
  deviceId?: string;
  items: Partial<DecisionInput>;
};

export type DevopsResponse = DecisionOutput;

export interface SaveParam {
  evaluateId: string | undefined;
}
