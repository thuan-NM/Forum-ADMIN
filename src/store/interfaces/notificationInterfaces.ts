import type { User } from "./userInterfaces";

export interface Notification {
  id: string;
  type: "system" | "user" | "post" | "comment" | "question" | "answer" |"report"|"topic"|"tag";
  title: string;
  message: string;
  recipient: User;
  sender?: User | string;
  relatedId?: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export interface NotificationCreateDto {
  type: "system" | "user" | "post" | "comment" | "question" | "answer" |"report"|"topic"|"tag";
  title: string;
  message: string;
  recipientId: string;
  senderId?: string;
  relatedId?: string;
}

export interface NotificationUpdateDto {
  isRead?: boolean;
}

export interface NotificationResponse {
  id: string;
  type: "system" | "user" | "post" | "comment" | "question" | "answer" |"report"|"topic"|"tag";
  title: string;
  message: string;
  recipient: User;
  sender?: User;
  relatedId?: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationListResponse {
  notifications: NotificationResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  unreadCount: number;
}
