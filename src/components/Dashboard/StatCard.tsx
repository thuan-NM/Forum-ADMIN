import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon: string;
    iconColor: string;
    iconBgColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    change,
    icon,
    iconColor,
    iconBgColor
}) => {
    return (
        <Card>
            <CardBody className="p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-default-500 text-sm">{title}</p>
                        <h3 className="text-3xl font-semibold mt-1">{value}</h3>
                        {change !== undefined && (
                            <p className={`text-xs mt-2 flex items-center ${change >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
                                <Icon icon={change >= 0 ? 'lucide:trending-up' : 'lucide:trending-down'} className="mr-1" />
                                <span>{change >= 0 ? '+' : ''}{change}%</span>
                            </p>
                        )}
                    </div>
                    <div className={`${iconBgColor} p-4 rounded-full`}>
                        <Icon icon={icon} className={`${iconColor} w-6 h-6`} />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default StatsCard;