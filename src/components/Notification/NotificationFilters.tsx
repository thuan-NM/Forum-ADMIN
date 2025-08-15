import React from "react";
import { Input } from "@heroui/react";
import { Icon } from "@iconify/react";

interface NotificationFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex justify-between items-center gap-3 flex-wrap">
      <Input
        placeholder="Tìm thông báo..."
        value={searchQuery}
        onValueChange={onSearchChange}
        startContent={
          <Icon icon="lucide:search" className="text-default-400" />
        }
        className="w-full sm:max-w-xs bg-content1 rounded-lg"
        variant="bordered"
        radius="sm"
      />
    </div>
  );
};

export default NotificationFilters;
