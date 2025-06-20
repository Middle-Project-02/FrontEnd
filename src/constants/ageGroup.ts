export const AGE_GROUPS = [
  { label: '전체', value: 1 },
  { label: '20대', value: 2 },
  { label: '30대', value: 3 },
  { label: '40대', value: 4 },
  { label: '50대', value: 5 },
  { label: '60대 이상', value: 6 },
] as const;

export const getAgeGroupLabel = (ageGroup: number): string => {
  const found = AGE_GROUPS.find((group) => group.value === ageGroup);
  return found?.label || '';
};

// 타입 정의 (선택사항)
export type AgeGroupValue = (typeof AGE_GROUPS)[number]['value'];
export type AgeGroup = (typeof AGE_GROUPS)[number];
