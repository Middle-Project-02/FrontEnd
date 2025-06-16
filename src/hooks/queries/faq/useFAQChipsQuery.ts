import { getFAQChips } from '@/apis/faq';
import { FAQChip } from '@/types/faq';
import { useQuery } from '@tanstack/react-query';

const useFAQChipsQuery = () => {
  const { data: faqChips } = useQuery<FAQChip[]>({
    queryKey: ['faqChips'],
    queryFn: getFAQChips,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { faqChips };
};

export default useFAQChipsQuery;
