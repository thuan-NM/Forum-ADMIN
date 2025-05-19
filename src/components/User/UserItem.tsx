import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, TableCell, TableRow } from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import type { User } from '../../store/interfaces/userInterfaces'

interface UserProp {
    user: User
}
const UserItem: React.FC<UserProp> = ({ user }) => {
    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'danger';
            case 'moderator':
                return 'warning';
            default:
                return 'primary';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'warning';
            case 'banned':
                return 'danger';
            default:
                return 'default';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <TableRow key={user.id}>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
                <Chip color={getRoleColor(user.role)} variant="flat" size="sm">
                    {user.role}
                </Chip>
            </TableCell>
            <TableCell>
                <Chip color={getStatusColor(user.status)} variant="dot" size="sm">
                    {user.status}
                </Chip>
            </TableCell>
            <TableCell>{formatDate(user.createdAt)}</TableCell>
            <TableCell>
                <Dropdown>
                    <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                            <Icon icon="lucide:more-vertical" className="text-default-500" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User actions">
                        <DropdownItem key="view" startContent={<Icon icon="lucide:eye" />}>
                            View
                        </DropdownItem>
                        <DropdownItem key="edit" startContent={<Icon icon="lucide:edit" />}>
                            Edit
                        </DropdownItem>
                        {user.status !== 'banned' ? (
                            <DropdownItem
                                key="ban"
                                startContent={<Icon icon="lucide:ban" />}
                                color="danger"
                            >
                                Ban
                            </DropdownItem>
                        ) : (
                            <DropdownItem
                                key="unban"
                                startContent={<Icon icon="lucide:check-circle" />}
                                color="success"
                            >
                                Unban
                            </DropdownItem>
                        )}
                        <DropdownItem
                            key="delete"
                            startContent={<Icon icon="lucide:trash" />}
                            color="danger"
                        >
                            Delete
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </TableCell>
        </TableRow>
    );
};

export default UserItem;