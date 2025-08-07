import type { UserResponse } from "./userInterfaces";

export interface AttachmentResponse {
  id: string;
  user_id: string;
  user: UserResponse;
  postId?: string;
  url: string;
  thumbnail_url?: string;
  file_name: string;
  file_type: string;
  file_size: number;
  created_at: Date;
  updated_at: Date;
}
