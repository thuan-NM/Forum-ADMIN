import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { Topic } from '../../store/interfaces/topicInterfaces';


interface TopicActionsProps {
    topic: Topic;
    onEdit: (topic: Topic) => void;
    onDelete: (topic: Topic) => void;
}

const TopicActions: React.FC<TopicActionsProps> = ({ topic, onEdit, onDelete }) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <Icon icon="lucide:more-vertical" className="text-default-500" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Topic actions">
                <DropdownItem key="edit"
                    startContent={<Icon icon="lucide:edit" />}
                    onPress={() => onEdit(topic)}
                >
                    Edit
                </DropdownItem>
                <DropdownItem key="delete"
                    startContent={<Icon icon="lucide:trash" />}
                    color="danger"
                    onPress={() => onDelete(topic)}
                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default TopicActions;