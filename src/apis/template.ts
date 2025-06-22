import { axiosInstance } from '@/apis/axiosInstance';
import type { Template } from '@/types/template';
import { END_POINTS } from '@/constants/api';

export const getTemplates = async (): Promise<Template[]> => {
  const response = await axiosInstance.get(END_POINTS.TEMPLATE.GET_ALL);
  return response.data.content;
};

export const getTemplateDetail = async (id: number): Promise<Template> => {
  const response = await axiosInstance.get(END_POINTS.TEMPLATE.GET_DETAIL(id));
  return response.data.content;
};

export const postSaveTemplate = async (data: { title: string; content: string }): Promise<void> => {
  await axiosInstance.post(END_POINTS.TEMPLATE.SAVE, data, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const deleteTemplate = async (id: number): Promise<void> => {
  await axiosInstance.delete(END_POINTS.TEMPLATE.DELETE(id));
};
