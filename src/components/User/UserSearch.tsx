import React from "react";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface UserSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddUser: () => void;
}

const UserSearch: React.FC<UserSearchProps> = ({
  searchQuery,
  onSearchChange,
  onAddUser,
}) => {
  return (
    <div className="flex justify-between items-center gap-3 flex-wrap">
      <Input
        placeholder="Tìm kiếm người dùng..."
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
        onPress={onAddUser}
      >
        Thêm người dùng
      </Button>
    </div>
  );
};

export default UserSearch;
