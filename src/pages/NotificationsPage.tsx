import React from "react";
import { Card } from "@heroui/react";
import { ErrorState, LoadingState } from "../components/Common";
import NotificationFilters from "../components/Notification/NotificationFilters";
import NotificationList from "../components/Notification/NotificationList";
import type { Notification } from "../store/interfaces/notificationInterfaces";

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const rowsPerPage = 10;

  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch this data from your API
        // const response = await axios.get(`http://localhost:3000/api/notifications?page=${page}&limit=${rowsPerPage}&search=${searchQuery}`);
        // setNotifications(response.data.notifications);
        // setTotalPages(Math.ceil(response.data.total / rowsPerPage));

        // Simulating API response with mock data
        setTimeout(() => {
          const notificationTypes = [
            {
              type: "hệ thống",
              titles: [
                "Bảo trì hệ thống",
                "Tính năng mới",
                "Cập nhật bảo mật",
                "Cập nhật điều khoản",
              ],
              messages: [
                "Hệ thống sẽ tạm ngưng để bảo trì vào thứ Bảy",
                "Chúng tôi đã thêm một tính năng mới cho diễn đàn",
                "Các bản vá bảo mật đã được áp dụng",
                "Điều khoản dịch vụ của chúng tôi đã được cập nhật",
              ],
            },
            {
              type: "người dùng",
              titles: [
                "Đăng ký người dùng mới",
                "Người dùng bị báo cáo",
                "Người dùng bị cấm",
                "Cập nhật hồ sơ",
              ],
              messages: [
                "Một người dùng mới đã đăng ký",
                "Một người dùng đã bị báo cáo vì hành vi không phù hợp",
                "Một người dùng đã bị cấm",
                "Một người dùng đã cập nhật hồ sơ của họ",
              ],
            },
            {
              type: "bài viết",
              titles: [
                "Bài viết mới",
                "Bài viết bị báo cáo",
                "Bài viết nổi bật",
                "Bài viết được chỉnh sửa",
              ],
              messages: [
                "Một bài viết mới đã được tạo",
                "Một bài viết đã bị báo cáo",
                "Một bài viết đang nổi bật",
                "Một bài viết đã được chỉnh sửa",
              ],
            },
            {
              type: "bình luận",
              titles: [
                "Bình luận mới",
                "Bình luận bị báo cáo",
                "Bình luận được chỉnh sửa",
                "Bình luận bị xóa",
              ],
              messages: [
                "Một bình luận mới đã được thêm vào câu trả lời",
                "Một bình luận đã bị báo cáo",
                "Một bình luận đã được chỉnh sửa",
                "Một bình luận đã bị xóa",
              ],
            },
            {
              type: "câu hỏi",
              titles: [
                "Câu hỏi mới",
                "Câu hỏi bị báo cáo",
                "Câu hỏi nổi bật",
                "Câu hỏi đã được giải đáp",
              ],
              messages: [
                "Một câu hỏi mới đã được đặt",
                "Một câu hỏi đã bị báo cáo",
                "Một câu hỏi đang nổi bật",
                "Một câu hỏi đã được đánh dấu là đã giải đáp",
              ],
            },
            {
              type: "câu trả lời",
              titles: [
                "Câu trả lời mới",
                "Câu trả lời bị báo cáo",
                "Câu trả lời được chấp nhận",
                "Câu trả lời được chỉnh sửa",
              ],
              messages: [
                "Một câu trả lời mới đã được đăng cho câu hỏi của bạn",
                "Một câu trả lời đã bị báo cáo",
                "Một câu trả lời đã được chấp nhận là giải pháp",
                "Một câu trả lời cho câu hỏi của bạn đã được chỉnh sửa",
              ],
            },
          ];

          const mockNotifications: any[] = Array.from(
            { length: 45 },
            (_, i) => {
              const typeIndex = i % notificationTypes.length;
              const typeInfo = notificationTypes[typeIndex];
              const titleIndex = i % typeInfo.titles.length;

              return {
                id: `notification-${i + 1}`,
                type: typeInfo.type as
                  | "hệ thống"
                  | "người dùng"
                  | "bài viết"
                  | "bình luận"
                  | "câu hỏi"
                  | "câu trả lời",
                title: typeInfo.titles[titleIndex],
                message: typeInfo.messages[titleIndex],
                recipient: {
                  id: `user-${(i % 10) + 1}`,
                  username: `user${(i % 10) + 1}`,
                },
                isRead: i % 3 === 0,
                createdAt: new Date(Date.now() - i * 3600000),
              };
            }
          );

          const filteredNotifications = searchQuery
            ? mockNotifications.filter(
                (notification) =>
                  notification.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  notification.message
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  notification.recipient.username
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
            : mockNotifications;

          const paginatedNotifications = filteredNotifications.slice(
            (page - 1) * rowsPerPage,
            page * rowsPerPage
          );
          setNotifications(paginatedNotifications);
          setTotalPages(Math.ceil(filteredNotifications.length / rowsPerPage));
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [page, searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleMarkAsRead = (notification: Notification) => {
    console.log("Marking notification as read:", notification);
  };

  const handleMarkAsUnread = (notification: Notification) => {
    console.log("Marking notification as unread:", notification);
  };

  const handleDeleteNotification = (notification: Notification) => {
    console.log("Deleting notification:", notification);
  };

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <NotificationFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
        />

        <Card className="w-full p-4" radius="sm">
          {loading ? (
            <LoadingState />
          ) : (
            <NotificationList
              notifications={notifications}
              loading={loading}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              onMarkAsRead={handleMarkAsRead}
              onMarkAsUnread={handleMarkAsUnread}
              onDelete={handleDeleteNotification}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default NotificationsPage;
