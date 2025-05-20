import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { User } from '../../store/interfaces/userInterfaces';

interface UserActionsProps {
    user: User;
    onView?: (user: User) => void;
    onEdit?: (user: User) => void;
    onBanUnban?: (user: User) => void;
    onDelete?: (user: User) => void;
}

const UserActions: React.FC<UserActionsProps> = ({
    user,
    onView = () => { },
    onEdit = () => { },
    onBanUnban = () => { },
    onDelete = () => { }
}) => {
    
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <Icon icon="lucide:more-vertical" className="text-default-500" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User actions">
                <DropdownItem key="view"
                    startContent={<Icon icon="lucide:eye" />}
                    onPress={() => onView(user)}
                >
                    View
                </DropdownItem>
                <DropdownItem key="edit"
                    startContent={<Icon icon="lucide:edit" />}
                    onPress={() => onEdit(user)}
                >
                    Edit
                </DropdownItem>
                {user.status !== 'banned' ? (
                    <DropdownItem key="ban"
                        startContent={<Icon icon="lucide:ban" />}
                        color="danger"
                        onPress={() => onBanUnban(user)}
                    >
                        Ban
                    </DropdownItem>
                ) : (
                    <DropdownItem key="unban"
                        startContent={<Icon icon="lucide:check-circle" />}
                        color="success"
                        onPress={() => onBanUnban(user)}
                    >
                        Unban
                    </DropdownItem>
                )}
                <DropdownItem key="delete"
                    startContent={<Icon icon="lucide:trash" />}
                    color="danger"
                    onPress={() => onDelete(user)}
                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default UserActions;