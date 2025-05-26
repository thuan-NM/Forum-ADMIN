import React from 'react';
import { Progress } from '@heroui/react';
import { Icon } from '@iconify/react';

interface TrafficSourceItemProps {
    source: string;
    percentage: number;
    change: number;
}

const TrafficSourceItem: React.FC<TrafficSourceItemProps> = ({ source, percentage, change }) => {
    // Map source names to icons
    const getSourceIcon = (source: string) => {
        switch (source.toLowerCase()) {
            case 'direct':
                return 'lucide:globe';
            case 'search':
                return 'lucide:search';
            case 'social':
                return 'lucide:share-2';
            case 'referral':
                return 'lucide:external-link';
            case 'email':
                return 'lucide:mail';
            default:
                return 'lucide:link';
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Icon icon={getSourceIcon(source)} className="text-default-500" />
                    <span className="font-medium">{source}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium">{percentage}%</span>
                    <span className={`text-xs ${change >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
                        {change > 0 ? '+' : ''}{change}%
                    </span>
                </div>
            </div>
            <Progress
                value={percentage}
                color={source === 'Direct' ? 'primary' :
                    source === 'Search' ? 'secondary' :
                        source === 'Social' ? 'success' :
                            source === 'Referral' ? 'warning' : 'default'}
                size="sm"
            />
        </div>
    );
};

export default TrafficSourceItem;