import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from '@heroui/react';
import UserActions from './UserActions';
import type { UserResponse } from '../../store/interfaces/userInterfaces';
import { RoleChip, StatusChip } from '../Common';

interface UserTabletProps {
    users: UserResponse[];
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onEditUser?: (user: UserResponse) => void;
    onBanUnbanUser?: (user: UserResponse) => void;
    onDeleteUser?: (user: UserResponse) => void;
}

const UserTable: React.FC<UserTabletProps> = ({
    users,
    page,
    totalPages,
    onPageChange,
    onEditUser = () => { },
    onBanUnbanUser = () => { },
    onDeleteUser = () => { }
}) => {


    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };


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
                <TableColumn>FULLNAME</TableColumn>
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
                        <TableCell>{user.fullName}</TableCell>
                        <TableCell>
                            <RoleChip role={user.role} />
                        </TableCell>
                        <TableCell>
                            <StatusChip type='user' status={user.status} />
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

export default UserTable;