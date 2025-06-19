import { Template } from '@/types/template';
import { axiosInstance } from './axiosInstance';
import { END_POINTS } from '@/constants/api';

export const getTemplates = async (): Promise<Template[]> => {
  const response = await axiosInstance.get(END_POINTS.TEMPLATE.GET_ALL);
  return response.data.content;
};

export const getTemplateDetail = async (id: number): Promise<Template> => {
  const response = await axiosInstance.get(END_POINTS.TEMPLATE.GET_DETAIL(id));
  return response.data.content;
};

export const saveTemplate = async (rawContent: string): Promise<void> => {
  await axiosInstance.post(END_POINTS.TEMPLATE.SAVE, rawContent, {
    headers: { 'Content-Type': 'text/plain' },
  });
};

export const deleteTemplate = async (id: number): Promise<void> => {
  await axiosInstance.delete(END_POINTS.TEMPLATE.DELETE(id));
};
