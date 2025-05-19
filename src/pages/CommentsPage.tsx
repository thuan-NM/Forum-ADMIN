import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner, Chip, Card } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Comment {
    id: string;
    content: string;
    author: {
        id: string;
        username: string;
    };
    post: {
        id: string;
        title: string;
    };
    status: 'active' | 'flagged' | 'deleted';
    createdAt: string;
}

const CommentsPage: React.FC = () => {
    const [comments, setComments] = React.useState<Comment[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');

    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch this data from your API
                // const response = await axios.get(`http://localhost:3000/api/comments?page=${page}&limit=${rowsPerPage}&search=${searchQuery}`);
                // setComments(response.data.comments);
                // setTotalPages(Math.ceil(response.data.total / rowsPerPage));

                // Simulating API response with mock data
                setTimeout(() => {
                    const mockComments: Comment[] = Array.from({ length: 40 }, (_, i) => ({
                        id: `comment-${i + 1}`,
                        content: `This is comment ${i + 1}. ${i % 3 === 0 ? 'Great post!' : i % 3 === 1 ? 'Thanks for sharing this information.' : 'I have a question about this topic...'}`,
                        author: {
                            id: `user-${(i % 10) + 1}`,
                            username: `user${(i % 10) + 1}`,
                        },
                        post: {
                            id: `post-${(i % 15) + 1}`,
                            title: `How to master ${i % 2 === 0 ? 'React' : 'JavaScript'} ${i + 1}`,
                        },
                        status: i % 7 === 0 ? 'flagged' : i % 13 === 0 ? 'deleted' : 'active',
                        createdAt: new Date(Date.now() - i * 3600000).toISOString(),
                    }));

                    const filteredComments = searchQuery
                        ? mockComments.filter(comment =>
                            comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            comment.author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            comment.post.title.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        : mockComments;

                    const paginatedComments = filteredComments.slice((page - 1) * rowsPerPage, page * rowsPerPage);
                    setComments(paginatedComments);
                    setTotalPages(Math.ceil(filteredComments.length / rowsPerPage));
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching comments:', err);
                setError('Failed to load comments');
                setLoading(false);
            }
        };

        fetchComments();
    }, [page, searchQuery]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1); // Reset to first page on new search
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'flagged':
                return 'warning';
            case 'deleted':
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
            hour: '2-digit',
            minute: '2-digit'
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
                <div className="flex justify-between items-center gap-3 flex-wrap">
                    <Input
                        placeholder="Search comments..."
                        value={searchQuery}
                        onValueChange={handleSearch}
                        startContent={<Icon icon="lucide:search" className="opacity-50" />}
                        className="w-full sm:max-w-xs bg-content1 rounded-lg"
                        radius='sm'
                        variant='bordered'
                    />
                </div>

                <Card className="w-full" radius='sm'>
                    {loading ? (
                        <div className="h-[400px] flex items-center justify-center">
                            <Spinner size="lg" color="primary" />
                        </div>
                    ) : (
                        <Table
                            aria-label="Comments table"
                            className='p-4'
                            radius='sm'
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
                            removeWrapper
                        >
                            <TableHeader>
                                <TableColumn>CONTENT</TableColumn>
                                <TableColumn>AUTHOR</TableColumn>
                                <TableColumn>POST</TableColumn>
                                <TableColumn>STATUS</TableColumn>
                                <TableColumn>CREATED</TableColumn>
                                <TableColumn>ACTIONS</TableColumn>
                            </TableHeader>
                            <TableBody emptyContent={"No comments found"}>
                                {comments.map((comment) => (
                                    <TableRow key={comment.id}>
                                        <TableCell className="max-w-xs truncate">{comment.content}</TableCell>
                                        <TableCell>{comment.author.username}</TableCell>
                                        <TableCell className="max-w-xs truncate">{comment.post.title}</TableCell>
                                        <TableCell>
                                            <Chip
                                                color={getStatusColor(comment.status)}
                                                variant="dot"
                                                size="sm"
                                            >
                                                {comment.status}
                                            </Chip>
                                        </TableCell>
                                        <TableCell>{formatDate(comment.createdAt)}</TableCell>
                                        <TableCell>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button isIconOnly size="sm" variant="light">
                                                        <Icon icon="lucide:more-vertical" />
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Comment actions">
                                                    <DropdownItem key="view" startContent={<Icon icon="lucide:eye" />}>
                                                        View
                                                    </DropdownItem>
                                                    {comment.status === 'flagged' ? (
                                                        <DropdownItem key="approve" startContent={<Icon icon="lucide:check" />} color="success">
                                                            Approve
                                                        </DropdownItem>
                                                    ) : (
                                                        <DropdownItem key="Flag" startContent={<Icon icon="lucide:flag" />} color="warning">
                                                            Flag
                                                        </DropdownItem>
                                                    )}
                                                    {comment.status !== 'deleted' ? (
                                                        <DropdownItem key="deleted" startContent={<Icon icon="lucide:trash" />} color="danger">
                                                            Delete
                                                        </DropdownItem>
                                                    ) : (
                                                        <DropdownItem key="restore" startContent={<Icon icon="lucide:rotate-ccw" />} color="primary">
                                                            Restore
                                                        </DropdownItem>
                                                    )}
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

export default CommentsPage;