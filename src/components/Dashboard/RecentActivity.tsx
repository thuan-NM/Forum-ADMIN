import React from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import ActivityItem from './ActivityItem';

interface Activity {
    id: string;
    type: 'user' | 'post' | 'comment' | 'category' | 'question' | 'answer';
    title: string;
    description: string;
    time: string;
}

interface RecentActivityProps {
    activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
    // Map activity types to icon and color
    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'user':
                return {
                    icon: 'lucide:user-plus',
                    bgColor: 'bg-primary-100',
                    color: 'text-primary-500'
                };
            case 'post':
                return {
                    icon: 'lucide:file-plus',
                    bgColor: 'bg-secondary-100',
                    color: 'text-secondary-500'
                };
            case 'comment':
                return {
                    icon: 'lucide:message-square',
                    bgColor: 'bg-success-100',
                    color: 'text-success-500'
                };
            case 'category':
                return {
                    icon: 'lucide:tag',
                    bgColor: 'bg-warning-100',
                    color: 'text-warning-500'
                };
            case 'question':
                return {
                    icon: 'lucide:help-circle',
                    bgColor: 'bg-danger-100',
                    color: 'text-danger-500'
                };
            case 'answer':
                return {
                    icon: 'lucide:message-circle',
                    bgColor: 'bg-primary-100',
                    color: 'text-primary-500'
                };
            default:
                return {
                    icon: 'lucide:activity',
                    bgColor: 'bg-default-100',
                    color: 'text-default-500'
                };
        }
    };

    return (
        <Card>
            <CardHeader className="pb-0">
                <h3 className="text-lg font-semibold">Hoạt động gần đây</h3>
            </CardHeader>
            <CardBody>
                <div className="space-y-4">
                    {activities.map((activity) => {
                        const { icon, bgColor, color } = getActivityIcon(activity.type);

                        return (
                            <ActivityItem
                                key={activity.id}
                                icon={icon}
                                iconBgColor={bgColor}
                                iconColor={color}
                                title={activity.title}
                                description={activity.description}
                                time={activity.time}
                            />
                        );
                    })}
                </div>
            </CardBody>
        </Card>
    );
};

export default RecentActivity;