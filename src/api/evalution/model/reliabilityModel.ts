import { ReliabilityInput, ReliabilityOutput } from '/#/baseClass';

export type ReliabilityParam = {
  userId?: string | number;
  equipId?: string | number;
  items: Partial<ReliabilityInput>;
};

export type ReliabilityReponse = ReliabilityOutput;

export interface SaveParam {
  evaluateId: string | undefined;
}
