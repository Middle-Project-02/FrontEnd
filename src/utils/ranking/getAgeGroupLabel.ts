import { AGE_GROUPS } from '@/constants/ranking/ageGroups';

export const getAgeGroupLabel = (ageGroup: number): string => {
  const found = AGE_GROUPS.find((group) => group.value === ageGroup);
  return found?.label || '';
};
