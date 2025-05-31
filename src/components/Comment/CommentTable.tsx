import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, Avatar } from '@heroui/react';
import CommentActions from './CommentActions';
import type { CommentResponse } from '../../store/interfaces/commentInterfaces';
import { ContentTypeChip, StatusChip } from '../Common';


interface CommentListProps {
    comments: CommentResponse[];
    loading?: boolean;
    page?: number;
    totalPages: number | 0;
    onPageChange: (page: number) => void;
    onUpdateAnswerStatus: (id: string, status: string) => void
    onDeleteComment?: (comment: CommentResponse) => void;
    isSimpleView?: boolean;
}

const CommentTable: React.FC<CommentListProps> = ({
    comments,
    loading = false,
    page = 1,
    totalPages,
    onPageChange = () => { },
    onUpdateAnswerStatus,
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
                {comments.map((comment) => (
                    <div key={comment.id} className="bg-default-50 rounded-md p-3">
                        <div className="flex items-start gap-3">

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
                            {comment.postId ? (
                                <div className="flex items-start gap-1 flex-col">
                                    <ContentTypeChip type='post' />
                                    <span className="text-sm truncate max-w-[320px]">{comment.postTitle}</span>
                                </div>
                            ) : comment.answerId ? (
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1 flex-col">
                                        <ContentTypeChip type='answer' />
                                        <span className="text-sm truncate max-w-[320px]">{comment.answerTitle}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-1 flex-col">
                                        <ContentTypeChip type='comment' />
                                        <span className="text-sm truncate max-w-[320px]">{comment.parentTitle}</span>
                                    </div>
                                </div>
                            )}
                        </TableCell>
                        <TableCell>
                            <StatusChip type='comment' status={comment.status} />
                        </TableCell>
                        <TableCell>{formatDate(comment.createdAt)}</TableCell>
                        <TableCell>
                            <CommentActions
                                comment={comment}
                                onUpdateAnswerStatus={onUpdateAnswerStatus}
                                onDelete={onDeleteComment}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CommentTable;