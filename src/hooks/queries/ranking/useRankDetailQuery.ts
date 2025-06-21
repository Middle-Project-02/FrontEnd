import { useQuery } from '@tanstack/react-query';
import { getRankingDetail } from '@/apis/ranking';
import { RankingPlanDetailResponse } from '@/types/ranking';

const useRankDetailQuery = (rankId: number | null) => {
  const { data: rankDetailResponse } = useQuery<RankingPlanDetailResponse>({
    queryKey: ['rankingDetail', rankId],
    queryFn: () => getRankingDetail(rankId!),
  });
  return { rankDetailResponse };
};

export default useRankDetailQuery;
