import type { RecentActivityResponse } from "../store/interfaces/recentActivityInterfaces.ts";
import axios from "../utils/configAxios.ts";
const ListRecentActivities = async (
  limit: number
): Promise<{ activities: RecentActivityResponse[] }> => {
  // Đổi attachments thành activities cho chính xác
  try {
    const response = await axios.get(`/activities/recent`, {
      // Giả sử endpoint là /api/activities/recent hoặc tương tự, adjust nếu cần
      params: {
        limit: limit,
      },
      withCredentials: true,
    });
    return {
      activities: response.data.activities || [], // Backend return gin.H{"activities": [...]}
    };
  } catch (error) {
    throw new Error("Failed to fetch recent activities");
  }
};

export { ListRecentActivities };
