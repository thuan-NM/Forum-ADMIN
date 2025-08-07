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
import type { AttachmentResponse } from "../../store/interfaces/attachmentInterfaces";
import { useNavigate } from "react-router-dom";

interface FileGridProps {
  files: AttachmentResponse[];
  onView?: (file: AttachmentResponse) => void;
  onDownload?: (file: AttachmentResponse) => void;
  onCopyLink?: (file: AttachmentResponse) => void;
  onDelete?: (file: AttachmentResponse) => void;
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
  const navigate = (url: string) => window.open(url, "_blank");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <Card
          key={file.id}
          isPressable
          className="overflow-hidden rounded-md"
          onPress={() => navigate(file.url)}
        >
          <CardBody className="p-0">
            <div className="relative">
              {file.file_type === "image" ? (
                <div className="aspect-square bg-default-100">
                  <img
                    src={file.thumbnail_url}
                    alt={file.file_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-default-50 flex items-center justify-center">
                  <Icon
                    icon={getFileIcon(file.file_type)}
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
                  <p className="font-medium truncate">{file.file_name}</p>
                  <p className="text-xs text-default-500">
                    <FileSizeFormatter bytes={file.file_size} />
                  </p>
                </div>
                <Chip variant="flat" size="sm" className="ml-2">
                  {file.file_type}
                </Chip>
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-default-500">
                <span>By {file.user.fullName}</span>
                <DateFormatter date={file.created_at} format="short" />
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default FileGrid;
