import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { Post } from '../../store/interfaces/postInterfaces';


interface PostActionsProps {
    post: Post;
    onView?: (post: Post) => void;
    onEdit?: (post: Post) => void;
    onArchiveRestore?: (post: Post) => void;
    onDelete?: (post: Post) => void;
}

const PostActions: React.FC<PostActionsProps> = ({
    post,
    onView = () => { },
    onEdit = () => { },
    onArchiveRestore = () => { },
    onDelete = () => { }
}) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <Icon icon="lucide:more-vertical" className="text-default-500" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Post actions">
                <DropdownItem key="view"
                    startContent={<Icon icon="lucide:eye" />}
                    onPress={() => onView(post)}
                >
                    View
                </DropdownItem>
                <DropdownItem key="edit"
                    startContent={<Icon icon="lucide:edit" />}
                    onPress={() => onEdit(post)}
                >
                    Edit
                </DropdownItem>
                {post.status !== 'archived' ? (
                    <DropdownItem key="archive"
                        startContent={<Icon icon="lucide:archive" />}
                        color="warning"
                        onPress={() => onArchiveRestore(post)}
                    >
                        Archive
                    </DropdownItem>
                ) : (
                    <DropdownItem key="restore"
                        startContent={<Icon icon="lucide:rotate-ccw" />}
                        color="success"
                        onPress={() => onArchiveRestore(post)}
                    >
                        Restore
                    </DropdownItem>
                )}
                <DropdownItem key="delete"
                    startContent={<Icon icon="lucide:trash" />}
                    color="danger"
                    onPress={() => onDelete(post)}
                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default PostActions;