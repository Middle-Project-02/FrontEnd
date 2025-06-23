import { useQuery } from '@tanstack/react-query';
import { getRankingDetail } from '@/apis/ranking';
import type { RankingPlanDetailResponse } from '@/types/ranking';

const useRankDetailQuery = (rankId: number | null) => {
  const { data: rankDetailResponse, isLoading } = useQuery<RankingPlanDetailResponse>({
    queryKey: ['rankingDetail', rankId],
    queryFn: () => getRankingDetail(rankId!),
    enabled: !!rankId, // rankId가 있을 때만 쿼리 실행
  });

  return { rankDetailResponse, isLoading };
};

export default useRankDetailQuery;
