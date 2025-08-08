export interface RecentActivityResponse {
  id: string;
  type: "user_created" | "post_created" | "comment_created" | "topic_created";
  icon_color: string; // e.g., "blue", "purple", "green", "orange"
  description: string;
  time_ago: string; // e.g., "10 minutes ago"
  created_at: string; // RFC3339 format, e.g., "2025-08-07T12:34:56Z"
}
