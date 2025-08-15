import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DeleteTopic } from "../../services/TopicServices";

export const useDeleteTopic = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: DeleteTopic,
    onSuccess: () => {
      toast.success("Xóa chủ đề thành công");
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Xóa chủ đề thất bại");
    },
  });

  const handleDeleteTopic = (id: string) => {
    deleteMutation.mutate(id);
  };

  return {
    DeleteTopic: handleDeleteTopic,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
};
