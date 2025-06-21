import { useQuery } from '@tanstack/react-query';
import { getRankingByAgeGroup } from '@/apis/ranking';
import { RankingPlanListResponse } from '@/types/ranking';

const useRankAgeGroupQuery = (ageGroup: number) => {
  const { data: RankingPlanListResponse } = useQuery<RankingPlanListResponse>({
    queryKey: ['ranking', ageGroup],
    queryFn: () => getRankingByAgeGroup(ageGroup),
  });

  return { RankingPlanListResponse };
};

export default useRankAgeGroupQuery;
