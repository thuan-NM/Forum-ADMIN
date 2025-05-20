import React from 'react';
import { Card } from '@heroui/react';
import CommentFilters from '../components/Comment/CommentFilters';
import CommentList from '../components/Comment/CommentList';
import type { Comment } from '../store/interfaces/commentInterfaces';



const Comments: React.FC = () => {
    const [comments, setComments] = React.useState<Comment[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [statusFilter, setStatusFilter] = React.useState<string>('all');
    const [typeFilter, setTypeFilter] = React.useState<string>('all');

    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                setTimeout(() => {
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

                    let filteredComments = mockComments;

                    if (searchQuery) {
                        filteredComments = filteredComments.filter(
                            (comment) =>
                                comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                comment.author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                (comment.postTitle && comment.postTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
                                (comment.answerContent && comment.answerContent.toLowerCase().includes(searchQuery.toLowerCase())) ||
                                (comment.questionTitle && comment.questionTitle.toLowerCase().includes(searchQuery.toLowerCase()))
                        );
                    }

                    if (statusFilter !== 'all') {
                        filteredComments = filteredComments.filter((comment) => comment.status === statusFilter);
                    }

                    if (typeFilter === 'post') {
                        filteredComments = filteredComments.filter((comment) => comment.postId);
                    } else if (typeFilter === 'answer') {
                        filteredComments = filteredComments.filter((comment) => comment.answerId);
                    }

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
    }, [page, searchQuery, statusFilter, typeFilter]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1);
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        setPage(1);
    };

    const handleTypeChange = (value: string) => {
        setTypeFilter(value);
        setPage(1);
    };

    const handleApproveComment = (comment: Comment) => {
        console.log('Approving comment:', comment);
    };

    const handleRejectComment = (comment: Comment) => {
        console.log('Rejecting comment:', comment);
    };

    const handleDeleteComment = (comment: Comment) => {
        console.log('Deleting comment:', comment);
    };

    if (error) {
        return <div className="p-4 bg-danger-50 text-danger-500 rounded-md">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <CommentFilters
                    searchQuery={searchQuery}
                    statusFilter={statusFilter}
                    typeFilter={typeFilter}
                    onSearchChange={handleSearch}
                    onStatusChange={handleStatusChange}
                    onTypeChange={handleTypeChange}
                />

                <Card className="w-full p-4" radius="sm">
                    <CommentList
                        comments={comments}
                        loading={loading}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        onApproveComment={handleApproveComment}
                        onRejectComment={handleRejectComment}
                        onDeleteComment={handleDeleteComment}
                    />
                </Card>
            </div>
        </div>
    );
};

export default Comments;