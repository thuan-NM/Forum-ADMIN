import React from "react";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface FileFiltersProps {
  searchQuery: string;
  fileType: string;
  view: "grid" | "list";
  onSearchChange: (value: string) => void;
  onFileTypeChange: (type: string) => void;
  onViewChange: (view: "grid" | "list") => void;
  onUpload?: () => void;
}

const FileFilters: React.FC<FileFiltersProps> = ({
  searchQuery,
  fileType,
  view,
  onSearchChange,
  onFileTypeChange,
  onViewChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 flex-wrap">
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Input
          placeholder="Search files..."
          value={searchQuery}
          onValueChange={onSearchChange}
          startContent={
            <Icon icon="lucide:search" className="text-default-400" />
          }
          className="w-full sm:w-64  bg-content1 rounded-lg"
          variant="bordered"
        />

        <div className="flex gap-2 items-center">
          <Button
            variant={fileType === "all" ? "solid" : "flat"}
            color={fileType === "all" ? "primary" : "default"}
            onPress={() => onFileTypeChange("all")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={fileType === "image" ? "solid" : "flat"}
            color={fileType === "image" ? "primary" : "default"}
            onPress={() => onFileTypeChange("image")}
            size="sm"
            startContent={<Icon icon="lucide:image" />}
          >
            Images
          </Button>
          <Button
            variant={fileType === "document" ? "solid" : "flat"}
            color={fileType === "document" ? "primary" : "default"}
            onPress={() => onFileTypeChange("document")}
            size="sm"
            startContent={<Icon icon="lucide:file-text" />}
          >
            Docs
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          isIconOnly
          variant={view === "grid" ? "solid" : "flat"}
          color={view === "grid" ? "primary" : "default"}
          onPress={() => onViewChange("grid")}
          size="sm"
        >
          <Icon icon="lucide:grid" />
        </Button>
        <Button
          isIconOnly
          variant={view === "list" ? "solid" : "flat"}
          color={view === "list" ? "primary" : "default"}
          onPress={() => onViewChange("list")}
          size="sm"
        >
          <Icon icon="lucide:list" />
        </Button>
      </div>
    </div>
  );
};

export default FileFilters;
