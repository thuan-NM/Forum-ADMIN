import React from 'react';
import { Input, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';

interface CommentFiltersProps {
    searchQuery: string;
    statusFilter: string;
    typeFilter: string;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onTypeChange: (value: string) => void;
}

const CommentFilters: React.FC<CommentFiltersProps> = ({
    searchQuery,
    statusFilter,
    typeFilter,
    onSearchChange,
    onStatusChange,
    onTypeChange
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Input
                placeholder="Search comments..."
                value={searchQuery}
                onValueChange={onSearchChange}
                startContent={<Icon icon="lucide:search" className="text-default-400" />}
                className="w-full sm:w-64 bg-content1 rounded-lg"
                variant='bordered'
                radius='sm'
            />

            <Select
                placeholder="Filter by status"
                selectedKeys={[statusFilter]}
                className="w-full sm:w-40 !bg-content1 rounded-lg"
                radius='sm'
                variant='bordered'
                onChange={(e) => onStatusChange(e.target.value)}
            >
                <SelectItem key="all" textValue="All">All</SelectItem>
                <SelectItem key="approved" textValue="Approved">Approved</SelectItem>
                <SelectItem key="pending" textValue="Pending">Pending</SelectItem>
                <SelectItem key="spam" textValue="Spam">Spam</SelectItem>
                <SelectItem key="deleted" textValue="Deleted">Deleted</SelectItem>
            </Select>

            <Select
                placeholder="Filter by type"
                selectedKeys={[typeFilter]}
                className="w-full sm:w-40 !bg-content1 rounded-lg"
                radius='sm'
                variant='bordered'
                onChange={(e) => onTypeChange(e.target.value)}
            >
                <SelectItem key="all" textValue="All">All</SelectItem>
                <SelectItem key="post" textValue="Post">Post Comments</SelectItem>
                <SelectItem key="answer" textValue="Answer">Answers Comments</SelectItem>
            </Select>
        </div>
    );
};

export default CommentFilters;