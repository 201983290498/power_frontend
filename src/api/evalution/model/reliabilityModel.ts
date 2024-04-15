import { ReliabilityInput, ReliabilityOutput } from '/#/baseClass';

export type ReliabilityParam = {
  userId?: string;
  deviceId?: string;
  items: Partial<ReliabilityInput>;
};

export type ReliabilityReponse = ReliabilityOutput;

export interface SaveParam {
  evaluateId: string | undefined;
}
