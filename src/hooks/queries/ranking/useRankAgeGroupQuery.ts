import { useQuery } from '@tanstack/react-query';
import { RankingPlanListResponse } from '@/types/ranking';
import { getRankingByAgeGroup } from '@/apis/ranking';

const useRankAgeGroupQuery = (ageGroup: number) => {
  const { data: RankingPlanListResponse } = useQuery<RankingPlanListResponse>({
    queryKey: ['ranking', ageGroup],
    queryFn: () => getRankingByAgeGroup(ageGroup),
  });

  return { RankingPlanListResponse };
};

export default useRankAgeGroupQuery;
