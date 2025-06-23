import React from "react";
import { ErrorState, LoadingState } from "../components/Common";
import { Card } from "@heroui/react";
import ReportList from "../components/Report/ReportList";
import type { ReportResponse } from "../store/interfaces/reportInterfaces";
import ReportFilters from "../components/Report/ReportFilters";
import ReportDetail from "../components/Report/ReportDetail";
import { GetAllReports, ListReports } from "../services/ReportServices";
import { useDeleteReport } from "../hooks/reports/useDeleteReport";
import { useUpdateReportStatus } from "../hooks/reports/useUpdateReportStatus";
import { useQuery } from "@tanstack/react-query";

const Reports: React.FC = () => {
  const [page, setPage] = React.useState<number>(1);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [selectedReport, setSelectedReport] = React.useState<ReportResponse>(
    {} as ReportResponse
  );
  const [isDetailModalOpen, setIsDetailModalOpen] =
    React.useState<boolean>(false);

  const rowsPerPage = 10;

  const { DeleteReportHook, isDeleting } = useDeleteReport();
  const { UpdateReportStatus, isUpdating } = useUpdateReportStatus();

  const filters = {
    ...(searchQuery && { search: searchQuery }),
    ...(statusFilter !== "all" && { status: statusFilter }),
    page,
    limit: rowsPerPage,
  };

  const { data, isLoading, isError, error } = useQuery<{
    reports: ReportResponse[];
    total: number;
  }>({
    queryKey: ["reports", filters],
    queryFn: () => GetAllReports(filters),
  });
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleResolveReport = (report: ReportResponse) => {
    UpdateReportStatus(report.id, "resolved");
    setIsDetailModalOpen(false);
  };

  const handleDismissReport = (report: ReportResponse) => {
    UpdateReportStatus(report.id, "dismissed");
    setIsDetailModalOpen(false);
  };

  const handleDeleteReport = (report: ReportResponse) => {
    DeleteReportHook(report.id);
  };

  const handleViewReport = (report: ReportResponse) => {
    setSelectedReport(report);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedReport({} as ReportResponse);
  };

  if (isError) {
    return <ErrorState message={error.message || "Failed to get reports"} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <ReportFilters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSearchChange={handleSearch}
          onStatusFilter={handleStatusFilter}
        />

        <Card className="w-full p-4" radius="sm">
          {data && (
            <ReportList
              reports={data?.reports}
              loading={isLoading}
              page={page}
              totalPages={Math.ceil((data?.total || 0) / rowsPerPage)}
              onPageChange={setPage}
              onResolve={handleResolveReport}
              onDismiss={handleDismissReport}
              onDelete={handleDeleteReport}
              onView={handleViewReport}
            />
          )}
        </Card>
      </div>
      <ReportDetail
        report={selectedReport}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onResolve={handleResolveReport}
        onDismiss={handleDismissReport}
      />
    </div>
  );
};

export default Reports;
