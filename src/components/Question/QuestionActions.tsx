import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import type { QuestionResponse } from '../../store/interfaces/questionInterfaces';

interface QuestionActionsProps {
    question: QuestionResponse;
    onEdit?: (question: QuestionResponse) => void;
    onDelete?: (question: QuestionResponse) => void;
    onFeature?: (question: QuestionResponse) => void;
    onStatusChange?: (question: QuestionResponse, status: string) => void;
}

const QuestionActions: React.FC<QuestionActionsProps> = ({
    question,
    onEdit = () => { },
    onDelete = () => { },
    onFeature = () => { },
    onStatusChange = () => { }
}) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/questions/${question.id}`);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <Icon icon="lucide:more-vertical" className="text-default-500" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Question actions">
                <DropdownItem key="view"
                    startContent={<Icon icon="lucide:eye" />}
                    onPress={handleView}
                >
                    View
                </DropdownItem>
                <DropdownItem key="edit"
                    startContent={<Icon icon="lucide:edit" />}
                    onPress={() => onEdit(question)}
                >
                    Edit
                </DropdownItem>
                {question.status === 'open' ? (
                    <DropdownItem key="solved"
                        startContent={<Icon icon="lucide:check-circle" />}
                        color="success"
                        onPress={() => onStatusChange(question, 'solved')}
                    >
                        Mark as Solved
                    </DropdownItem>
                ) : question.status === 'solved' ? (
                    <DropdownItem key="reopen"
                        startContent={<Icon icon="lucide:rotate-ccw" />}
                        color="primary"
                        onPress={() => onStatusChange(question, 'open')}
                    >
                        Reopen
                    </DropdownItem>
                ) : null}
                {!question.isFeatured ? (
                    <DropdownItem key="feature"
                        startContent={<Icon icon="lucide:star" />}
                        color="warning"
                        onPress={() => onFeature(question)}
                    >
                        Feature
                    </DropdownItem>
                ) : (
                    <DropdownItem key="unfeature"
                        startContent={<Icon icon="lucide:star-off" />}
                        color="default"
                        onPress={() => onFeature(question)}
                    >
                        Unfeature
                    </DropdownItem>
                )}
                <DropdownItem key="delete"
                    startContent={<Icon icon="lucide:trash" />}
                    color="danger"
                    onPress={() => onDelete(question)}
                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default QuestionActions;