import React from 'react';
import { Card, CardBody, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';

interface StatsOverviewProps {
    title: string;
    icon: string;
    iconBgColor: string;
    iconColor: string;
    stats: {
        label: string;
        value: string | number;
    }[];
    change?: number;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({
    title,
    icon,
    iconBgColor,
    iconColor,
    stats,
    change
}) => {
    return (
        <Card>
            <CardBody className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <div className={`${iconBgColor} p-2 rounded-full`}>
                            <Icon icon={icon} className={`${iconColor} w-5 h-5`} />
                        </div>
                        <h3 className="font-semibold">{title}</h3>
                    </div>
                    {change !== undefined && (
                        <Chip color={change >= 0 ? 'success' : 'danger'} variant="flat" size="sm">
                            {change >= 0 ? '+' : ''}{change}%
                        </Chip>
                    )}
                </div>
                <div className="space-y-3">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex justify-between">
                            <p className="text-default-500 text-sm">{stat.label}</p>
                            <p className="font-medium">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
};

export default StatsOverview;