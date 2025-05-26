import React from 'react';
import { Button, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import AnswerList from '../components/Answer/AnswerList';
import { useDisclosure } from '@heroui/react';
import type { QuestionResponse } from '../store/interfaces/questionInterfaces'
import type { AnswerResponse } from '../store/interfaces/answerInterfaces'
import { QuestionHeader, QuestionContent } from '../components/Question/QuestionDetail';
import { LoadingState, ErrorState } from '../components/Common';
import type { Comment } from '../store/interfaces/commentInterfaces';

const QuestionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [question, setQuestion] = React.useState<QuestionResponse | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    // Answer form state
    const answerFormDisclosure = useDisclosure();
    const [answerFormMode, setAnswerFormMode] = React.useState<'create' | 'edit'>('create');
    const [selectedAnswer, setSelectedAnswer] = React.useState<AnswerResponse | undefined>(undefined);

    // Comment form state
    const commentFormDisclosure = useDisclosure();
    const [selectedAnswerId, setSelectedAnswerId] = React.useState<string | undefined>(undefined);

    const fetchQuestionDetail = async () => {
        try {
            setLoading(true);
            // In a real app, you would fetch this data from your API
            // const response = await axios.get(`http://localhost:3000/api/questions/${id}`);
            // setQuestion(response.data);

            // Simulating API response with mock data
            setTimeout(() => {
                const mockQuestion: QuestionResponse = {
                    id: id || 'question-1',
                    title: 'How to implement React hooks with TypeScript?',
                    content: `<p>I'm trying to use React hooks with TypeScript but I'm facing some issues with the typing. Here's my code:</p>
                     <pre><code>const [state, setState] = useState<string>('');</code></pre>
                     <p>But I'm getting errors when I try to use complex types. Can someone help me understand how to properly type hooks?</p>`,
                    slug: 'how-to-implement-react-hooks-with-typescript',
                    author: {
                        id: 'user-1',
                        username: 'reactdev',
                        avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=1'
                    },
                    topic: {
                        id: 'topic-1',
                        name: 'Web Development',
                        slug: 'web-development'
                    },
                    tags: [
                        {
                            id: 'tag-1',
                            name: 'react',
                            slug: 'react'
                        },
                        {
                            id: 'tag-2',
                            name: 'typescript',
                            slug: 'typescript'
                        },
                        {
                            id: 'tag-3',
                            name: 'hooks',
                            slug: 'hooks'
                        }
                    ],
                    status: 'open',
                    viewCount: 245,
                    upvotes: 12,
                    downvotes: 2,
                    userVote: null,
                    answersCount: 2,
                    isFeatured: false,
                    createdAt: new Date(Date.now() - 86400000 * 3),
                    updatedAt: new Date(Date.now() - 86400000 * 3)
                };
                const statuses = ['approved', 'pending', 'spam', 'deleted'];
                const postTitles = [
                    'Getting Started with React',
                    'Advanced TypeScript Patterns',
                    'Node.js Best Practices',
                    'CSS Grid Layout Tutorial',
                    'JavaScript Performance Tips',
                ];
                const questionTitles = [
                    'How to fix React rendering issue?',
                    'TypeScript type inference not working',
                    'Node.js memory leak problem',
                    'CSS flexbox vs grid - which to use?',
                    'JavaScript async/await error handling',
                ];
                const mockComments: Comment[] = Array.from({ length: 50 }, (_, i) => {
                    const isPostComment = i % 2 === 0;
                    return {
                        id: `comment-${i + 1}`,
                        content: `This is ${i % 3 === 0 ? 'a detailed' : 'a brief'} comment ${i % 5 === 0 ? 'with some questions about the topic.' : 'sharing my thoughts on this.'} ${i % 7 === 0 ? 'I would like to know more about specific implementation details.' : ''}`,
                        author: {
                            id: `user-${(i % 10) + 1}`,
                            username: `user${(i % 10) + 1}`,
                        },
                        ...(isPostComment
                            ? {
                                postId: `post-${(i % postTitles.length) + 1}`,
                                postTitle: postTitles[i % postTitles.length],
                            }
                            : {
                                answerId: `answer-${(i % 5) + 1}`,
                                answerContent: `This is an answer to the question about ${questionTitles[i % questionTitles.length].toLowerCase()}`,
                                questionId: `question-${(i % questionTitles.length) + 1}`,
                                questionTitle: questionTitles[i % questionTitles.length],
                            }),
                        status: statuses[i % statuses.length] as 'approved' | 'pending' | 'spam' | 'deleted',
                        createdAt: new Date(Date.now() - i * 3600000), // Changed to Date
                    };
                });
                // Mock answers with comments (not directly on questions)
                const mockAnswers: AnswerResponse[] = [
                    {
                        id: 'answer-1',
                        content: `<p>When using React hooks with TypeScript, you need to properly define the types. Here's how you can do it:</p>
                       <pre><code>interface User {
  name: string;
  age: number;
}

const [user, setUser] = useState<User | null>(null);</code></pre>
                       <p>This way TypeScript will know that user can be either of type User or null.</p>`,
                        author: {
                            id: 'user-2',
                            username: 'typescript_expert',
                            avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=2'
                        },
                        questionId: id || 'question-1',
                        status: 'approved',
                        isAccepted: true,
                        upvotes: 8,
                        downvotes: 0,
                        userVote: 'up',
                        rootCommentId: undefined,
                        hasEditHistory: false,
                        comments: mockComments,
                        questionTitle: questionTitles[questionTitles.length],

                        createdAt: new Date(Date.now() - 86400000 * 2.5),
                        updatedAt: new Date(Date.now() - 86400000 * 2.5)
                    },
                    {
                        id: 'answer-2',
                        content: `<p>Another approach is to use type inference when possible:</p>
                       <pre><code>// TypeScript will infer the type
const [count, setCount] = useState(0);

// Explicitly define for complex types
const [users, setUsers] = useState<User[]>([]);</code></pre>
                       <p>This makes your code cleaner while still maintaining type safety.</p>`,
                        author: {
                            id: 'user-4',
                            username: 'dev_helper',
                            avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=4'
                        },
                        questionId: id || 'question-1',
                        status: 'approved',
                        questionTitle: questionTitles[questionTitles.length],

                        isAccepted: false,
                        upvotes: 5,
                        downvotes: 1,
                        userVote: null,
                        rootCommentId: undefined,
                        hasEditHistory: true,
                        comments: [],
                        createdAt: new Date(Date.now() - 86400000 * 1.5),
                        updatedAt: new Date(Date.now() - 86400000)
                    }
                ];

                setQuestion({ ...mockQuestion, answers: mockAnswers });
                setLoading(false);
            }, 1000);
        } catch (err) {
            console.error('Error fetching question details:', err);
            setError('Failed to load question details');
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchQuestionDetail();
    }, [id]);
    const handleAddAnswer = () => {
        setAnswerFormMode('create');
        setSelectedAnswer(undefined);
        answerFormDisclosure.onOpen();
    };

    const handleEditAnswer = (answer: AnswerResponse) => {
        setAnswerFormMode('edit');
        setSelectedAnswer(answer);
        answerFormDisclosure.onOpen();
    };

    const handleAcceptAnswer = (answer: AnswerResponse) => {
        // In a real app, you would call your API to accept the answer
        console.log('Accepting answer:', answer);
    };

    const handleDeleteAnswer = (answer: AnswerResponse) => {
        // In a real app, you would call your API to delete the answer
        console.log('Deleting answer:', answer);
    };

    const handleAddComment = (answerId: string) => {
        setSelectedAnswerId(answerId);
        commentFormDisclosure.onOpen();
    };

    const handleSubmitAnswer = (data: { content: string; questionId?: string }) => {
        if (answerFormMode === 'create') {
            // In a real app, you would call your API to create a new answer
            console.log('Creating new answer:', data);
        } else {
            // In a real app, you would call your API to update the answer
            console.log('Updating answer:', data);
        }
    };

    const handleSubmitComment = (data: { content: string; answerId?: string; postId?: string }) => {
        // In a real app, you would call your API to create a new comment
        console.log('Creating new comment:', data);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open':
                return 'primary';
            case 'closed':
                return 'danger';
            case 'solved':
                return 'success';
            case 'duplicate':
                return 'warning';
            default:
                return 'default';
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return <LoadingState message="Loading question..." />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={() => fetchQuestionDetail()} />;
    }

    return (
        <div className="space-y-6">
            <QuestionHeader question={question} onDelete={() => handleDeleteQuestion(question)} />


            <div className="flex items-center gap-2">
                <Chip color={getStatusColor(question.status)} variant="dot" size="sm">
                    {question.status}
                </Chip>
                <span className="text-sm text-default-500">
                    Asked {formatDate(question.createdAt)}
                </span>
            </div>

            <QuestionContent content={DOMPurify.sanitize(question.content)} />
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {question.answersCount} {question.answersCount === 1 ? 'Answer' : 'Answers'}
                    </h2>
                    <Button
                        color="primary"
                        startContent={<Icon icon="lucide:message-square" />}
                        onPress={handleAddAnswer}
                    >
                        Add Answer
                    </Button>
                </div>

                <AnswerList questionId={question.id}/>
            </div>

        </div>
    );
};

export default QuestionDetail;