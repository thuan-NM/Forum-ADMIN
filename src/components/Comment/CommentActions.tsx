import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Comment {
    id: string;
    content: string;
    author: {
        id: string;
        username: string;
    };
    postId?: string;
    postTitle?: string;
    questionId?: string;
    questionTitle?: string;
    answerId?: string;
    status: 'approved' | 'pending' | 'spam' | 'rejected' | 'deleted';
    createdAt: string | Date;
}

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
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => setIsOpen(!isOpen)}
                aria-label="Comment actions"
            >
                <Icon icon="lucide:more-vertical" className="text-default-500" />
            </Button>
            {isOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                    {(comment.status === 'pending' || comment.status === 'rejected') && (
                        <li>
                            <button
                                className="w-full text-left px-4 py-2 text-sm text-success-500 hover:bg-gray-100 flex items-center gap-2"
                                onClick={() => {
                                    onApprove(comment);
                                    setIsOpen(false);
                                }}
                            >
                                <Icon icon="lucide:check" />
                                Approve
                            </button>
                        </li>
                    )}
                    {(comment.status === 'pending' || comment.status === 'approved') && (
                        <li>
                            <button
                                className="w-full text-left px-4 py-2 text-sm text-danger-500 hover:bg-gray-100 flex items-center gap-2"
                                onClick={() => {
                                    onReject(comment);
                                    setIsOpen(false);
                                }}
                            >
                                <Icon icon="lucide:x" />
                                Reject
                            </button>
                        </li>
                    )}
                    <li>
                        <button
                            className="w-full text-left px-4 py-2 text-sm text-danger-500 hover:bg-gray-100 flex items-center gap-2"
                            onClick={() => {
                                onDelete(comment);
                                setIsOpen(false);
                            }}
                        >
                            <Icon icon="lucide:trash" />
                            Delete
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default CommentActions;