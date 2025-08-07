import React from "react";
import { Card, Pagination } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

import { ErrorState, LoadingState } from "../components/Common";
import FileFilters from "../components/FileManage/FileFilters";
import FileGrid from "../components/FileManage/FileGrid";
import FileTable from "../components/FileManage/FileTable";

import type { AttachmentResponse } from "../store/interfaces/attachmentInterfaces";
import { ListAttachment } from "../services/AttachmentServices";
import { useDeleteAttachment } from "../hooks/attachments/useDeleteAttachment";
import ConfirmDeleteModal from "../components/Common/Modal/ConfirmDeleteModal";
import toast from "react-hot-toast";

const rowsPerPage = 12;

const FileManager: React.FC = () => {
  const [page, setPage] = React.useState<number>(1);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [fileType, setFileType] = React.useState<string>("all");
  const [fileToDelete, setFileToDelete] =
    React.useState<AttachmentResponse | null>(null);
  const { DeleteAttachment, isDeleting } = useDeleteAttachment();

  const confirmDelete = () => {
    if (!fileToDelete) return;
    DeleteAttachment(fileToDelete.id);
    setFileToDelete(null);
  };

  const filters = {
    ...(searchQuery && { search: searchQuery }),
    ...(fileType !== "all" && { file_type: fileType }),
    page,
    limit: rowsPerPage,
  };

  const { data, isLoading, isError, error } = useQuery<{
    attachments: AttachmentResponse[];
    total: number;
  }>({
    queryKey: ["attachments", filters],
    queryFn: () => ListAttachment(filters),
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleFileTypeChange = (value: string) => {
    setFileType(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewChange = (value: "grid" | "list") => {
    setView(value);
  };

  const handleViewFile = (file: AttachmentResponse) => {
    window.open(file.url, "_blank");
  };

  const handleDownloadFile = async (file: AttachmentResponse) => {
    const response = await fetch(file.url, {
      credentials: "include", // nếu cần gửi cookie
    });

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = file.file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  const handleCopyFileLink = async (file: AttachmentResponse) => {
    try {
      await navigator.clipboard.writeText(file.url);
      toast.success("Copied link to clipboard");
      // Hiển thị thông báo nếu bạn có Toast hoặc Snackbar
    } catch (err) {
      toast.error("Failed to copy link");
      // Thông báo lỗi nếu cần
    }
  };

  if (isError) {
    return (
      <ErrorState
        message={
          error instanceof Error ? error.message : "Failed to load files"
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <FileFilters
          searchQuery={searchQuery}
          fileType={fileType}
          view={view}
          onSearchChange={handleSearch}
          onFileTypeChange={handleFileTypeChange}
          onViewChange={handleViewChange}
        />

        {isLoading ? (
          <LoadingState />
        ) : (
          <>
            {view === "grid" ? (
              <>
                <FileGrid
                  files={data?.attachments || []}
                  onView={handleViewFile}
                  onDownload={handleDownloadFile}
                  onCopyLink={handleCopyFileLink}
                  onDelete={setFileToDelete}
                />
                <div className="flex justify-center mt-4 pb-2">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={Math.ceil((data?.total || 0) / rowsPerPage)}
                    onChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <Card>
                <FileTable
                  files={data?.attachments || []}
                  page={page}
                  totalPages={Math.ceil((data?.total || 0) / rowsPerPage)}
                  onPageChange={handlePageChange}
                  onView={handleViewFile}
                  onDownload={handleDownloadFile}
                  onCopyLink={handleCopyFileLink}
                  onDelete={setFileToDelete}
                />
              </Card>
            )}
          </>
        )}
      </div>
      <ConfirmDeleteModal
        open={!!fileToDelete}
        onClose={() => setFileToDelete(null)}
        onConfirm={confirmDelete}
        fileName={fileToDelete?.file_name || ""}
      />
    </div>
  );
};

export default FileManager;
