import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateReportStatus } from "../../services/ReportServices";
import toast from "react-hot-toast";
import capitalize from "../../utils/capitalize";

export const useUpdateReportStatus = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      UpdateReportStatus(id, status),
    onSuccess: (data) => {
      toast.success(`${capitalize(data.report.status)} báo cáo thành công`);
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error || "Chỉnh sửa trạng thái báo cáo thất bại"
      );
    },
  });

  const handleUpdateStatus = (id: string, status: string) => {
    updateMutation.mutate({ id, status });
  };

  return {
    UpdateReportStatus: handleUpdateStatus,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
};
