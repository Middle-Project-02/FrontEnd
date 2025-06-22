// ============================================================================
// 📊 DATA & ENUM TYPES (데이터 관련 기본 타입들)
// ============================================================================

export type DataType = 'FIXED' | 'UNLIMITED' | 'DAILY' | 'CHARGED_PER_KB';
export type DataUsageLevel = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LEVEL_4' | 'LEVEL_5' | 'UNKNOWN';

// ============================================================================
// 👥 AGE GROUP TYPES (연령대 관련 타입들)
// ============================================================================

/** ageGroup.ts에서 이동해온 타입들 */
export type AgeGroupValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface AgeGroup {
  label: string;
  value: AgeGroupValue;
}

// ============================================================================
// 📱 PLAN & RANKING TYPES (요금제 및 랭킹 관련 타입들)
// ============================================================================

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
  dataType: DataType;
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

/** 요금제 데이터 처리용 */
export interface PlanData {
  dataType: DataType;
  dataAmountGb: number | null;
}

// ============================================================================
// 🎨 UI & DESCRIPTION TYPES (UI 및 설명 관련 타입들)
// ============================================================================

/** 혜택 설명 라인 */
export interface DescriptionLine {
  text: string;
  isBold?: boolean;
  isSecondary?: boolean;
  className?: string;
}

// ============================================================================
// 🔗 REF & EVENT TYPES (Ref 및 이벤트 관련 타입들)
// ============================================================================

/** 버튼 Refs 타입 */
export type ButtonRefsType = React.RefObject<Record<string, HTMLButtonElement | null>>;
