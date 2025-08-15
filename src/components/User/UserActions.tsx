import React from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import type { User } from "../../store/interfaces/userInterfaces";
import { useUpdateUserStatus } from "../../hooks/users/useUpdateUserStatus";
import { useDeleteUser } from "../../hooks/users/useDeleteUser";

interface UserActionsProps {
  user: User;
  onEdit?: (user: User) => void;
}

const UserActions: React.FC<UserActionsProps> = ({
  user,
  onEdit = () => {},
}) => {
  const { UpdateUserStatus } = useUpdateUserStatus();
  const { DeleteUser } = useDeleteUser();
  const handleBanUnban = (status: string) => {
    UpdateUserStatus(user.id, status);
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <Icon icon="lucide:more-vertical" className="text-default-500" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User actions">
        <DropdownItem
          key="edit"
          startContent={<Icon icon="lucide:edit" />}
          onPress={() => onEdit(user)}
        >
          Chỉnh sửa
        </DropdownItem>
        {user.status !== "banned" ? (
          <DropdownItem
            key="ban"
            startContent={<Icon icon="lucide:ban" />}
            color="danger"
            onPress={() => handleBanUnban("ban")}
          >
            Vô hiệu hoá
          </DropdownItem>
        ) : (
          <DropdownItem
            key="unban"
            startContent={<Icon icon="lucide:check-circle" />}
            color="success"
            onPress={() => handleBanUnban("unban")}
          >
            Bỏ vô hiệu hoá
          </DropdownItem>
        )}
        <DropdownItem
          key="delete"
          startContent={<Icon icon="lucide:trash" />}
          color="danger"
          onPress={() => DeleteUser(user.id)}
        >
          Xoá
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserActions;
