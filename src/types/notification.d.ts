export interface NotificationSimpleResponse {
  notificationId: string;
  title: string;
  issue: string;
  tags?: string[];
  createdAt: string;
}

export interface NotificationDetailResponse extends NotificationSimpleResponse {
  solution: string;
}
