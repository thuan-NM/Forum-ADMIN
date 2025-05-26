import React from 'react';
import { Chip, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { DateFormatter, StatusChip } from '../../Common';
import type { QuestionResponse } from '../../../store/interfaces/questionInterfaces';

interface QuestionHeaderProps {
    question: QuestionResponse;
    onDelete?: () => void;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
    question,
    onDelete
}) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <StatusChip status={status} type="question" />
                        {question.isFeatured && (
                            <Chip color="secondary" variant="flat" size="sm">Featured</Chip>
                        )}
                    </div>
                    <h1 className="text-2xl font-bold">{question.title}</h1>
                    <div className="flex items-center gap-2 mt-2 text-sm text-default-500">
                        <span>Asked by {question.author.username}</span>
                        <span>•</span>
                        <DateFormatter date={question.createdAt} format="medium" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="flat"
                        color="danger"
                        startContent={<Icon icon="lucide:trash" />}
                        onPress={onDelete}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <Chip color="success" variant="flat">
                    {question.topic.name}
                </Chip>
                {question.tags.map((tag, index) => (
                    <Chip key={index} color="primary" variant="flat">
                        {tag.name}
                    </Chip>
                ))}
            </div>

            <div className="flex items-center gap-6 text-sm text-default-500">
                <div className="flex items-center gap-1">
                    <Icon icon="lucide:eye" fontSize={16} />
                    <span>{question.viewCount} views</span>
                </div>
                <div className="flex items-center gap-1">
                    <Icon icon="lucide:thumbs-up" fontSize={16} />
                    <span>{question.upvotes} upvotes</span>
                </div>
                <div className="flex items-center gap-1">
                    <Icon icon="lucide:thumbs-down" fontSize={16} />
                    <span>{question.downvotes} downvotes</span>
                </div>
                <div className="flex items-center gap-1">
                    <Icon icon="lucide:message-circle" fontSize={16} />
                    <span>{question.answersCount} answers</span>
                </div>
            </div>
        </div>
    );
};

export default QuestionHeader;