import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import NotificationActions from "./NotificationActions";
import { DateFormatter } from "../Common";
import type { Notification } from "../../store/interfaces/notificationInterfaces";

interface NotificationListProps {
  notifications: Notification[];
  loading?: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onMarkAsRead?: (notification: Notification) => void;
  onMarkAsUnread?: (notification: Notification) => void;
  onDelete?: (notification: Notification) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  loading = false,
  page,
  totalPages,
  onPageChange,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "hệ thống":
        return "danger";
      case "người dùng":
        return "primary";
      case "bài viết":
        return "secondary";
      case "bình luận":
        return "success";
      case "câu hỏi":
        return "warning";
      case "câu trả lời":
        return "default";
      default:
        return "default";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hệ thống":
        return "lucide:alert-triangle";
      case "người dùng":
        return "lucide:user";
      case "bài viết":
        return "lucide:file-text";
      case "bình luận":
        return "lucide:message-square";
      case "câu hỏi":
        return "lucide:help-circle";
      case "câu trả lời":
        return "lucide:message-circle";
      default:
        return "lucide:bell";
    }
  };

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <Table
      aria-label="Notifications table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPages}
            onChange={onPageChange}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[400px]",
      }}
      removeWrapper
    >
      <TableHeader>
        <TableColumn>LOẠI THÔNG BÁO</TableColumn>
        <TableColumn>TIÊU ĐỀ</TableColumn>
        <TableColumn>THÔNG TIN</TableColumn>
        <TableColumn>NGƯỜI NHẬN</TableColumn>
        <TableColumn>TRẠNG THÁI</TableColumn>
        <TableColumn>NGÀY TẠO</TableColumn>
        <TableColumn>HÀNH ĐỘNG</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"Không tìm thấy thông báo"}>
        {notifications.map((notification) => (
          <TableRow key={notification.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Icon
                  icon={getTypeIcon(notification.type)}
                  className={`text-${getTypeColor(notification.type)}-500`}
                />
                <Chip
                  color={getTypeColor(notification.type)}
                  variant="flat"
                  size="sm"
                >
                  {notification.type}
                </Chip>
              </div>
            </TableCell>
            <TableCell className="font-medium">{notification.title}</TableCell>
            <TableCell className="max-w-xs truncate">
              {notification.message}
            </TableCell>
            <TableCell>{notification.recipient.username}</TableCell>
            <TableCell>
              <Chip
                color={notification.isRead ? "default" : "primary"}
                variant="dot"
                size="sm"
              >
                {notification.isRead ? "Đã đọc" : "Chưa đọc"}
              </Chip>
            </TableCell>
            <TableCell>
              <DateFormatter date={notification.createdAt} format="medium" />
            </TableCell>
            <TableCell>
              <NotificationActions
                notification={notification}
                onMarkAsRead={onMarkAsRead}
                onMarkAsUnread={onMarkAsUnread}
                onDelete={onDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default NotificationList;
