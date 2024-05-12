import { ReliabilityInput, ReliabilityOutput } from '/#/baseClass';

export type ReliabilityParam = {
  userId?: string;
  equipId?: string;
  items: Partial<ReliabilityInput>;
};

export type ReliabilityReponse = ReliabilityOutput;

export interface SaveParam {
  evaluateId: string | undefined;
}
