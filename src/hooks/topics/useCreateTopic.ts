import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateTopic } from "../../services/TopicServices";

export const useCreateTopic = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: CreateTopic,
    onSuccess: () => {
      toast.success("Tạo chủ đề thành công");
      if (onSuccessCallback) onSuccessCallback();
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Tạo chủ đề thất bại");
    },
  });

  const handleCreateTopic = (data: any) => {
    createMutation.mutate(data);
  };

  return {
    CreateTopic: handleCreateTopic,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
  };
};
