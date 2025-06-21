import { getAllNotifications, getNotificationDetail } from '@/apis/notification';
import { NotificationDetailResponse, NotificationSimpleResponse } from '@/types/notification';
import { useQuery } from '@tanstack/react-query';

const useAllNotificationsQuery = () => {
  const { data: notifications, isLoading } = useQuery<NotificationSimpleResponse[]>({
    queryKey: ['notifications'],
    queryFn: getAllNotifications,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { notifications, isLoading };
};

const useNotificationDetailQuery = (id: string) => {
  const { data: notificationDetail, isLoading } = useQuery<NotificationDetailResponse>({
    queryKey: ['notification', id],
    queryFn: () => getNotificationDetail(id),
    enabled: !!id,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { notificationDetail, isLoading };
};

export { useAllNotificationsQuery, useNotificationDetailQuery };
