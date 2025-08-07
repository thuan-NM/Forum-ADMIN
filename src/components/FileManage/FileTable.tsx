import React, { useState, useMemo } from "react";
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
  type SortDescriptor,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { FileSizeFormatter, DateFormatter } from "../Common";
import type { AttachmentResponse } from "../../store/interfaces/attachmentInterfaces";

interface FileTableProps {
  files: AttachmentResponse[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onView?: (file: AttachmentResponse) => void;
  onDownload?: (file: AttachmentResponse) => void;
  onCopyLink?: (file: AttachmentResponse) => void;
  onDelete?: (file: AttachmentResponse) => void;
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
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    {} as SortDescriptor
  );

  const sortedFiles = useMemo(() => {
    if (!sortDescriptor.column) return files;

    return [...files].sort((a, b) => {
      let cmp = 0;
      switch (sortDescriptor.column) {
        case "name":
          cmp = a.file_name.localeCompare(b.file_name);
          break;
        case "type":
          cmp = a.file_type.localeCompare(b.file_type);
          break;
        case "size":
          cmp = a.file_size - b.file_size;
          break;
        case "date":
          cmp =
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
      }
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [files, sortDescriptor]);

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

  return (
    <Table
      aria-label="Posts table"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
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
      className="p-4"
      removeWrapper
    >
      <TableHeader>
        <TableColumn key="name" allowsSorting>
          NAME
        </TableColumn>
        <TableColumn key="type" allowsSorting>
          TYPE
        </TableColumn>
        <TableColumn key="size" allowsSorting>
          SIZE
        </TableColumn>
        <TableColumn>UPLOADED BY</TableColumn>
        <TableColumn key="date" allowsSorting>
          DATE
        </TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No files found"}>
        {sortedFiles.map((file) => (
          <TableRow key={file.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-default-100 rounded-md">
                  {file.file_type === "image" ? (
                    <img
                      src={file.thumbnail_url}
                      alt={file.file_name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <Icon
                      icon={getFileIcon(file.file_type)}
                      className="text-default-500"
                    />
                  )}
                </div>
                <span className="font-medium">{file.file_name}</span>
              </div>
            </TableCell>
            <TableCell>
              <Chip variant="flat" size="sm">
                {file.file_type}
              </Chip>
            </TableCell>
            <TableCell>
              <FileSizeFormatter bytes={file.file_size} />
            </TableCell>
            <TableCell>{file.user.fullName}</TableCell>
            <TableCell>
              <DateFormatter date={file.created_at} format="medium" />
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
