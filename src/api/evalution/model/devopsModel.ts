import { DecisionInput, DecisionOutput, EvaluateId } from '/#/baseClass';

export type DevopsParam = {
  userId?: string | null | number;
  deviceId?: string;
  items: Partial<DecisionInput>;
};

export type DevopsResponse = DecisionOutput;

export interface SaveParam {
  evaluateId: EvaluateId;
}
