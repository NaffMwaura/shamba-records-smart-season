import { FieldStage, } from '../types/index.js';
import { FieldStatus } from '../types/field.js';

export const getComputedStatus = (stage: FieldStage, updatedAt: Date): FieldStatus => {
  if (stage === FieldStage.HARVESTED) return FieldStatus.COMPLETED;

  // Logic: If field hasn't been updated in 14 days, it's "At Risk"
  const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;
  const isStale = (new Date().getTime() - new Date(updatedAt).getTime()) > fourteenDaysMs;

  if (isStale) return FieldStatus.AT_RISK;

  return FieldStatus.ACTIVE;
};