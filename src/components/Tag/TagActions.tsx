import React from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import type { TagResponse } from "../../store/interfaces/tagInterfaces";
import { useDeleteTag } from "../../hooks/tags/useDeleteTag";

interface TagActionsProps {
  tag: TagResponse;
  onEdit: (tag: TagResponse) => void;
}

const TagActions: React.FC<TagActionsProps> = ({ tag, onEdit }) => {
  const { DeleteTag } = useDeleteTag();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <Icon icon="lucide:more-vertical" className="text-default-500" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Tag actions">
        <DropdownItem
          key="edit"
          startContent={<Icon icon="lucide:edit" />}
          onPress={() => onEdit(tag)}
        >
          Edit
        </DropdownItem>
        <DropdownItem
          key="delete"
          startContent={<Icon icon="lucide:trash" />}
          color="danger"
          onPress={() => DeleteTag(tag.id)}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default TagActions;
