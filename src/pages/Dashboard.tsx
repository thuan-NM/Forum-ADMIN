import React from "react";
import { Spinner } from "@heroui/react";
import TrafficSources from "../components/Dashboard/TrafficSources";
import RecentActivity from "../components/Dashboard/RecentActivity";
import StatsCard from "../components/Dashboard/StatCard";
import { useQuery } from "@tanstack/react-query";
import { ListRecentActivities } from "../services/RecentActivityServices";
import { GetAnalytics } from "../services/AnalysticServices";

const Dashboard: React.FC = () => {
  // Fetch stats
  const {
    data: statsData,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => GetAnalytics(1),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Fetch recent activities
  const {
    data: activitiesData,
    isLoading: activitiesLoading,
    error: activitiesError,
  } = useQuery({
    queryKey: ["recentActivities"],
    queryFn: () => ListRecentActivities(10),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Map activity data
  const mappedActivities = React.useMemo(() => {
    return (activitiesData?.activities || []).map((act, index) => {
      let type: string;
      let title: string;
      switch (act.type) {
        case "user_created":
          type = "user";
          title = "Người dùng mới đăng ký";
          break;
        case "post_created":
          type = "post";
          title = "Bài viết mới được tạo";
          break;
        case "comment_created":
          type = "comment";
          title = "Bình luận mới";
          break;
        case "topic_created":
          type = "topic";
          title = "Danh mục mới đã được thêm";
          break;
        default:
          type = "post";
          title = "Hoạt động không xác định";
      }

      return {
        id: `activity-${index + 1}`,
        type,
        title,
        description: act.description,
        time: act.time_ago,
      };
    });
  }, [activitiesData]);

  if (statsLoading || activitiesLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (statsError || activitiesError) {
    return (
      <div className="p-4 bg-danger-50 text-danger-500 rounded-md">
        {statsError?.message ||
          activitiesError?.message ||
          "Failed to load dashboard data"}
      </div>
    );
  }

  // Map dữ liệu API sang StatsCard
  const totalUsers = statsData?.user_growth?.total_users || 0;
  const newUsersToday = statsData?.user_growth?.new_this_week || 0; // API chưa có field "today"
  const totalPosts = statsData?.content_activity?.total_posts || 0;
  const newPostsToday = statsData?.content_activity?.total_questions || 0; // ví dụ: questions là bài mới
  const totalCategories = statsData?.content_activity?.total_topics || 0; // giả sử answers là categories

  // Traffic sources từ API
  const trafficSources = statsData?.traffic_sources || [];
  console.log("Stat data:", statsData);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Số lượng người dùng "
          value={totalUsers.toLocaleString()}
          change={newUsersToday}
          icon="lucide:users"
          iconColor="text-primary-500"
          iconBgColor="bg-primary-100"
        />

        <StatsCard
          title="Số lượng bài đăng"
          value={totalPosts.toLocaleString()}
          change={newPostsToday}
          icon="lucide:file-text"
          iconColor="text-secondary-500"
          iconBgColor="bg-secondary-100"
        />

        <StatsCard
          title="Chủ đề"
          value={totalCategories.toString()}
          change={0}
          icon="lucide:tag"
          iconColor="text-warning-500"
          iconBgColor="bg-warning-100"
        />
      </div>

      <RecentActivity activities={mappedActivities} />

      <TrafficSources sources={trafficSources} />
    </div>
  );
};

export default Dashboard;
