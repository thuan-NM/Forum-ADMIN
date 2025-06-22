import React from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import type { TopicResponse } from "../../store/interfaces/topicInterfaces";
import { useDeleteTopic } from "../../hooks/topics/useDeleteTopic";

interface TopicActionsProps {
  topic: TopicResponse;
  onEdit: (topic: TopicResponse) => void;
}

const TopicActions: React.FC<TopicActionsProps> = ({ topic, onEdit }) => {
  const { DeleteTopic } = useDeleteTopic();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <Icon icon="lucide:more-vertical" className="text-default-500" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Topic actions">
        <DropdownItem
          key="edit"
          startContent={<Icon icon="lucide:edit" />}
          onPress={() => onEdit(topic)}
        >
          Edit
        </DropdownItem>
        <DropdownItem
          key="delete"
          startContent={<Icon icon="lucide:trash" />}
          color="danger"
          onPress={() => DeleteTopic(topic.id)}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default TopicActions;
