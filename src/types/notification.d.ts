export interface NotificationSimpleResponse {
  notificationId: number;
  title: string;
  summary: string;
  tags?: string[];
  createdAt: string;
}

export interface NotificationDetailResponse extends NotificationSimpleResponse {
  issue: string;
  impact: string;
  solution: string;
}
