import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateQuestionStatus } from "../../services/QuestionServices";
import toast from "react-hot-toast";
import capitalize from "../../utils/capitalize";

export const useUpdateQuestionStatus = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      UpdateQuestionStatus(id, status),
    onSuccess: (data) => {
      toast.success(
        `${capitalize(data.question.status)} câu hỏi thành công`
      );
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error || "Chỉnh sửa trạng thái câu hỏi thất bại"
      );
    },
  });

  const handleUpdateStatus = (id: string, status: string) => {
    updateMutation.mutate({ id, status });
  };

  return {
    UpdateQuestionStatus: handleUpdateStatus,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
};
