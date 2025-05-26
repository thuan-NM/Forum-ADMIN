import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { Notification } from '../../store/interfaces/notificationInterfaces';

interface NotificationActionsProps {
    notification: Notification;
    onMarkAsRead?: (notification: Notification) => void;
    onMarkAsUnread?: (notification: Notification) => void;
    onDelete?: (notification: Notification) => void;
}

const NotificationActions: React.FC<NotificationActionsProps> = ({
    notification,
    onMarkAsRead,
    onMarkAsUnread,
    onDelete
}) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <Icon icon="lucide:more-vertical" className="opacity-50" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Notification actions">
                <DropdownItem startContent={<Icon icon="lucide:eye" />} key="view">
                    View
                </DropdownItem>
                {!notification.isRead ? (
                    <DropdownItem key="read"
                        startContent={<Icon icon="lucide:check" />}
                        onPress={() => onMarkAsRead && onMarkAsRead(notification)}
                    >
                        Mark as Read
                    </DropdownItem>
                ) : (
                    <DropdownItem key="unread"
                        startContent={<Icon icon="lucide:rotate-ccw" />}
                        onPress={() => onMarkAsUnread && onMarkAsUnread(notification)}
                    >
                        Mark as Unread
                    </DropdownItem>
                )}
                <DropdownItem key="delete"
                    startContent={<Icon icon="lucide:trash" />}
                    color="danger"
                    onPress={() => onDelete && onDelete(notification)}
                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default NotificationActions;