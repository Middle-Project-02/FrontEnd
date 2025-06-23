import { useQuery } from '@tanstack/react-query';
import { getRankingByAgeGroup } from '@/apis/ranking';
import type { RankingPlanListResponse } from '@/types/ranking';

const useRankAgeGroupQuery = (ageGroup: number) => {
  const { data: RankingPlanListResponse, isLoading } = useQuery<RankingPlanListResponse>({
    queryKey: ['ranking', ageGroup],
    queryFn: () => getRankingByAgeGroup(ageGroup),
  });

  return { RankingPlanListResponse, isLoading };
};

export default useRankAgeGroupQuery;
