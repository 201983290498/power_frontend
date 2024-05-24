import { DecisionInput, DecisionOutput, EvaluateId } from '/#/baseClass';

export type DevopsParam = {
  userId?: string | null | number;
  equipId?: string | number;
  stateId?: EvaluateId;
  reliabilityId?: EvaluateId;
  economyId?: EvaluateId;
  items: Partial<DecisionInput>;
};

export type DevopsResponse = DecisionOutput;

export interface SaveParam {
  evaluateId: EvaluateId;
}
