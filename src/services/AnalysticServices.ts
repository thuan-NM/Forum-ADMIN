// services/AnalysticServices.ts
import axios from "../utils/configAxios.ts";

export interface UserGrowth {
  total_users: number;
  active_users: number;
  new_this_week: number;
  growth_rate: number;
}

export interface ContentActivity {
  total_posts: number;
  total_questions: number;
  total_answers: number;
  total_topics: number;
}

export interface Engagement {
  daily_active_users: number;
  avg_session_min: number;
  retention_rate: number;
}

export interface ActivityTrends {
  dates: string[];
  registrations: number[];
  logins: number[];
  engagements: number[];
}

export interface TrafficSource {
  source: string;
  percentage: number;
  change: number;
}

export interface PopularContent {
  title: string;
  type: string;
  author: string;
  views: number;
  engagement: number;
  id: number;
}

export interface AnalyticsResponse {
  user_growth: UserGrowth;
  content_activity: ContentActivity;
  engagement: Engagement;
  activity_trends: ActivityTrends;
  traffic_sources: TrafficSource[];
  popular_content: any;
}

export const GetAnalytics = async (
  timerage: any
): Promise<AnalyticsResponse> => {
  try {
    const response = await axios.get(`/analystic/`, {
      params: { period: timerage },
      withCredentials: true,
    });
    // Giả sử API trả về đúng cấu trúc AnalyticsResponse
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch analytics");
  }
};
