import { useQuery } from '@tanstack/react-query';
import { getRankingDetail } from '@/apis/ranking';
import type { RankingPlanDetailResponse } from '@/types/ranking';

const useRankDetailQuery = (rankId: number | null) => {
  const { data: rankDetailResponse, isLoading } = useQuery<RankingPlanDetailResponse>({
    queryKey: ['rankingDetail', rankId],
    queryFn: () => getRankingDetail(rankId!),
    enabled: !!rankId,
  });

  return { rankDetailResponse, isLoading };
};

export default useRankDetailQuery;
