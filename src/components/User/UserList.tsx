import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, Chip } from '@heroui/react';
import UserActions from './UserActions';
import type { User } from '../../store/interfaces/userInterfaces';

interface UserListProps {
    users: User[];
    loading: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onEditUser?: (user: User) => void;
    onBanUnbanUser?: (user: User) => void;
    onDeleteUser?: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({
    users,
    loading,
    page,
    totalPages,
    onPageChange,
    onEditUser = () => { },
    onBanUnbanUser = () => { },
    onDeleteUser = () => { }
}) => {
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
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="h-[400px] flex items-center justify-center">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    return (
        <Table
            aria-label="Users table"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={totalPages}
                        onChange={onPageChange}
                    />
                </div>
            }
            classNames={{
                wrapper: "min-h-[400px]",
            }}
            className='p-4'
            removeWrapper
        >
            <TableHeader>
                <TableColumn>USERNAME</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>JOINED</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No users found"}>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            <Chip
                                color={getRoleColor(user.role)}
                                variant="flat"
                                size="sm"
                            >
                                {user.role}
                            </Chip>
                        </TableCell>
                        <TableCell>
                            <Chip
                                color={getStatusColor(user.status)}
                                variant="dot"
                                size="sm"
                            >
                                {user.status}
                            </Chip>
                        </TableCell>
                        <TableCell>{formatDate(user.createdAt.toString())}</TableCell>
                        <TableCell>
                            <UserActions
                                user={user}
                                onEdit={onEditUser}
                                onBanUnban={onBanUnbanUser}
                                onDelete={onDeleteUser}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UserList;