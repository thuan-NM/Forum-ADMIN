import React from 'react';
import { Card, CardBody, CardFooter, Divider, Chip, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

import type { AnswerResponse } from '../../store/interfaces/questionInterfaces';
import { Avatar } from '@heroui/react';
import CommentList from '../Comment/CommentList';
import AnswerActions from './AnswerActions';

interface AnswerListProps {
    answers: AnswerResponse[];
    onAcceptAnswer?: (answer: AnswerResponse) => void;
    onEditAnswer?: (answer: AnswerResponse) => void;
    onDeleteAnswer?: (answer: AnswerResponse) => void;
    onAddComment?: (answerId: string) => void;
}

const AnswerList: React.FC<AnswerListProps> = ({
    answers,
    onAcceptAnswer = () => { },
    onEditAnswer = () => { },
    onDeleteAnswer = () => { },
    onAddComment = () => { }
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

    if (answers.length === 0) {
        return (
            <div className="text-center py-8 text-default-500">
                <Icon icon="lucide:message-square-off" className="mx-auto mb-2" fontSize={32} />
                <p>No answers yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {answers.map((answer) => (
                <Card key={answer.id} className={answer.isAccepted ? "border-success border-2" : ""}>
                    <CardBody>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                {answer.author.avatar && (
                                    <Avatar
                                        src={answer.author.avatar}
                                        name={answer.author.username}
                                        size="sm"
                                    />
                                )}
                                <div className="flex flex-col">
                                    <span className="font-medium">{answer.author.username}</span>
                                    <span className="text-xs text-default-500">
                                        {formatDate(answer.createdAt)}
                                        {answer.hasEditHistory && " (edited)"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {answer.isAccepted && (
                                    <Chip color="success" variant="flat" startContent={<Icon icon="lucide:check" />}>
                                        Accepted
                                    </Chip>
                                )}
                                <Chip color={getStatusColor(answer.status)} variant="flat" size="sm">
                                    {answer.status}
                                </Chip>
                                <AnswerActions
                                    answer={answer}
                                    onAccept={onAcceptAnswer}
                                    onEdit={onEditAnswer}
                                    onDelete={onDeleteAnswer}
                                />
                            </div>
                        </div>

                        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: answer.content }} />

                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1">
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    color={answer.userVote === 'up' ? 'success' : 'default'}
                                >
                                    <Icon icon="lucide:thumbs-up" />
                                </Button>
                                <span>{answer.upvotes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    color={answer.userVote === 'down' ? 'danger' : 'default'}
                                >
                                    <Icon icon="lucide:thumbs-down" />
                                </Button>
                                <span>{answer.downvotes}</span>
                            </div>
                        </div>
                    </CardBody>

                    {answer.comments && answer.comments.length > 0 && (
                        <>
                            <Divider />
                            <CardFooter className="flex flex-col items-start">
                                <h4 className="text-sm font-medium mb-2">Comments ({answer.comments.length})</h4>
                                <div className="w-full">
                                    <CommentList comments={answer.comments} isSimpleView={true} />
                                    <Button
                                        size="sm"
                                        variant="light"
                                        color="primary"
                                        startContent={<Icon icon="lucide:plus" fontSize={16} />}
                                        className="mt-2"
                                        onPress={() => onAddComment(answer.id)}
                                    >
                                        Add Comment
                                    </Button>
                                </div>
                            </CardFooter>
                        </>
                    )}

                    {(!answer.comments || answer.comments.length === 0) && (
                        <CardFooter>
                            <Button
                                size="sm"
                                variant="light"
                                color="primary"
                                startContent={<Icon icon="lucide:plus" fontSize={16} />}
                                onPress={() => onAddComment(answer.id)}
                            >
                                Add Comment
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default AnswerList;