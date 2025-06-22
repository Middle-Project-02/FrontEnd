import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINTS } from '@/constants/api';
import type { RankingPlanDetailResponse, RankingPlanListResponse } from '@/types/ranking';

export const getRankingByAgeGroup = async (ageGroup: number): Promise<RankingPlanListResponse> => {
  const response = await axiosInstance.get(`${END_POINTS.RANKING.AGE_GROUP(ageGroup)}`);

  return response.data.content;
};

export const getRankingDetail = async (rankId: number): Promise<RankingPlanDetailResponse> => {
  const response = await axiosInstance.get(`${END_POINTS.RANKING.DETAIL(rankId)}`);

  return response.data.content;
};
