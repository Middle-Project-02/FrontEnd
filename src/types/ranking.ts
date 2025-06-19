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

/** 요금제 상세 조회 응답 */
export interface RankingPlanDetailResponse {
  rank: number;
  name: string;
  description: string;
  regularPrice: string;
  dataAmount: string;
  dataAmountGb: number | null;
  dataType: 'FIXED' | 'UNLIMITED' | 'DAILY' | 'CHARGED_PER_KB'; // ENUM으로 고정
  allBenefits: PlanBenefits;
}

/** 상세 혜택 구조 */
export interface PlanBenefits {
  데이터?: string;
  기본혜택?: string;
  음성통화?: string;
  문자메시지?: string;
  '공유 데이터'?: string;
}
