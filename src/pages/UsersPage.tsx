import React from 'react';
import { Table, TableHeader, TableColumn, Pagination, Input, Button, Spinner, Card, TableBody, TableRow, TableCell, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { User } from '../store/interfaces/userInterfaces'
const UsersPage: React.FC = () => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');

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
                        createdAt: new Date(Date.now() - i * 86400000).toISOString(),
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

    if (error) {
        return (
            <div className="p-4 bg-danger-50 text-danger-500 rounded-md">
                {error}
            </div>
        );
    }

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
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center gap-3 flex-wrap">
                    <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onValueChange={handleSearch}
                        startContent={<Icon icon="lucide:search" className="text-default-400" />}
                        className="w-full sm:max-w-xs bg-content1 rounded-lg"
                        variant='bordered'
                        radius='sm'
                    />

                    <Button color="primary" startContent={<Icon icon="lucide:plus" />}>
                        Add User
                    </Button>
                </div>

                <Card className="w-full" radius='sm'>
                    {loading ? (
                        <div className="h-[400px] flex items-center justify-center">
                            <Spinner size="lg" color="primary" />
                        </div>
                    ) : (
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
                                        onChange={setPage}
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
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default UsersPage;