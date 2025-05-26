import React from 'react';
import { Button } from '@heroui/react';

interface TimeRangeSelectorProps {
    timeRange: string;
    onTimeRangeChange: (range: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
    timeRange,
    onTimeRangeChange
}) => {
    return (
        <div className="flex gap-2">
            <Button
                variant={timeRange === '7d' ? 'solid' : 'flat'}
                color={timeRange === '7d' ? 'primary' : 'default'}
                onPress={() => onTimeRangeChange('7d')}
                size="sm"
            >
                7 Days
            </Button>
            <Button
                variant={timeRange === '30d' ? 'solid' : 'flat'}
                color={timeRange === '30d' ? 'primary' : 'default'}
                onPress={() => onTimeRangeChange('30d')}
                size="sm"
            >
                30 Days
            </Button>
            <Button
                variant={timeRange === '90d' ? 'solid' : 'flat'}
                color={timeRange === '90d' ? 'primary' : 'default'}
                onPress={() => onTimeRangeChange('90d')}
                size="sm"
            >
                90 Days
            </Button>
        </div>
    );
};

export default TimeRangeSelector;