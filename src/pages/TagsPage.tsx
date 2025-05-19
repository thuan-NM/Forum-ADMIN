import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Card } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Tag {
    id: string;
    name: string;
    postsCount: number;
    createdAt: string;
}

const TagsPage: React.FC = () => {
    const [tags, setTags] = React.useState<Tag[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');

    // Modal states
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalMode, setModalMode] = React.useState<'create' | 'edit'>('create');
    const [currentTag, setCurrentTag] = React.useState<Tag | null>(null);
    const [tagName, setTagName] = React.useState<string>('');

    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchTags = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch this data from your API
                // const response = await axios.get(`http://localhost:3000/api/tags?page=${page}&limit=${rowsPerPage}&search=${searchQuery}`);
                // setTags(response.data.tags);
                // setTotalPages(Math.ceil(response.data.total / rowsPerPage));

                // Simulating API response with mock data
                setTimeout(() => {
                    const tagNames = [
                        'javascript', 'react', 'vue', 'angular', 'node', 'express',
                        'mongodb', 'sql', 'nosql', 'frontend', 'backend', 'fullstack',
                        'css', 'html', 'typescript', 'python', 'java', 'php', 'ruby',
                        'go', 'rust', 'c#', 'aws', 'docker', 'kubernetes', 'devops'
                    ];

                    const mockTags: Tag[] = tagNames.map((name, i) => ({
                        id: `tag-${i + 1}`,
                        name,
                        postsCount: Math.floor(Math.random() * 200),
                        createdAt: new Date(Date.now() - i * 86400000 * 3).toISOString(),
                    }));

                    const filteredTags = searchQuery
                        ? mockTags.filter(tag =>
                            tag.name.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        : mockTags;

                    const paginatedTags = filteredTags.slice((page - 1) * rowsPerPage, page * rowsPerPage);
                    setTags(paginatedTags);
                    setTotalPages(Math.ceil(filteredTags.length / rowsPerPage));
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching tags:', err);
                setError('Failed to load tags');
                setLoading(false);
            }
        };

        fetchTags();
    }, [page, searchQuery]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1); // Reset to first page on new search
    };

    const handleAddTag = () => {
        setModalMode('create');
        setTagName('');
        onOpen();
    };

    const handleEditTag = (tag: Tag) => {
        setModalMode('edit');
        setCurrentTag(tag);
        setTagName(tag.name);
        onOpen();
    };

    const handleSaveTag = () => {
        // In a real app, you would call your API to save the tag
        console.log('Saving tag:', { name: tagName });

        // Close the modal
        onOpenChange();
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
                <div className="flex justify-between items-center gap-3 flex-wrap">
                    <Input
                        placeholder="Search tags..."
                        value={searchQuery}
                        onValueChange={handleSearch}
                        startContent={<Icon icon="lucide:search" className="text-default-400" />}
                        className="w-full sm:max-w-xs bg-content1 rounded-lg"
                        variant='bordered'
                        radius='sm'
                    />

                    <Button color="primary" startContent={<Icon icon="lucide:plus" />} onPress={handleAddTag}>
                        Add Tag
                    </Button>
                </div>

                <Card className="w-full" radius='sm'>
                    {loading ? (
                        <div className="h-[400px] flex items-center justify-center">
                            <Spinner size="lg" color="primary" />
                        </div>
                    ) : (
                        <Table
                            aria-label="Tags table"
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
                                <TableColumn>NAME</TableColumn>
                                <TableColumn>POSTS</TableColumn>
                                <TableColumn>CREATED</TableColumn>
                                <TableColumn>ACTIONS</TableColumn>
                            </TableHeader>
                            <TableBody emptyContent={"No tags found"}>
                                {tags.map((tag) => (
                                    <TableRow key={tag.id}>
                                        <TableCell>
                                            <Chip
                                                color="primary"
                                                variant="flat"
                                                size="sm"
                                            >
                                                {tag.name}
                                            </Chip>
                                        </TableCell>
                                        <TableCell>{tag.postsCount}</TableCell>
                                        <TableCell>{formatDate(tag.createdAt)}</TableCell>
                                        <TableCell>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button isIconOnly size="sm" variant="light">
                                                        <Icon icon="lucide:more-vertical" className="text-default-500" />
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Tag actions">
                                                    <DropdownItem key="edit"
                                                        startContent={<Icon icon="lucide:edit" />}
                                                        onPress={() => handleEditTag(tag)}
                                                    >
                                                        Edit
                                                    </DropdownItem>
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

            {/* Tag Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                {modalMode === 'create' ? 'Create Tag' : 'Edit Tag'}
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Tag Name"
                                    placeholder="Enter tag name"
                                    value={tagName}
                                    onValueChange={setTagName}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleSaveTag}>
                                    {modalMode === 'create' ? 'Create' : 'Save'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default TagsPage;