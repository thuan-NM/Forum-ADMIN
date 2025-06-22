import React from "react";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface TagSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddTag: () => void;
}

const TagSearch: React.FC<TagSearchProps> = ({
  searchQuery,
  onSearchChange,
  onAddTag,
}) => {
  return (
    <div className="flex justify-between items-center gap-3 flex-wrap">
      <Input
        placeholder="Search tags..."
        value={searchQuery}
        onValueChange={onSearchChange}
        startContent={
          <Icon icon="lucide:search" className="text-default-400" />
        }
        className="w-full sm:max-w-xs bg-content1 rounded-lg"
        variant="bordered"
        radius="sm"
        isClearable
      />

      <Button
        color="primary"
        startContent={<Icon icon="lucide:plus" />}
        onPress={onAddTag}
      >
        Add Tag
      </Button>
    </div>
  );
};

export default TagSearch;
