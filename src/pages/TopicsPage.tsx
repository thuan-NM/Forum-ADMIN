import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Card } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Topic {
    id: string;
    name: string;
    description: string;
    postsCount: number;
    createdAt: string;
}

const TopicsPage: React.FC = () => {
    const [topics, setTopics] = React.useState<Topic[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');

    // Modal states
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalMode, setModalMode] = React.useState<'create' | 'edit'>('create');
    const [currentTopic, setCurrentTopic] = React.useState<Topic | null>(null);
    const [topicName, setTopicName] = React.useState<string>('');
    const [topicDescription, setTopicDescription] = React.useState<string>('');

    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchTopics = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch this data from your API
                // const response = await axios.get(`http://localhost:3000/api/categories?page=${page}&limit=${rowsPerPage}&search=${searchQuery}`);
                // setCategories(response.data.categories);
                // setTotalPages(Math.ceil(response.data.total / rowsPerPage));

                // Simulating API response with mock data
                setTimeout(() => {
                    const topicNames = [
                        'General Discussion', 'Announcements', 'JavaScript', 'TypeScript',
                        'React', 'Vue', 'Angular', 'Node.js', 'CSS', 'HTML',
                        'Backend Development', 'Frontend Development', 'Mobile Development',
                        'DevOps', 'Career Advice', 'Job Listings'
                    ];

                    const mockTopics: Topic[] = topicNames.map((name, i) => ({
                        id: `topic-${i + 1}`,
                        name,
                        description: `A place to discuss ${name.toLowerCase()} related topics.`,
                        postsCount: Math.floor(Math.random() * 500),
                        createdAt: new Date(Date.now() - i * 86400000 * 5).toISOString(),
                    }));

                    const filteredTopics = searchQuery
                        ? mockTopics.filter(topic =>
                            topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            topic.description.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        : mockTopics;

                    const paginatedTopics = filteredTopics.slice((page - 1) * rowsPerPage, page * rowsPerPage);
                    setTopics(paginatedTopics);
                    setTotalPages(Math.ceil(filteredTopics.length / rowsPerPage));
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching topics:', err);
                setError('Failed to load topics');
                setLoading(false);
            }
        };

        fetchTopics();
    }, [page, searchQuery]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1); // Reset to first page on new search
    };

    const handleAddTopic = () => {
        setModalMode('create');
        setTopicName('');
        setTopicDescription('');
        onOpen();
    };

    const handleEditTopic = (topic: Topic) => {
        setModalMode('edit');
        setCurrentTopic(topic);
        setTopicName(topic.name);
        setTopicDescription(topic.description);
        onOpen();
    };

    const handleSaveTopic = () => {
        console.log('Saving topic:', { name: topicName, description: topicDescription });

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
                        placeholder="Search topics..."
                        value={searchQuery}
                        onValueChange={handleSearch}
                        startContent={<Icon icon="lucide:search" className="text-default-400" />}
                        className="w-full sm:max-w-xs bg-content1 rounded-lg"
                        variant='bordered'
                        radius='sm'
                    />

                    <Button color="primary" startContent={<Icon icon="lucide:plus" />} onPress={handleAddTopic}>
                        Add Topic
                    </Button>
                </div>

                <Card className="w-full" radius='sm'>
                    {loading ? (
                        <div className="h-[400px] flex items-center justify-center">
                            <Spinner size="lg" color="primary" />
                        </div>
                    ) : (
                        <Table
                            aria-label="Topics table"
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
                                <TableColumn>DESCRIPTION</TableColumn>
                                <TableColumn>POSTS</TableColumn>
                                <TableColumn>CREATED</TableColumn>
                                <TableColumn>ACTIONS</TableColumn>
                            </TableHeader>
                            <TableBody emptyContent={"No topics found"}>
                                {topics.map((topic) => (
                                    <TableRow key={topic.id}>
                                        <TableCell className="font-medium">{topic.name}</TableCell>
                                        <TableCell className="max-w-xs truncate">{topic.description}</TableCell>
                                        <TableCell>{topic.postsCount}</TableCell>
                                        <TableCell>{formatDate(topic.createdAt)}</TableCell>
                                        <TableCell>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button isIconOnly size="sm" variant="light">
                                                        <Icon icon="lucide:more-vertical" className="text-default-500" />
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Topic actions">
                                                    <DropdownItem key="edit"
                                                        startContent={<Icon icon="lucide:edit" />}
                                                        onPress={() => handleEditTopic(topic)}
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

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                {modalMode === 'create' ? 'Create Topic' : 'Edit Topic'}
                            </ModalHeader>
                            <ModalBody>
                                <div className="space-y-4">
                                    <Input
                                        label="Topic Name"
                                        placeholder="Enter topic name"
                                        value={topicName}
                                        onValueChange={setTopicName}
                                    />

                                    <Input
                                        label="Description"
                                        placeholder="Enter topic description"
                                        value={topicDescription}
                                        onValueChange={setTopicDescription}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleSaveTopic}>
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

export default TopicsPage;