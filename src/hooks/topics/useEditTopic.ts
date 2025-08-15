import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UpdateTopic } from "../../services/TopicServices";

export const useUpdateTopic = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      UpdateTopic(id, data),
    onSuccess: () => {
      if (onSuccessCallback) onSuccessCallback();
      toast.success(`Chỉnh sửa chủ đề thành công`);
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Chỉnh sửa chủ đề thất bại");
    },
  });

  const handleUpdate = (id: string, data: any) => {
    updateMutation.mutate({ id, data });
  };

  return {
    UpdateTopic: handleUpdate,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
};
