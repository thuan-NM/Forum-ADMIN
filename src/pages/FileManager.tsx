import React from "react";
import { Card, Pagination } from "@heroui/react";


import { LoadingState, ErrorState } from "../components/Common";
import FileFilters from "../components/FileManage/FileFilters";
import FileGrid from "../components/FileManage/FileGrid";
import FileTable from "../components/FileManage/FileTable";

interface FileItem {
  id: string;
  name: string;
  type: "image" | "document" | "video" | "audio" | "other";
  size: number; // in bytes
  url: string;
  thumbnailUrl?: string;
  uploadedBy: string;
  relatedTo?: {
    type: "post" | "question" | "answer"; // Added question and answer types
    id: string;
    title: string;
  };
  createdAt: string;
}

const FileManager: React.FC = () => {
  const [files, setFiles] = React.useState<FileItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [fileType, setFileType] = React.useState<string>("all");
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);

  const rowsPerPage = 12;

  React.useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch this data from your API
        // const response = await axios.get(`http://localhost:3000/api/files?page=${page}&limit=${rowsPerPage}&search=${searchQuery}&type=${fileType}`);
        // setFiles(response.data.files);
        // setTotalPages(Math.ceil(response.data.total / rowsPerPage));

        // Simulating API response with mock data
        setTimeout(() => {
          const fileTypes = ["image", "document", "video", "audio", "other"];
          const fileNames = [
            "profile-picture.jpg",
            "banner-image.png",
            "avatar.jpg",
            "screenshot.png",
            "document.pdf",
            "presentation.pptx",
            "spreadsheet.xlsx",
            "report.docx",
            "tutorial.mp4",
            "interview.mp4",
            "demo.mp4",
            "webinar.mp4",
            "podcast.mp3",
            "music.mp3",
            "sound-effect.wav",
            "voice-memo.m4a",
            "archive.zip",
            "data.json",
            "config.xml",
            "backup.sql",
          ];

          // Added related content types
          const relatedContent = [
            { type: "post", id: "post-1", title: "Getting Started with React" },
            { type: "post", id: "post-2", title: "JavaScript Best Practices" },
            {
              type: "question",
              id: "question-1",
              title: "How to fix React rendering issue?",
            },
            {
              type: "question",
              id: "question-2",
              title: "TypeScript type inference not working",
            },
            {
              type: "answer",
              id: "answer-1",
              title: "Answer to React rendering issue",
            },
            {
              type: "answer",
              id: "answer-2",
              title: "Answer to TypeScript question",
            },
          ];

          const mockFiles: FileItem[] = Array.from({ length: 50 }, (_, i) => {
            const type = fileTypes[Math.floor(i / 10)] as
              | "image"
              | "document"
              | "video"
              | "audio"
              | "other";
            const name = fileNames[i % fileNames.length];
            const size = Math.floor(Math.random() * 10000000); // Random size up to 10MB

            // Add related content to some files
            const hasRelatedContent = i % 3 === 0;
            const relatedTo = hasRelatedContent
              ? {
                  ...relatedContent[i % relatedContent.length],
                  type: relatedContent[i % relatedContent.length].type as "post" | "question" | "answer",
                }
              : undefined;

            return {
              id: `file-${i + 1}`,
              name,
              type,
              size,
              url: `https://example.com/files/${name}`,
              thumbnailUrl:
                type === "image"
                  ? `https://img.heroui.chat/image/places?w=200&h=200&u=${i + 1}`
                  : undefined,
              uploadedBy: `user${(i % 10) + 1}`,
              relatedTo,
              createdAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
            };
          });

          let filteredFiles = mockFiles;

          // Apply search filter
          if (searchQuery) {
            filteredFiles = filteredFiles.filter((file) =>
              file.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }

          // Apply type filter
          if (fileType !== "all") {
            filteredFiles = filteredFiles.filter(
              (file) => file.type === fileType
            );
          }

          const paginatedFiles = filteredFiles.slice(
            (page - 1) * rowsPerPage,
            page * rowsPerPage
          );
          setFiles(paginatedFiles);
          setTotalPages(Math.ceil(filteredFiles.length / rowsPerPage));
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching files:", err);
        setError("Failed to load files");
        setLoading(false);
      }
    };

    fetchFiles();
  }, [page, searchQuery, fileType]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page on new search
  };

  const handleFileTypeChange = (type: string) => {
    setFileType(type);
    setPage(1); // Reset to first page on new filter
  };

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
  };

  const handleViewFile = (file: FileItem) => {
    // In a real app, you would open a modal or navigate to view the file
    console.log("Viewing file:", file);
  };

  const handleDownloadFile = (file: FileItem) => {
    // In a real app, you would trigger a download of the file
    console.log("Downloading file:", file);
  };

  const handleCopyFileLink = (file: FileItem) => {
    // In a real app, you would copy the file URL to clipboard
    console.log("Copying file link:", file.url);
  };

  const handleDeleteFile = (file: FileItem) => {
    // In a real app, you would call your API to delete the file
    console.log("Deleting file:", file);
  };

  const handleUpload = () => {
    // In a real app, you would open a file upload dialog
    console.log("Opening upload dialog");
  };

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">File Manager</h1>
        <p className="text-default-500">Manage uploaded files and media</p>
      </div>

      <div className="flex flex-col gap-4">
        <FileFilters
          searchQuery={searchQuery}
          fileType={fileType}
          view={view}
          onSearchChange={handleSearch}
          onFileTypeChange={handleFileTypeChange}
          onViewChange={handleViewChange}
          onUpload={handleUpload}
        />

        {loading ? (
          <LoadingState />
        ) : (
          <>
            {view === "grid" ? (
              <FileGrid
                files={files}
                onView={handleViewFile}
                onDownload={handleDownloadFile}
                onCopyLink={handleCopyFileLink}
                onDelete={handleDeleteFile}
              />
            ) : (
              <Card>
                <FileTable
                  files={files}
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  onView={handleViewFile}
                  onDownload={handleDownloadFile}
                  onCopyLink={handleCopyFileLink}
                  onDelete={handleDeleteFile}
                />
              </Card>
            )}

            {view === "grid" && (
              <div className="flex justify-center mt-4">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={totalPages}
                  onChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FileManager;
