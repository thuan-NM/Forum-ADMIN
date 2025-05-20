import React from 'react';
import { Card } from '@heroui/react';
import { useDisclosure } from '@heroui/react';

import type { Topic } from '../store/interfaces/topicInterfaces';
import TopicSearch from '../components/Topic/TopicSearch';
import TopicList from '../components/Topic/TopicList';
import TopicForm from '../components/Topic/TopicForm';

const Topics: React.FC = () => {
    const [topics, setTopics] = React.useState<Topic[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');

    // Topic form modal state
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formMode, setFormMode] = React.useState<'create' | 'edit'>('create');
    const [selectedTopic, setSelectedTopic] = React.useState<Topic | undefined>(undefined);

    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchTopics = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch this data from your API
                // const response = await axios.get(`http://localhost:3000/api/topics?page=${page}&limit=${rowsPerPage}&search=${searchQuery}`);
                // setTopics(response.data.topics);
                // setTotalPages(Math.ceil(response.data.total / rowsPerPage));

                // Simulating API response with mock data
                setTimeout(() => {
                    const topicNames = [
                        'Programming Languages', 'Web Development', 'Mobile Development',
                        'Data Science', 'Machine Learning', 'DevOps', 'Cloud Computing',
                        'Cybersecurity', 'Blockchain', 'Game Development', 'UI/UX Design',
                        'Career Advice', 'Software Architecture', 'Databases', 'Networking',
                        'Operating Systems'
                    ];

                    const mockTopics: Topic[] = topicNames.map((name, i) => ({
                        id: `topic-${i + 1}`,
                        name,
                        description: `Discussion forum for ${name.toLowerCase()} related questions and answers.`,
                        questionsCount: Math.floor(Math.random() * 500),
                        createdAt: new Date(Date.now() - i * 86400000 * 5),
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
        setFormMode('create');
        setSelectedTopic(undefined);
        onOpen();
    };

    const handleEditTopic = (topic: Topic) => {
        setFormMode('edit');
        setSelectedTopic(topic);
        onOpen();
    };

    const handleDeleteTopic = (topic: Topic) => {
        // In a real app, you would call your API to delete the topic
        console.log('Deleting topic:', topic);
    };

    const handleSubmitTopicForm = (topicData: { name: string; description: string }) => {
        // In a real app, you would call your API to create/update the topic
        console.log(`${formMode === 'create' ? 'Creating' : 'Updating'} topic:`, topicData);
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
                <TopicSearch
                    searchQuery={searchQuery}
                    onSearchChange={handleSearch}
                    onAddTopic={handleAddTopic}
                />

                <Card className="w-full p-4" radius='sm'>
                    <TopicList
                        topics={topics}
                        loading={loading}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        onEditTopic={handleEditTopic}
                        onDeleteTopic={handleDeleteTopic}
                    />
                </Card>
            </div>

            <TopicForm
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                mode={formMode}
                topic={selectedTopic}
                onSubmit={handleSubmitTopicForm}
            />
        </div>
    );
};

export default Topics;