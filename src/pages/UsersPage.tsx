import React from 'react';
import { Card } from '@heroui/react';

import { useDisclosure } from '@heroui/react';
import type { User, UserCreateDto, UserUpdateDto } from '../store/interfaces/userInterfaces';
import UserSearch from '../components/User/UserSearch';
import UserList from '../components/User/UserList';
import UserForm from '../components/User/UserForm';

const Users: React.FC = () => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formMode, setFormMode] = React.useState<'create' | 'edit'>('create');
    const [selectedUser, setSelectedUser] = React.useState<User | undefined>(undefined);

    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch this data from your API
                // const response = await axios.get(`http://localhost:3000/api/users?page=${page}&limit=${rowsPerPage}&search=${searchQuery}`);
                // setUsers(response.data.users);
                // setTotalPages(Math.ceil(response.data.total / rowsPerPage));

                // Simulating API response with mock data
                setTimeout(() => {
                    const mockUsers: User[] = Array.from({ length: 30 }, (_, i) => ({
                        id: `user-${i + 1}`,
                        username: `user${i + 1}`,
                        email: `user${i + 1}@example.com`,
                        role: i === 0 ? 'admin' : i % 5 === 0 ? 'moderator' : 'user',
                        status: i % 7 === 0 ? 'banned' : i % 5 === 0 ? 'inactive' : 'active',
                        createdAt: new Date(Date.now() - i * 86400000),
                        updatedAt: new Date(Date.now() - i * 86400000),
                        emailVerified: true,
                        postsCount: Math.floor(Math.random() * 50),
                        commentsCount: Math.floor(Math.random() * 100)
                    }));

                    const filteredUsers = searchQuery
                        ? mockUsers.filter(user =>
                            user.username.includes(searchQuery) ||
                            user.email.includes(searchQuery)
                        )
                        : mockUsers;

                    const paginatedUsers = filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);
                    setUsers(paginatedUsers);
                    setTotalPages(Math.ceil(filteredUsers.length / rowsPerPage));
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to load users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page, searchQuery]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1); 
    };

    const handleAddUser = () => {
        setFormMode('create');
        setSelectedUser(undefined);
        onOpen();
    };

    const handleEditUser = (user: User) => {
        setFormMode('edit');
        setSelectedUser(user);
        onOpen();
    };

    const handleBanUnbanUser = (user: User) => {
        console.log(`${user.status === 'banned' ? 'Unbanning' : 'Banning'} user:`, user);
    };

    const handleDeleteUser = (user: User) => {
        console.log('Deleting user:', user);
    };

    const handleSubmitUserForm = (userData: UserCreateDto | UserUpdateDto) => {
        console.log(`${formMode === 'create' ? 'Creating' : 'Updating'} user:`, userData);
    };

    if (error) {
        return (
            <div className="p-4 bg-danger-50 text-danger-500 rounded-md">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <UserSearch
                    searchQuery={searchQuery}
                    onSearchChange={handleSearch}
                    onAddUser={handleAddUser}
                />

                <Card className="w-full" radius='sm'>
                    <UserList
                        users={users}
                        loading={loading}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        onEditUser={handleEditUser}
                        onBanUnbanUser={handleBanUnbanUser}
                        onDeleteUser={handleDeleteUser}
                    />
                </Card>
            </div>

            <UserForm
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                mode={formMode}
                user={selectedUser}
                onSubmit={handleSubmitUserForm}
            />
        </div>
    );
};

export default Users;