import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { LoadingState, ErrorState } from "../components/Common";
import TimeRangeSelector from "../components/Analytics/TimeRangeSelector";
import StatsOverview from "../components/Analytics/StatsOverview";
import TrafficSourceChart from "../components/Analytics/TrafficSourceChart";
import PopularContentTable from "../components/Analytics/PopularContentTable";
import {
  GetAnalytics,
  type AnalyticsResponse,
} from "../services/AnalysticServices";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from "recharts";

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState<string>("7d");

  const {
    data: analyticsData,
    isLoading,
    error,
  } = useQuery<AnalyticsResponse>({
    queryKey: ["analytics", timeRange],
    queryFn: () => GetAnalytics(timeRange),
    staleTime: 5 * 60 * 1000,
  });

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  // Prepare chart data
  const chartData = React.useMemo(() => {
    return (analyticsData?.activity_trends?.dates || []).map((date, i) => ({
      date: new Date(date).toLocaleDateString("vi-VN", {
        month: "short",
        day: "numeric",
      }), // Format date nicely, e.g., "Aug 1"
      registrations: analyticsData?.activity_trends.registrations[i] || 0,
      logins: analyticsData?.activity_trends.logins[i] || 0,
      engagements: analyticsData?.activity_trends.engagements[i] || 0,
    }));
  }, [analyticsData]);

  if (isLoading) return <LoadingState message="Loading analytics data..." />;
  if (error) return <ErrorState message="Failed to load analytics data" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <TimeRangeSelector
          timeRange={timeRange}
          onTimeRangeChange={handleTimeRangeChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsOverview
          title="Tăng trưởng người dùng"
          icon="lucide:users"
          iconBgColor="bg-primary-100"
          iconColor="text-primary-500"
          stats={[
            {
              label: "Tổng người dùng",
              value:
                analyticsData?.user_growth.total_users.toLocaleString() || "0",
            },
            {
              label: "Người dùng đang hoạt động",
              value:
                analyticsData?.user_growth.active_users.toLocaleString() || "0",
            },
            {
              label: "Người dùng mới trong tuần",
              value:
                analyticsData?.user_growth.new_this_week.toLocaleString() ||
                "0",
            },
          ]}
          change={analyticsData?.user_growth.growth_rate}
        />

        <StatsOverview
          title="Hoạt động nội dung"
          icon="lucide:file-text"
          iconBgColor="bg-secondary-100"
          iconColor="text-secondary-500"
          stats={[
            {
              label: "Tổng bài viết",
              value:
                analyticsData?.content_activity.total_posts.toLocaleString() ||
                "0",
            },
            {
              label: "Tổng câu hỏi",
              value:
                analyticsData?.content_activity.total_questions.toLocaleString() ||
                "0",
            },
            {
              label: "Tổng câu trả lời",
              value:
                analyticsData?.content_activity.total_answers.toLocaleString() ||
                "0",
            },
          ]}
        />

        <StatsOverview
          title="Hoạt động"
          icon="lucide:activity"
          iconBgColor="bg-success-100"
          iconColor="text-success-500"
          stats={[
            {
              label: "Người dùng hoạt động hàng ngày",
              value:
                analyticsData?.engagement.daily_active_users.toLocaleString() ||
                "0",
            },
            {
              label: "Thời gian phiên trung bình",
              value: `${analyticsData?.engagement.avg_session_min || "0"} phút`,
            },
            {
              label: "Tỷ lệ giữ chân",
              value: `${analyticsData?.engagement.retention_rate || "0"}%`,
            },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold">
              Xu hướng hoạt động của người dùng
            </h3>
          </CardHeader>
          <CardBody>
            <div className="h-80">
              <ResponsiveContainer
                width="100%"
                height="100%"
                className="overflow-hidden"
              >
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />{" "}
                  {/* Dark grid */}
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#9CA3AF" }}
                    tickMargin={10}
                    interval={Math.floor(chartData.length / 10)} // Reduce ticks if many points
                  />
                  <YAxis tick={{ fill: "#9CA3AF" }} tickMargin={5} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      borderRadius: "4px",
                      color: "#F3F4F6",
                    }}
                    labelFormatter={(label) => `Ngày: ${label}`}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ color: "#9CA3AF" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="registrations"
                    stroke="#8884d8"
                    name="Đăng ký"
                    dot={chartData.length < 10 ? { r: 4 } : false} // Show dots if few points
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="logins"
                    stroke="#82ca9d"
                    name="Đăng nhập"
                    dot={chartData.length < 10 ? { r: 4 } : false}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="engagements"
                    stroke="#ffc658"
                    name="Tương tác"
                    dot={chartData.length < 10 ? { r: 4 } : false}
                    strokeWidth={2}
                  />
                  {chartData.length > 7 && (
                    <Brush
                      dataKey="date"
                      height={30}
                      stroke="#374151"
                      fill="#1F2937"
                    />
                  )}{" "}
                  {/* Add brush for zoom if many data points */}
                </LineChart>
              </ResponsiveContainer>
              {chartData.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                  Không có dữ liệu hoạt động trong khoảng thời gian này.
                </p>
              )}
            </div>
          </CardBody>
        </Card>

        <TrafficSourceChart sources={analyticsData?.traffic_sources || []} />
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Nội dung phổ biến</h3>
        </CardHeader>
        <CardBody>
          <PopularContentTable items={analyticsData?.popular_content || []} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Analytics;
