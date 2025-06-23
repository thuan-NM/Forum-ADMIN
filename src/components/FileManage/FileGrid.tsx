import React from "react";
import {
  Card,
  CardBody,
  Chip,
  Button,
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

interface FileGridProps {
  files: FileItem[];
  onView?: (file: FileItem) => void;
  onDownload?: (file: FileItem) => void;
  onCopyLink?: (file: FileItem) => void;
  onDelete?: (file: FileItem) => void;
}

const FileGrid: React.FC<FileGridProps> = ({
  files,
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <Card key={file.id} isPressable className="overflow-hidden">
          <CardBody className="p-0">
            <div className="relative">
              {file.type === "image" ? (
                <div className="aspect-square bg-default-100">
                  <img
                    src={file.thumbnailUrl}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-default-50 flex items-center justify-center">
                  <Icon
                    icon={getFileIcon(file.type)}
                    className="w-12 h-12 text-default-400"
                  />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      className="bg-default-100/80 backdrop-blur-sm"
                    >
                      <Icon
                        icon="lucide:more-vertical"
                        className="text-default-500"
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="File actions">
                    <DropdownItem
                      key="view"
                      startContent={<Icon icon="lucide:eye" />}
                      onPress={() => onView && onView(file)}
                    >
                      View
                    </DropdownItem>
                    <DropdownItem
                      key="download"
                      startContent={<Icon icon="lucide:download" />}
                      onPress={() => onDownload && onDownload(file)}
                    >
                      Download
                    </DropdownItem>
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
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between">
                <div className="truncate">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-xs text-default-500">
                    <FileSizeFormatter bytes={file.size} />
                  </p>
                  {file.relatedTo && (
                    <div className="mt-1">
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
                    </div>
                  )}
                </div>
                <Chip variant="flat" size="sm" className="ml-2">
                  {file.type}
                </Chip>
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-default-500">
                <span>By {file.uploadedBy}</span>
                <DateFormatter date={file.createdAt} format="short" />
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default FileGrid;
