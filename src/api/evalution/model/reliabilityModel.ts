import { ReliabilityInput, ReliabilityOutput } from '/#/baseClass';

export type ReliabilityParam = Partial<ReliabilityInput>;

export type ReliabilityReponse = ReliabilityOutput;

export interface SaveParam {
  evaluateId: string | undefined;
}
