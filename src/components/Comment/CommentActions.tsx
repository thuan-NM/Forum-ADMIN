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
                Xem {comment.postId ? 'Post' : 'Answer'}
            </DropdownItem>
        ) : null,
        comment.status === 'pending' ? (
            <DropdownItem
                key="approve"
                startContent={<Icon icon="lucide:check" />}
                color="success"
                onPress={() => onUpdateAnswerStatus(comment.id, 'approved')}
            >
                Chấp nhận
            </DropdownItem>
        ) : null,
        <DropdownItem
            key="delete"
            startContent={<Icon icon="lucide:trash" />}
            color="danger"
            onPress={handleDelete}
        >
            Xóa
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
                    <ModalHeader>Xác nhận xóa</ModalHeader>
                    <ModalBody>
                        <p>Bình luận này có các phản hồi. Xóa bình luận sẽ đồng thời xóa tất cả các phản hồi liên quan. Bạn có chắc chắn muốn tiếp tục không?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="flat" onPress={() => setIsModalOpen(false)}>
                            Hủy
                        </Button>
                        <Button color="danger" onPress={confirmDelete}>
                            Xóa
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CommentActions;