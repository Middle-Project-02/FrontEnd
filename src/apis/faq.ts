import { FAQChip, FAQChipAnswer } from '@/types/faq';
import { axiosInstance } from './axiosInstance';
import { END_POINTS } from '@/constants/api';

export const getFAQChips = async (): Promise<FAQChip[]> => {
  const response = await axiosInstance.get(`${END_POINTS.FAQ.GET_CHIPS}`);

  return response.data.content;
};

export const getFAQChipAnswer = async (chipId: number): Promise<FAQChipAnswer> => {
  const response = await axiosInstance.get(`${END_POINTS.FAQ.GET_ANSWER(chipId)}`);

  return response.data.content;
};
