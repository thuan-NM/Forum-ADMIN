import React from 'react';
import { Card } from '@heroui/react';
import type { QuestionResponse } from '../store/interfaces/questionInterfaces';
import QuestionList from '../components/Question/QuestionList';
import QuestionFilters from '../components/Question/QuestionFilters';

const QuestionsPage: React.FC = () => {

    const [questions, setQuestions] = React.useState<QuestionResponse[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [statusFilter, setStatusFilter] = React.useState<string>('all');
    const [topicFilter, setTopicFilter] = React.useState<string>('');

    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                setTimeout(() => {
                    const statuses = ['open', 'closed', 'solved', 'duplicate'];
                    const tags = ['javascript', 'react', 'node.js', 'typescript', 'css', 'html', 'mongodb', 'express'];
                    const topics = ['Programming Languages', 'Web Development', 'Mobile Development', 'Data Science', 'DevOps'];

                    const mockQuestions: QuestionResponse[] = Array.from({ length: 50 }, (_, i) => ({
                        id: `question-${i + 1}`,
                        title: `How to ${i % 2 === 0 ? 'implement' : 'fix'} ${tags[i % tags.length]} ${i % 3 === 0 ? 'problem' : 'feature'}?`,
                        content: `This is a sample question about ${tags[i % tags.length]}. I'm trying to ${i % 2 === 0 ? 'implement a new feature' : 'fix an issue'} but I'm facing some challenges...`,
                        slug: `how-to-${i % 2 === 0 ? 'implement' : 'fix'}-${tags[i % tags.length]}-${i % 3 === 0 ? 'problem' : 'feature'}-${i + 1}`,
                        author: {
                            id: `user-${(i % 10) + 1}`,
                            username: `user${(i % 10) + 1}`,
                            avatar: i % 5 === 0 ? `https://i.pravatar.cc/150?u=user${(i % 10) + 1}` : undefined,
                        },
                        topic: {
                            id: `topic-${(i % topics.length) + 1}`,
                            name: topics[i % topics.length],
                            slug: topics[i % topics.length].toLowerCase().replace(/\s+/g, '-'),
                        },
                        status: statuses[i % statuses.length] as 'open' | 'closed' | 'solved' | 'duplicate',
                        viewCount: Math.floor(Math.random() * 1000),
                        userVote: i % 5 === 0 ? 'up' : i % 7 === 0 ? 'down' : null,
                        answersCount: Math.floor(Math.random() * 15),
                        isFeatured: i % 10 === 0,
                        createdAt: new Date('2025-05-21T10:03:00+07:00'),
                        updatedAt: new Date(Date.now() - i * 86400000),
                        followCount: Math.floor(Math.random() * 1000),

                    }));

                    let filteredQuestions = mockQuestions;

                    if (searchQuery) {
                        filteredQuestions = filteredQuestions.filter(
                            (question) =>
                                question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                question.author.username.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                    }

                    if (statusFilter !== 'all') {
                        filteredQuestions = filteredQuestions.filter((question) => question.status === statusFilter);
                    }

                    if (topicFilter) {
                        filteredQuestions = filteredQuestions.filter((question) =>
                            question.topic.name === topicFilter
                        );
                    }

                    const paginatedQuestions = filteredQuestions.slice((page - 1) * rowsPerPage, page * rowsPerPage);
                    setQuestions(paginatedQuestions);
                    setTotalPages(Math.ceil(filteredQuestions.length / rowsPerPage));
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError('Failed to load questions');
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [page, searchQuery, statusFilter, topicFilter]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1);
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        setPage(1);
    };


    const handleTopicFilter = (value: string) => {
        setTopicFilter(value);
        setPage(1);
    };

    const handleDeleteQuestion = (question: QuestionResponse) => {
        console.log('Deleting question:', question);
    };

    const handleFeatureQuestion = (question: QuestionResponse) => {
        console.log('Featuring question:', question, !question.isFeatured);
    };

    const handleStatusChange = (question: QuestionResponse, status: string) => {
        console.log('Changing question status:', question, status);
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
                <QuestionFilters
                    searchQuery={searchQuery}
                    statusFilter={statusFilter}
                    topicFilter={topicFilter}
                    onSearchChange={handleSearch}
                    onStatusChange={handleStatusFilter}
                    onTopicChange={handleTopicFilter}
                />
                <Card className="w-full p-4" radius="sm">
                    <QuestionList
                        questions={questions}
                        loading={loading}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        onDeleteQuestion={handleDeleteQuestion}
                        onFeatureQuestion={handleFeatureQuestion}
                        onStatusChange={handleStatusChange}
                    />
                </Card>
            </div>
        </div>
    );
};

export default QuestionsPage;