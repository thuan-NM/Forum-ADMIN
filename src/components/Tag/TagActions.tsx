import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { Tag } from '../../store/interfaces/tagInterfaces';


interface TagActionsProps {
    tag: Tag;
    onEdit: (tag: Tag) => void;
    onDelete: (tag: Tag) => void;
}

const TagActions: React.FC<TagActionsProps> = ({ tag, onEdit, onDelete }) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <Icon icon="lucide:more-vertical" className="text-default-500" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Tag actions">
                <DropdownItem key="edit"
                    startContent={<Icon icon="lucide:edit" />}
                    onPress={() => onEdit(tag)}
                >
                    Edit
                </DropdownItem>
                <DropdownItem key="delete"
                    startContent={<Icon icon="lucide:trash" />}
                    color="danger"
                    onPress={() => onDelete(tag)}
                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default TagActions;