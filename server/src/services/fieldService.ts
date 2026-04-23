import { FieldStage, FieldStatus } from '../types/field.js';

export const calculateFieldStatus = (stage: string, updatedAt: Date): string => {
  if (stage === FieldStage.HARVESTED) {
    return FieldStatus.COMPLETED;
  }

  // logic: If a field hasn't been updated in 30 days, it's "At Risk"
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const isStale = (new Date().getTime() - new Date(updatedAt).getTime()) > thirtyDaysInMs;

  if (isStale && stage !== FieldStage.HARVESTED) {
    return FieldStatus.AT_RISK;
  }

  return FieldStatus.ACTIVE;
};