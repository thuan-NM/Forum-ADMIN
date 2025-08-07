// src/hooks/attachment/useDeleteAttachment.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteAttachment } from "../../services/AttachmentServices";
import toast from "react-hot-toast";

export const useDeleteAttachment = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: DeleteAttachment,
    onSuccess: () => {
      toast.success("Attachment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["attachments"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error || "Failed to delete attachment"
      );
    },
  });

  const handleDeleteAttachment = (id: string) => {
    deleteMutation.mutate(id);
  };

  return {
    DeleteAttachment: handleDeleteAttachment,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
};
