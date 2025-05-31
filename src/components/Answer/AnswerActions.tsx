import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { AnswerResponse } from '../../store/interfaces/answerInterfaces';
import { useNavigate } from 'react-router-dom';

interface AnswerActionsProps {
    answer: AnswerResponse;
    onUpdateStatus: (id: string, status: string) => void;
    onDelete: (answer: AnswerResponse) => void;
}

interface MenuItem {
    key: string;
    label: string;
    icon: string;
    action: () => void;
    color?: 'success' | 'warning' | 'danger';
}

const AnswerActions: React.FC<AnswerActionsProps> = ({ answer, onUpdateStatus, onDelete }) => {
    const navigate = useNavigate();
    const getMenuItems = (): MenuItem[] => {
        const items: MenuItem[] = [
            {
                key: 'view-question',
                label: 'View Question',
                icon: 'lucide:eye',
                action: () => navigate(`/questions/${answer.question.id}`),
            },
            {
                key: 'view-answer',
                label: 'View Answer Detail',
                icon: 'lucide:eye',
                action: () => navigate(`/answers/${answer.id}`),
            },
            {
                key: 'delete',
                label: 'Delete',
                icon: 'lucide:trash',
                color: 'danger',
                action: () => onDelete(answer),
            },
        ];

        switch (answer.status) {
            case 'pending':
                return [
                    ...items,
                    {
                        key: 'approve',
                        label: 'Approve',
                        icon: 'mdi:tag-approve-outline',
                        color: 'success',
                        action: () => onUpdateStatus(answer.id, "approved"),
                    },
                    {
                        key: 'reject',
                        label: 'Reject',
                        icon: 'lucide:rotate-ccw',
                        color: 'warning',
                        action: () => onUpdateStatus(answer.id, "rejected"),
                    },
                ]
            default:
                return items;
        }
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <Icon icon="lucide:more-vertical" className="text-default-500" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Answer actions">
                {getMenuItems().map((item) => (
                    <DropdownItem
                        key={item.key}
                        startContent={<Icon icon={item.icon} />}
                        color={item.color}
                        onPress={item.action}
                    >
                        {item.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default AnswerActions;