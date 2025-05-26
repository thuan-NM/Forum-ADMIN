import React from 'react';
import { Input, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface ReportFiltersProps {
    searchQuery: string;
    statusFilter: string;
    onSearchChange: (value: string) => void;
    onStatusFilter: (status: string) => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
    searchQuery,
    statusFilter,
    onSearchChange,
    onStatusFilter
}) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 flex-wrap">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
                <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onValueChange={onSearchChange}
                    startContent={<Icon icon="lucide:search" className="opacity-50" />}
                    className="w-full sm:w-64 bg-content1 rounded-lg"
                    variant='bordered'
                    radius='sm'
                />

                <div className="flex gap-2">
                    <Button
                        variant={statusFilter === 'all' ? 'solid' : 'flat'}
                        color={statusFilter === 'all' ? 'primary' : 'default'}
                        onPress={() => onStatusFilter('all')}
                        size="sm"
                    >
                        All
                    </Button>
                    <Button
                        variant={statusFilter === 'pending' ? 'solid' : 'flat'}
                        color={statusFilter === 'pending' ? 'warning' : 'default'}
                        onPress={() => onStatusFilter('pending')}
                        size="sm"
                    >
                        Pending
                    </Button>
                    <Button
                        variant={statusFilter === 'resolved' ? 'solid' : 'flat'}
                        color={statusFilter === 'resolved' ? 'success' : 'default'}
                        onPress={() => onStatusFilter('resolved')}
                        size="sm"
                    >
                        Resolved
                    </Button>
                    <Button
                        variant={statusFilter === 'dismissed' ? 'solid' : 'flat'}
                        color={statusFilter === 'dismissed' ? 'default' : 'default'}
                        onPress={() => onStatusFilter('dismissed')}
                        size="sm"
                    >
                        Dismissed
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReportFilters;