import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import type { Comment } from '../../store/interfaces/commentInterfaces';

interface CommentActionsProps {
    comment: Comment;
    onApprove: (comment: Comment) => void;
    onReject: (comment: Comment) => void;
    onDelete: (comment: Comment) => void;
}

const CommentActions: React.FC<CommentActionsProps> = ({
    comment,
    onApprove,
    onReject,
    onDelete,
}) => {
    const navigate = useNavigate();

    const handleView = () => {
        if (comment.postId) {
            navigate(`/posts/${comment.postId}`);
        } else if (comment.questionId) {
            navigate(`/questions/${comment.questionId}`);
        } else if (comment.answerId) {
            navigate(`/answers/${comment.answerId}`);
        }
    };

    const menuItems = [
        comment.postId || comment.questionId || comment.answerId ? (
            <DropdownItem
                key="view"
                startContent={<Icon icon="lucide:eye" />}
                onPress={handleView}
            >
                View {comment.postId ? 'Post' : comment.questionId ? 'Question' : 'Answer'}
            </DropdownItem>
        ) : null,
        (comment.status === 'pending' || comment.status === 'rejected') ? (
            <DropdownItem
                key="approve"
                startContent={<Icon icon="lucide:check" />}
                color="success"
                onPress={() => onApprove(comment)}
            >
                Approve
            </DropdownItem>
        ) : null,
        (comment.status === 'pending' || comment.status === 'approved') ? (
            <DropdownItem
                key="reject"
                startContent={<Icon icon="lucide:x" />}
                color="danger"
                onPress={() => onReject(comment)}
            >
                Reject
            </DropdownItem>
        ) : null,
        <DropdownItem
            key="delete"
            startContent={<Icon icon="lucide:trash" />}
            color="danger"
            onPress={() => onDelete(comment)}
        >
            Delete
        </DropdownItem>,
    ].filter(Boolean);

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light" aria-label="Comment actions">
                    <Icon icon="lucide:more-vertical" className="text-default-500" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Comment actions">
                {menuItems}
            </DropdownMenu>
        </Dropdown>
    );
};

export default CommentActions;