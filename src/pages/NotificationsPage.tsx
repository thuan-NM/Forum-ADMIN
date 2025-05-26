import React from 'react';
import { Card } from '@heroui/react';
import { ErrorState, LoadingState } from '../components/Common';
import NotificationFilters from '../components/Notification/NotificationFilters';
import NotificationList from '../components/Notification/NotificationList';
import type { Notification } from '../store/interfaces/notificationInterfaces';

const NotificationsPage: React.FC = () => {
    const [notifications, setNotifications] = React.useState<Notification[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');

    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch this data from your API
                // const response = await axios.get(`http://localhost:3000/api/notifications?page=${page}&limit=${rowsPerPage}&search=${searchQuery}`);
                // setNotifications(response.data.notifications);
                // setTotalPages(Math.ceil(response.data.total / rowsPerPage));

                // Simulating API response with mock data
                setTimeout(() => {
                    const notificationTypes = [
                        {
                            type: 'system',
                            titles: ['System Maintenance', 'New Feature', 'Security Update', 'Terms Update'],
                            messages: [
                                'The system will be down for maintenance on Saturday',
                                'We\'ve added a new feature to the forum',
                                'Security patches have been applied',
                                'Our terms of service have been updated'
                            ]
                        },
                        {
                            type: 'user',
                            titles: ['New User Registration', 'User Reported', 'User Banned', 'Profile Update'],
                            messages: [
                                'A new user has registered',
                                'A user has been reported for inappropriate behavior',
                                'A user has been banned',
                                'A user has updated their profile'
                            ]
                        },
                        {
                            type: 'post',
                            titles: ['New Post', 'Post Reported', 'Post Trending', 'Post Edited'],
                            messages: [
                                'A new post has been created',
                                'A post has been reported',
                                'A post is trending',
                                'A post has been edited'
                            ]
                        },
                        {
                            type: 'comment',
                            titles: ['New Comment', 'Comment Reported', 'Comment Edited', 'Comment Deleted'],
                            messages: [
                                'A new comment has been added to an answer',
                                'A comment has been reported',
                                'A comment has been edited',
                                'A comment has been deleted'
                            ]
                        },
                        {
                            type: 'question',
                            titles: ['New Question', 'Question Reported', 'Question Trending', 'Question Solved'],
                            messages: [
                                'A new question has been asked',
                                'A question has been reported',
                                'A question is trending',
                                'A question has been marked as solved'
                            ]
                        },
                        {
                            type: 'answer',
                            titles: ['New Answer', 'Answer Reported', 'Answer Accepted', 'Answer Edited'],
                            messages: [
                                'A new answer has been posted to your question',
                                'An answer has been reported',
                                'An answer has been accepted as the solution',
                                'An answer to your question has been edited'
                            ]
                        }
                    ];

                    const mockNotifications: Notification[] = Array.from({ length: 45 }, (_, i) => {
                        const typeIndex = i % notificationTypes.length;
                        const typeInfo = notificationTypes[typeIndex];
                        const titleIndex = i % typeInfo.titles.length;

                        return {
                            id: `notification-${i + 1}`,
                            type: typeInfo.type as 'system' | 'user' | 'post' | 'comment' | 'question' | 'answer',
                            title: typeInfo.titles[titleIndex],
                            message: typeInfo.messages[titleIndex],
                            recipient: {
                                id: `user-${(i % 10) + 1}`,
                                username: `user${(i % 10) + 1}`,
                            },
                            isRead: i % 3 === 0,
                            createdAt: new Date(Date.now() - i * 3600000),
                        };
                    });

                    const filteredNotifications = searchQuery
                        ? mockNotifications.filter(notification =>
                            notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            notification.recipient.username.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        : mockNotifications;

                    const paginatedNotifications = filteredNotifications.slice((page - 1) * rowsPerPage, page * rowsPerPage);
                    setNotifications(paginatedNotifications);
                    setTotalPages(Math.ceil(filteredNotifications.length / rowsPerPage));
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching notifications:', err);
                setError('Failed to load notifications');
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [page, searchQuery]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1);
    };

    const handleMarkAsRead = (notification: Notification) => {
        console.log('Marking notification as read:', notification);
    };

    const handleMarkAsUnread = (notification: Notification) => {
        console.log('Marking notification as unread:', notification);
    };

    const handleDeleteNotification = (notification: Notification) => {
        console.log('Deleting notification:', notification);
    };


    if (error) {
        return <ErrorState message={error} />;
    }

    return (
        <div className="space-y-6">

            <div className="flex flex-col gap-4">
                <NotificationFilters
                    searchQuery={searchQuery}
                    onSearchChange={handleSearch}
                />

                <Card className="w-full p-4" radius='sm'>
                    {loading ? (
                        <LoadingState />
                    ) : (
                        <NotificationList
                            notifications={notifications}
                            loading={loading}
                            page={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                            onMarkAsRead={handleMarkAsRead}
                            onMarkAsUnread={handleMarkAsUnread}
                            onDelete={handleDeleteNotification}
                        />
                    )}
                </Card>
            </div>
        </div>
    );
};

export default NotificationsPage;