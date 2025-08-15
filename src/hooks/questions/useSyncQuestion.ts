import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SyncQuestionData } from "../../services/QuestionServices";

export const useSyncQuestion = () => {
  const queryClient = useQueryClient();

  const syncMutation = useMutation({
    mutationFn: SyncQuestionData,
    onSuccess: () => {
      toast.success("Đồng bộ câu hỏi thành công");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Đồng bộ thất bại");
    },
  });

  const handleSyncQuestions = () => {
    syncMutation.mutate();
  };

  return {
    SyncQuestions: handleSyncQuestions,
    isSyncing: syncMutation.isPending,
    syncError: syncMutation.error,
  };
};
