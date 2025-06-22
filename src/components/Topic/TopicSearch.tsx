import React from "react";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface TopicSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddTopic: () => void;
}

const TopicSearch: React.FC<TopicSearchProps> = ({
  searchQuery,
  onSearchChange,
  onAddTopic,
}) => {
  return (
    <div className="flex justify-between items-center gap-3 flex-wrap">
      <Input
        placeholder="Search topics..."
        value={searchQuery}
        onValueChange={onSearchChange}
        startContent={<Icon icon="lucide:search" className="opacity-50" />}
        className="w-full sm:max-w-xs bg-content1 rounded-lg"
        variant="bordered"
        radius="sm"
        isClearable
      />

      <Button
        color="primary"
        startContent={<Icon icon="lucide:plus" />}
        onPress={onAddTopic}
      >
        Add Topic
      </Button>
    </div>
  );
};

export default TopicSearch;
