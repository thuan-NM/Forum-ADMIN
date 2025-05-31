import React, { useState } from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import type { CommentResponse } from '../../store/interfaces/commentInterfaces';

interface CommentActionsProps {
    comment: CommentResponse;
    onUpdateAnswerStatus: (id: string, status: string) => void;
    onDelete: (comment: CommentResponse) => void;
}

const CommentActions: React.FC<CommentActionsProps> = ({
    comment,
    onUpdateAnswerStatus,
    onDelete,
}) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleView = () => {
        if (comment.postId) {
            navigate(`/posts/${comment.postId}`);
        } else if (comment.answerId) {
            navigate(`/answers/${comment.answerId}`);
        }
    };

    const handleDelete = () => {
        if (comment.has_replies) {
            setIsModalOpen(true); 
        } else {
            onDelete(comment);
        }
    };

    const confirmDelete = () => {
        setIsModalOpen(false);
        onDelete(comment);
    };

    const menuItems = [
        comment.postId || comment.answerId ? (
            <DropdownItem
                key="view"
                startContent={<Icon icon="lucide:eye" />}
                onPress={handleView}
            >
                View {comment.postId ? 'Post' : 'Answer'}
            </DropdownItem>
        ) : null,
        comment.status === 'pending' ? (
            <DropdownItem
                key="approve"
                startContent={<Icon icon="lucide:check" />}
                color="success"
                onPress={() => onUpdateAnswerStatus(comment.id, 'approved')}
            >
                Approve
            </DropdownItem>
        ) : null,
        <DropdownItem
            key="delete"
            startContent={<Icon icon="lucide:trash" />}
            color="danger"
            onPress={handleDelete}
        >
            Delete
        </DropdownItem>,
    ].filter(Boolean);

    return (
        <>
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
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalContent>
                    <ModalHeader>Confirm Delete</ModalHeader>
                    <ModalBody>
                        <p>This comment has replies. Deleting it will also delete all associated replies. Are you sure you want to proceed?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="flat" onPress={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button color="danger" onPress={confirmDelete}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CommentActions;