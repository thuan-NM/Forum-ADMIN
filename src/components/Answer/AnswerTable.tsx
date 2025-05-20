import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, Chip, Avatar, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { AnswerResponse } from '../../store/interfaces/answerInterfaces';

interface AnswerTableProps {
    answers: AnswerResponse[];
    loading: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onEditAnswer: (answer: AnswerResponse) => void;
    onAcceptAnswer: (answer: AnswerResponse) => void;
    onDeleteAnswer: (answer: AnswerResponse) => void;
}

const AnswerTable: React.FC<AnswerTableProps> = ({
    answers,
    loading,
    page,
    totalPages,
    onPageChange,
    onEditAnswer,
    onAcceptAnswer,
    onDeleteAnswer
}) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'success';
            case 'pending':
                return 'warning';
            case 'rejected':
                return 'danger';
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

    const truncateHTML = (html: string, maxLength: number = 100) => {
        // Simple HTML stripping for truncation
        const text = html.replace(/<[^>]*>/g, '');
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    if (loading) {
        return (
            <div className="h-[400px] flex items-center justify-center">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    return (
        <Table
            aria-label="Answers table"
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
                <TableColumn>QUESTION</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>STATS</TableColumn>
                <TableColumn>CREATED</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No answers found"}>
                {answers.map((answer) => (
                    <TableRow key={answer.id}>
                        <TableCell className="max-w-xs">
                            <p className="truncate">{truncateHTML(answer.content)}</p>
                            {answer.hasEditHistory && (
                                <span className="text-xs text-default-500 mt-1 inline-block">(edited)</span>
                            )}
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar
                                    src={answer.author.avatar}
                                    name={answer.author.username}
                                    size="sm"
                                />
                                <span>{answer.author.username}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="text-sm truncate max-w-[200px]">{answer.questionTitle}</span>
                                <span className="text-xs text-default-500">ID: {answer.questionId}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col gap-1">
                                <Chip
                                    color={getStatusColor(answer.status)}
                                    variant="dot"
                                    size="sm"
                                >
                                    {answer.status}
                                </Chip>
                                {answer.isAccepted && (
                                    <Chip color="success" variant="flat" size="sm">
                                        Accepted
                                    </Chip>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col text-xs">
                                <div className="flex items-center gap-1">
                                    <Icon icon="lucide:thumbs-up" fontSize={14} className="text-default-400" />
                                    <span>{answer.upvotes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icon icon="lucide:thumbs-down" fontSize={14} className="text-default-400" />
                                    <span>{answer.downvotes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icon icon="lucide:message-square" fontSize={14} className="text-default-400" />
                                    <span>{answer.comments?.length || 0}</span>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{formatDate(answer.createdAt)}</TableCell>
                        <TableCell>
                            <div className="flex gap-1">
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onPress={() => onEditAnswer(answer)}
                                >
                                    <Icon icon="lucide:edit" className="text-default-500" />
                                </Button>
                                {!answer.isAccepted && answer.status === 'approved' && (
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        color="success"
                                        onPress={() => onAcceptAnswer(answer)}
                                    >
                                        <Icon icon="lucide:check-circle" />
                                    </Button>
                                )}
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    color="danger"
                                    onPress={() => onDeleteAnswer(answer)}
                                >
                                    <Icon icon="lucide:trash" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default AnswerTable;