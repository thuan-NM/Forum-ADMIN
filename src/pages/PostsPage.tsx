import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner, Chip, Select, SelectItem, Card } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Post {
    id: string;
    title: string;
    author: {
        id: string;
        username: string;
    };
    category: {
        id: string;
        name: string;
    };
    status: 'published' | 'draft' | 'archived';
    commentsCount: number;
    createdAt: string;
}

const PostsPage: React.FC = () => {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [statusFilter, setStatusFilter] = React.useState<string>('all');

    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch this data from your API
                // const response = await axios.get(`http://localhost:3000/api/posts?page=${page}&limit=${rowsPerPage}&search=${searchQuery}&status=${statusFilter}`);
                // setPosts(response.data.posts);
                // setTotalPages(Math.ceil(response.data.total / rowsPerPage));

                // Simulating API response with mock data
                setTimeout(() => {
                    const categories = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS', 'HTML'];
                    const statuses = ['published', 'draft', 'archived'];

                    const mockPosts: Post[] = Array.from({ length: 50 }, (_, i) => ({
                        id: `post-${i + 1}`,
                        title: `Post ${i + 1}: How to ${i % 2 === 0 ? 'master' : 'learn'} ${categories[i % categories.length]}`,
                        author: {
                            id: `user-${(i % 10) + 1}`,
                            username: `user${(i % 10) + 1}`,
                        },
                        category: {
                            id: `category-${(i % categories.length) + 1}`,
                            name: categories[i % categories.length],
                        },
                        status: statuses[i % statuses.length] as 'published' | 'draft' | 'archived',
                        commentsCount: Math.floor(Math.random() * 50),
                        createdAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
                    }));

                    let filteredPosts = mockPosts;

                    // Apply search filter
                    if (searchQuery) {
                        filteredPosts = filteredPosts.filter(post =>
                            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.author.username.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                    }

                    // Apply status filter
                    if (statusFilter !== 'all') {
                        filteredPosts = filteredPosts.filter(post => post.status === statusFilter);
                    }

                    const paginatedPosts = filteredPosts.slice((page - 1) * rowsPerPage, page * rowsPerPage);
                    setPosts(paginatedPosts);
                    setTotalPages(Math.ceil(filteredPosts.length / rowsPerPage));
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to load posts');
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page, searchQuery, statusFilter]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1); // Reset to first page on new search
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        setPage(1); // Reset to first page on new filter
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'success';
            case 'draft':
                return 'warning';
            case 'archived':
                return 'default';
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 flex-wrap">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Input
                            placeholder="Search posts..."
                            value={searchQuery}
                            onValueChange={handleSearch}
                            startContent={<Icon icon="lucide:search" className="opacity-50" />}
                            className="w-full sm:w-64 !bg-content1 rounded-lg"
                            variant='bordered'
                            radius='sm'
                        />

                        <Select
                            placeholder="Filter by status "
                            selectedKeys={[statusFilter]}
                            className="w-full sm:w-40 !bg-content1 rounded-lg"
                            onChange={(e) => handleStatusChange(e.target.value)}
                            variant='bordered'
                            radius='sm'
                        >
                            <SelectItem key="all" textValue='All'>All</SelectItem>
                            <SelectItem key="published" textValue="Published">Published</SelectItem>
                            <SelectItem key="draft" textValue="Draft">Draft</SelectItem>
                            <SelectItem key="archived" textValue="Archived">Archived</SelectItem>
                        </Select>
                    </div>

                    <Button color="primary" startContent={<Icon icon="lucide:plus" />}>
                        Create Post
                    </Button>
                </div>

                <Card className="w-full" radius='sm'>
                    {loading ? (
                        <div className="h-[400px] flex items-center justify-center">
                            <Spinner size="lg" color="primary" />
                        </div>
                    ) : (
                        <Table
                            aria-label="Posts table"
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
                            radius='none'
                            removeWrapper
                        >
                            <TableHeader>
                                <TableColumn>TITLE</TableColumn>
                                <TableColumn>AUTHOR</TableColumn>
                                <TableColumn>CATEGORY</TableColumn>
                                <TableColumn>STATUS</TableColumn>
                                <TableColumn>COMMENTS</TableColumn>
                                <TableColumn>CREATED</TableColumn>
                                <TableColumn>ACTIONS</TableColumn>
                            </TableHeader>
                            <TableBody emptyContent={"No posts found"}>
                                {posts.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell className="max-w-xs truncate">{post.title}</TableCell>
                                        <TableCell>{post.author.username}</TableCell>
                                        <TableCell>
                                            <Chip
                                                color="primary"
                                                variant="flat"
                                                size="sm"
                                            >
                                                {post.category.name}
                                            </Chip>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                color={getStatusColor(post.status)}
                                                variant="dot"
                                                size="sm"
                                            >
                                                {post.status}
                                            </Chip>
                                        </TableCell>
                                        <TableCell>{post.commentsCount}</TableCell>
                                        <TableCell>{formatDate(post.createdAt)}</TableCell>
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
                                                    {post.status !== 'archived' ? (
                                                        <DropdownItem key="archived" startContent={<Icon icon="lucide:ban" />} color="danger">
                                                            Archive
                                                        </DropdownItem>
                                                    ) : (
                                                        <DropdownItem key="restore" startContent={<Icon icon="lucide:check-circle" />} color="success">
                                                            Restore
                                                        </DropdownItem>
                                                    )}
                                                    <DropdownItem key="delete" startContent={<Icon icon="lucide:trash" />} color="danger">
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

export default PostsPage;