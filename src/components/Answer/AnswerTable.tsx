import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { AnswerResponse } from '../../store/interfaces/answerInterfaces';
import AnswerActions from './AnswerActions';
import { LoadingState, StatusChip } from '../Common';

interface AnswerTableProps {
    answers: AnswerResponse[];
    loading: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onDeleteAnswer: (answer: AnswerResponse) => void;
    onUpdateStatus: (id: string, status: string) => void;
}

const AnswerTable: React.FC<AnswerTableProps> = ({
    answers,
    loading,
    page,
    totalPages,
    onPageChange,
    onDeleteAnswer,
    onUpdateStatus,
}) => {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const truncateHTML = (html: string, maxLength: number = 100) => {
        const text = html.replace(/<[^>]*>/g, '');
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    if (loading) {
        return (
            <LoadingState />
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
                                    name={answer.author.username}
                                    size="sm"
                                    src={answer.author.avatar}
                                />
                                <span>{answer.author.username}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="text-sm truncate max-w-[200px]">{answer.question.title}</span>
                                <span className="text-xs text-default-500">ID: {answer.question.id}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            {answer.isAccepted ?
                                <StatusChip type='answer' status='accepted'></StatusChip> :
                                <StatusChip type='answer' status={answer.status} />}
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col text-xs">
                                <div className="flex items-center gap-1">
                                    <Icon icon="lucide:message-square" fontSize={14} className="text-default-400" />
                                    <span>{answer.comments?.length || 0}</span>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{formatDate(answer.createdAt)}</TableCell>
                        <TableCell>
                            <AnswerActions
                                answer={answer}
                                onUpdateStatus={onUpdateStatus}
                                onDelete={onDeleteAnswer}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default AnswerTable;