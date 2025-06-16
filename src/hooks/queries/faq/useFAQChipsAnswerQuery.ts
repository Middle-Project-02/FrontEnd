import { getFAQChipAnswer } from '@/apis/faq';
import { FAQChipAnswer } from '@/types/faq';
import { useQuery } from '@tanstack/react-query';

const useFAQChipAnswerQuery = (chipId: number) => {
  const { data: chipAnswer } = useQuery<FAQChipAnswer>({
    queryKey: ['faqChipAnswer', chipId],
    queryFn: () => getFAQChipAnswer(chipId),
    enabled: !!chipId,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { chipAnswer };
};

export default useFAQChipAnswerQuery;
