/**
 * 요금제 데이터 유형
 *
 * - FIXED: 고정 용량
 * - UNLIMITED: 무제한
 * - DAILY: 일별 제공
 * - CHARGED_PER_KB: 종량제
 */
export type DataType = 'FIXED' | 'UNLIMITED' | 'DAILY' | 'CHARGED_PER_KB';

/**
 * 데이터 사용량 단계 (설명용)
 *
 * LEVEL_1~LEVEL_5: 데이터 크기에 따라 구분
 * UNKNOWN: 알 수 없음
 */
export type DataUsageLevel = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LEVEL_4' | 'LEVEL_5' | 'UNKNOWN';

/**
 * 연령대 값 정의
 *
 * - 1: 전체
 * - 2: 20대
 * - 3: 30대
 * - 4: 40대
 * - 5: 50대
 * - 6: 60대 이상
 */
export type AgeGroupValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface AgeGroup {
  label: string;
  value: AgeGroupValue;
}

/** 연령대 요금제 목록 조회 응답 */
export interface RankingPlanListResponse {
  currentAgeGroup: number;
  plans: RankingPlanSummary[];
}

/** 요금제 요약 정보 (목록용) */
export interface RankingPlanSummary {
  id: number;
  rank: number;
  name: string;
  regularPrice: string;
  dataAmount: string;
  sharedData: string | null;
  speedLimit: string | null;
  targetTypes: string | null;
}

/** 요금제 상세 정보 응답 */
export interface RankingPlanDetailResponse {
  rank: number;
  name: string;
  description: string;
  regularPrice: string;
  dataAmount: string;
  speedLimit?: string | null;
  dataAmountGb: number | null;
  dataType: DataType;
  allBenefits: PlanBenefits;
}

/** 요금제 혜택 항목 */
export interface PlanBenefits {
  데이터?: string;
  기본혜택?: string;
  음성통화?: string;
  문자메시지?: string;
  '공유 데이터'?: string;
}

/** 요금제 데이터 처리용 */
export interface PlanData {
  dataType: DataType;
  dataAmountGb: number | null;
}

/** 혜택 설명 텍스트 스타일 */
export interface DescriptionLine {
  text: string;
  isBold?: boolean;
  isSecondary?: boolean;
  className?: string;
}

/** 버튼 Refs 타입 */
export type ButtonRefsType = React.RefObject<Record<string, HTMLButtonElement | null>>;
