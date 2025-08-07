import type { AttachmentResponse } from "../store/interfaces/attachmentInterfaces.ts";
import axios from "../utils/configAxios.ts";

const GetAttachmentInfo = async (id: string): Promise<AttachmentResponse> => {
  const response = await axios.get(`/attachments/${id}`, {
    withCredentials: true,
  });
  if (!response.data?.attachment) throw new Error("Answer not found");
  return response.data.answer;
};

const DeleteAttachment = async (id: string) => {
  return (await axios.delete(`/attachments/${id}`, { withCredentials: true }))
    .data;
};
const ListAttachment = async (
  filters: any
): Promise<{ attachments: AttachmentResponse[]; total: number }> => {
  try {
    const response = await axios.get(`/attachments/`, {
      params: filters,
      withCredentials: true,
    });
    return {
      attachments: response.data.attachments || [],
      total: response.data.total || 0,
    };
  } catch (error) {
    throw new Error("Failed to fetch answers");
  }
};

export { GetAttachmentInfo, DeleteAttachment, ListAttachment };
