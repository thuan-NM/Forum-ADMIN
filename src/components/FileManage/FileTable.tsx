import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { FileSizeFormatter, DateFormatter } from "../Common";

interface FileItem {
  id: string;
  name: string;
  type: "image" | "document" | "video" | "audio" | "other";
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedBy: string;
  relatedTo?: {
    type: "post" | "question" | "answer";
    id: string;
    title: string;
  };
  createdAt: string;
}

interface FileTableProps {
  files: FileItem[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onView?: (file: FileItem) => void;
  onDownload?: (file: FileItem) => void;
  onCopyLink?: (file: FileItem) => void;
  onDelete?: (file: FileItem) => void;
}

const FileTable: React.FC<FileTableProps> = ({
  files,
  page,
  totalPages,
  onPageChange,
  onView,
  onDownload,
  onCopyLink,
  onDelete,
}) => {
  const getFileIcon = (type: string): string => {
    switch (type) {
      case "image":
        return "lucide:image";
      case "document":
        return "lucide:file-text";
      case "video":
        return "lucide:video";
      case "audio":
        return "lucide:music";
      default:
        return "lucide:file";
    }
  };

  const getFileTypeColor = (type: string): string => {
    switch (type) {
      case "image":
        return "primary";
      case "document":
        return "success";
      case "video":
        return "danger";
      case "audio":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Table
      aria-label="Files table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPages}
            onChange={onPageChange}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[400px]",
      }}
      removeWrapper
    >
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>TYPE</TableColumn>
        <TableColumn>SIZE</TableColumn>
        <TableColumn>RELATED TO</TableColumn>
        <TableColumn>UPLOADED BY</TableColumn>
        <TableColumn>DATE</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No files found"}>
        {files.map((file) => (
          <TableRow key={file.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-default-100 rounded-md">
                  {file.type === "image" ? (
                    <img
                      src={file.thumbnailUrl}
                      alt={file.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <Icon
                      icon={getFileIcon(file.type)}
                      className="text-default-500"
                    />
                  )}
                </div>
                <span className="font-medium">{file.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <Chip variant="flat" size="sm">
                {file.type}
              </Chip>
            </TableCell>
            <TableCell>
              <FileSizeFormatter bytes={file.size} />
            </TableCell>
            <TableCell>
              {file.relatedTo ? (
                <div className="flex items-center gap-1">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={
                      file.relatedTo.type === "post"
                        ? "primary"
                        : file.relatedTo.type === "question"
                          ? "secondary"
                          : "success"
                    }
                  >
                    {file.relatedTo.type}
                  </Chip>
                  <span className="text-xs truncate max-w-[100px]">
                    {file.relatedTo.title}
                  </span>
                </div>
              ) : (
                <span className="text-default-400 text-xs">—</span>
              )}
            </TableCell>
            <TableCell>{file.uploadedBy}</TableCell>
            <TableCell>
              <DateFormatter date={file.createdAt} format="medium" />
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onPress={() => onView && onView(file)}
                >
                  <Icon icon="lucide:eye" className="text-default-500" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onPress={() => onDownload && onDownload(file)}
                >
                  <Icon icon="lucide:download" className="text-default-500" />
                </Button>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="flat">
                      <Icon
                        icon="lucide:more-vertical"
                        className="text-default-500"
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="File actions">
                    <DropdownItem
                      key="copy"
                      startContent={<Icon icon="lucide:copy" />}
                      onPress={() => onCopyLink && onCopyLink(file)}
                    >
                      Copy Link
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      startContent={<Icon icon="lucide:trash" />}
                      color="danger"
                      onPress={() => onDelete && onDelete(file)}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FileTable;
