import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import type { AnswerResponse } from '../../store/interfaces/answerInterfaces';

interface AnswerActionsProps {
    answer: AnswerResponse;
    onAccept: (answer: AnswerResponse) => void;
    onEdit: (answer: AnswerResponse) => void;
    onDelete: (answer: AnswerResponse) => void;
}

const AnswerActions: React.FC<AnswerActionsProps> = ({ answer, onAccept, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const menuItems = [
        answer.questionId ? (
            <DropdownItem
                key="view-question"
                startContent={<Icon icon="lucide:eye" />}
                onPress={() => navigate(`/questions/${answer.questionId}`)}
            >
                View Question
            </DropdownItem>
        ) : null,
        !answer.isAccepted && answer.status === 'approved' ? (
            <DropdownItem
                key="accept"
                startContent={<Icon icon="lucide:check-circle" />}
                color="success"
                onPress={() => onAccept(answer)}
            >
                Mark as Accepted
            </DropdownItem>
        ) : null,
        <DropdownItem
            key="edit"
            startContent={<Icon icon="lucide:edit" />}
            onPress={() => onEdit(answer)}
        >
            Edit
        </DropdownItem>,
        <DropdownItem
            key="delete"
            startContent={<Icon icon="lucide:trash" />}
            color="danger"
            onPress={() => onDelete(answer)}
        >
            Delete
        </DropdownItem>,
    ].filter(Boolean);

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light" aria-label="Answer actions">
                    <Icon icon="lucide:more-vertical" className="text-default-500" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Answer actions">{menuItems}</DropdownMenu>
        </Dropdown>
    );
};

export default AnswerActions;