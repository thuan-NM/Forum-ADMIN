import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import QuestionActions from './QuestionActions';
import type { QuestionResponse } from '../../store/interfaces/questionInterfaces';

interface QuestionListProps {
    questions: QuestionResponse[];
    loading: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onEditQuestion?: (question: QuestionResponse) => void;
    onDeleteQuestion?: (question: QuestionResponse) => void;
    onFeatureQuestion?: (question: QuestionResponse) => void;
    onStatusChange?: (question: QuestionResponse, status: string) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
    questions,
    loading,
    page,
    totalPages,
    onPageChange,
    onEditQuestion = () => { },
    onDeleteQuestion = () => { },
    onFeatureQuestion = () => { },
    onStatusChange = () => { }
}) => {
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
        return (
            <div className="h-[400px] flex items-center justify-center">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    return (
        <Table
            aria-label="Questions table"
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
                <TableColumn>TITLE</TableColumn>
                <TableColumn>AUTHOR</TableColumn>
                <TableColumn>TOPIC</TableColumn>
                <TableColumn>TAGS</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>STATS</TableColumn>
                <TableColumn>CREATED</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No questions found"}>
                {questions.map((question) => (
                    <TableRow key={question.id}>
                        <TableCell>
                            <div>
                                <p className="font-medium truncate max-w-xs">{question.title}</p>
                                {question.isFeatured && (
                                    <Chip size="sm" color="secondary" variant="flat" className="mt-1">Featured</Chip>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>{question.author.username}</TableCell>
                        <TableCell>
                            <Chip color="success" variant="flat" size="sm">
                                {question.topic.name}
                            </Chip>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-wrap gap-1">
                                {question.tags.map((tag, index) => (
                                    <Chip key={index} size="sm" variant="flat" color="primary">
                                        {tag.name}
                                    </Chip>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Chip
                                color={getStatusColor(question.status)}
                                variant="dot"
                                size="sm"
                            >
                                {question.status}
                            </Chip>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col text-xs">
                                <div className="flex items-center gap-1">
                                    <Icon icon="lucide:eye" fontSize={14} className="text-default-400" />
                                    <span>{question.viewCount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icon icon="lucide:message-square" fontSize={14} className="text-default-400" />
                                    <span>{question.answersCount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icon icon="lucide:thumbs-up" fontSize={14} className="text-default-400" />
                                    <span>{question.upvotes}</span>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{formatDate(question.createdAt)}</TableCell>
                        <TableCell>
                            <QuestionActions
                                question={question}
                                onEdit={onEditQuestion}
                                onDelete={onDeleteQuestion}
                                onFeature={onFeatureQuestion}
                                onStatusChange={onStatusChange}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default QuestionList;