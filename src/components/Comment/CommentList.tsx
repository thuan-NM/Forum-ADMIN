import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, Chip, Avatar } from '@heroui/react';
import CommentActions from './CommentActions';

interface CommentProps {
    id: string;
    content: string;
    author: {
        id: string;
        username: string;
        avatar?: string;
    };
    createdAt: Date;
}

interface CommentListProps {
    comments: CommentProps[];
    loading?: boolean;
    page?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    onApproveComment?: (comment: any) => void;
    onRejectComment?: (comment: any) => void;
    onDeleteComment?: (comment: any) => void;
    isSimpleView?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({
    comments,
    loading = false,
    page = 1,
    totalPages = 1,
    onPageChange = () => { },
    onApproveComment = () => { },
    onRejectComment = () => { },
    onDeleteComment = () => { },
    isSimpleView = false
}) => {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (isSimpleView) {
        return (
            <div className="space-y-3 w-full">
                {comments.map((comment, index) => (
                    <div key={comment.id} className="bg-default-50 rounded-md p-3">
                        <div className="flex items-start gap-3">
                            <Avatar
                                src={comment.author.avatar}
                                name={comment.author.username}
                                size="sm"
                                className="mt-1"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-sm">{comment.author.username}</span>
                                    <span className="text-xs text-default-500">{formatDate(comment.createdAt)}</span>
                                </div>
                                <p className="mt-1 text-sm text-default-700">{comment.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (loading) {
        return (
            <div className="h-[400px] flex items-center justify-center">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'success';
            case 'pending':
                return 'warning';
            case 'spam':
            case 'rejected':
                return 'danger';
            case 'deleted':
                return 'default';
            default:
                return 'default';
        }
    };

    return (
        <Table
            aria-label="Comments table"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={totalPages}
                        onChange={onPageChange}
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
                <TableColumn>ON</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>CREATED</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No comments found"}>
                {comments.map((comment: any) => (
                    <TableRow key={comment.id}>
                        <TableCell className="max-w-xs">
                            <p className="truncate">{comment.content}</p>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar
                                    src={comment.author.avatar}
                                    name={comment.author.username}
                                    size="sm"
                                />
                                <span>{comment.author.username}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            {comment.postTitle ? (
                                <div className="flex items-center gap-1">
                                    <Chip size="sm" variant="flat" color="primary">Post</Chip>
                                    <span className="text-sm truncate max-w-[150px]">{comment.postTitle}</span>
                                </div>
                            ) : comment.answerId ? (
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1">
                                        <Chip size="sm" variant="flat" color="success">Answer</Chip>
                                        <span className="text-sm truncate max-w-[150px]">ID: {comment.answerId}</span>
                                    </div>
                                    {comment.questionTitle && (
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-xs text-default-500">Question:</span>
                                            <span className="text-xs truncate max-w-[150px]">{comment.questionTitle}</span>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </TableCell>
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
                            <CommentActions
                                comment={comment}
                                onApprove={onApproveComment}
                                onReject={onRejectComment}
                                onDelete={onDeleteComment}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CommentList;