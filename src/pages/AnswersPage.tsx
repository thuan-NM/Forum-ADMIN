import React from 'react';
import { Card, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import type { AnswerResponse } from '../store/interfaces/answerInterfaces';
import AnswerFilters from '../components/Answer/AnswerFilters';
import AnswerTable from '../components/Answer/AnswerTable';

const AnswersPage: React.FC = () => {
    const [answers, setAnswers] = React.useState<AnswerResponse[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [statusFilter, setStatusFilter] = React.useState<string>('all');
    const [questionFilter, setQuestionFilter] = React.useState<string>('');

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formMode, setFormMode] = React.useState<'create' | 'edit'>('create');
    const [selectedAnswer, setSelectedAnswer] = React.useState<AnswerResponse | undefined>(undefined);
    const [formContent, setFormContent] = React.useState<string>('');

    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchAnswers = async () => {
            try {
                setLoading(true);
                setTimeout(() => {
                    const statuses = ['approved', 'pending', 'rejected'];
                    const questionTitles = [
                        'How to fix React rendering issue?',
                        'TypeScript type inference not working',
                        'Node.js memory leak problem',
                        'CSS flexbox vs grid - which to use?',
                        'JavaScript async/await error handling',
                    ];

                    const mockAnswers: AnswerResponse[] = Array.from({ length: 50 }, (_, i) => ({
                        id: `answer-${i + 1}`,
                        content: `<p>This is ${i % 3 === 0 ? 'a detailed' : 'a brief'} answer to the question. ${i % 5 === 0 ? 'It includes some code examples and explanations.' : 'It provides a simple solution.'} ${i % 7 === 0 ? 'I would recommend checking the documentation for more details.' : ''}</p>`,
                        answerContent: `Answer to ${questionTitles[i % questionTitles.length].toLowerCase()}`,
                        author: {
                            id: `user-${(i % 10) + 1}`,
                            username: `user${(i % 10) + 1}`,
                            avatar: i % 5 === 0 ? `https://img.heroui.chat/image/avatar?w=40&h=40&u=${i}` : undefined,
                        },
                        questionId: `question-${(i % questionTitles.length) + 1}`,
                        questionTitle: questionTitles[i % questionTitles.length],
                        status: statuses[i % statuses.length] as 'approved' | 'pending' | 'rejected',
                        isAccepted: i % 10 === 0,
                        upvotes: Math.floor(Math.random() * 20),
                        downvotes: Math.floor(Math.random() * 5),
                        userVote: i % 7 === 0 ? 'up' : i % 11 === 0 ? 'down' : null,
                        rootCommentId: i % 15 === 0 ? `comment-${i}` : undefined,
                        hasEditHistory: i % 8 === 0,
                        comments: i % 4 === 0 ? [
                            {
                                id: `comment-${i}-1`,
                                content: 'Thanks for this answer, it was helpful!',
                                author: {
                                    id: `user-${((i + 2) % 10) + 1}`,
                                    username: `user${((i + 2) % 10) + 1}`,
                                    avatar: `https://img.heroui.chat/image/avatar?w=40&h=40&u=${i + 20}`,
                                },
                                status: 'approved',
                                upvotes: 5,
                                downvotes: 0,
                                userVote: null,
                                hasEditHistory: false,
                                createdAt: new Date(Date.now() - i * 3600000),
                                updatedAt: new Date(Date.now() - i * 3600000),
                            },
                            {
                                id: `comment-${i}-2`,
                                content: 'Could you elaborate more on the second point?',
                                author: {
                                    id: `user-${((i + 4) % 10) + 1}`,
                                    username: `user${((i + 4) % 10) + 1}`,
                                    avatar: `https://img.heroui.chat/image/avatar?w=40&h=40&u=${i + 30}`,
                                },
                                status: 'approved',
                                upvotes: 2,
                                downvotes: 1,
                                userVote: null,
                                hasEditHistory: false,
                                createdAt: new Date(Date.now() - i * 1800000),
                                updatedAt: new Date(Date.now() - i * 1800000),
                            },
                        ] : [],
                        createdAt: new Date(Date.now() - i * 86400000),
                        updatedAt: new Date(Date.now() - (i % 5 === 0 ? i * 43200000 : i * 86400000)),
                    }));

                    let filteredAnswers = mockAnswers;

                    if (searchQuery) {
                        filteredAnswers = filteredAnswers.filter(
                            (answer) =>
                                answer.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                answer.author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                answer.questionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                (answer.answerContent && answer.answerContent.toLowerCase().includes(searchQuery.toLowerCase()))
                        );
                    }

                    if (statusFilter !== 'all') {
                        filteredAnswers = filteredAnswers.filter((answer) => answer.status === statusFilter);
                    }

                    if (questionFilter) {
                        filteredAnswers = filteredAnswers.filter((answer) =>
                            answer.questionTitle.toLowerCase().includes(questionFilter.toLowerCase())
                        );
                    }

                    const paginatedAnswers = filteredAnswers.slice((page - 1) * rowsPerPage, page * rowsPerPage);
                    setAnswers(paginatedAnswers);
                    setTotalPages(Math.ceil(filteredAnswers.length / rowsPerPage));
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching answers:', err);
                setError('Failed to load answers');
                setLoading(false);
            }
        };

        fetchAnswers();
    }, [page, searchQuery, statusFilter, questionFilter]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1);
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        setPage(1);
    };

    const handleQuestionChange = (value: string) => {
        setQuestionFilter(value);
        setPage(1);
    };

    const handleEditAnswer = (answer: AnswerResponse) => {
        setFormMode('edit');
        setSelectedAnswer(answer);
        setFormContent(answer.content);
        onOpen();
    };

    const handleAcceptAnswer = (answer: AnswerResponse) => {
        console.log('Accepting answer:', answer);
    };

    const handleDeleteAnswer = (answer: AnswerResponse) => {
        console.log('Deleting answer:', answer);
    };

    const handleSubmitAnswerForm = () => {
        const data = {
            content: formContent,
            questionId: selectedAnswer?.questionId,
        };
        console.log(`${formMode === 'edit' ? 'Updating' : 'Creating'} answer:`, data);
        onOpenChange();
        setFormContent('');
        setSelectedAnswer(undefined);
    };

    if (error) {
        return <div className="p-4 bg-danger-50 text-danger-500 rounded-md">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <AnswerFilters
                    searchQuery={searchQuery}
                    statusFilter={statusFilter}
                    questionFilter={questionFilter}
                    onSearchChange={handleSearch}
                    onStatusChange={handleStatusChange}
                    onQuestionChange={handleQuestionChange}
                />

                <Card className="w-full p-4" radius='sm'>
                    <AnswerTable
                        answers={answers}
                        loading={loading}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        onEditAnswer={handleEditAnswer}
                        onAcceptAnswer={handleAcceptAnswer}
                        onDeleteAnswer={handleDeleteAnswer}
                    />
                </Card>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>{formMode === 'edit' ? 'Edit Answer' : 'Create Answer'}</ModalHeader>
                            <ModalBody>
                                <textarea
                                    className="w-full p-2 border rounded-md"
                                    rows={5}
                                    value={formContent}
                                    onChange={(e) => setFormContent(e.target.value)}
                                    placeholder="Enter answer content..."
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleSubmitAnswerForm}>
                                    {formMode === 'edit' ? 'Update' : 'Create'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AnswersPage;