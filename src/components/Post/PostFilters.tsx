import React from 'react';
import { Input, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';

interface PostFiltersProps {
    searchQuery: string;
    statusFilter: string;
    tagFilter: string;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onTagChange: (value: string) => void;
}

const PostFilters: React.FC<PostFiltersProps> = ({
    searchQuery,
    statusFilter,
    tagFilter,
    onSearchChange,
    onStatusChange,
    onTagChange,
}) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 flex-wrap">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Input
                    placeholder="Search posts..."
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
                    className="w-full sm:w-40 bg-content1 rounded-lg"
                    radius='sm'
                    variant='bordered'
                    onChange={(e) => onStatusChange(e.target.value)}
                >
                    <SelectItem key="all" textValue="All">All</SelectItem>
                    <SelectItem key="published" textValue="Published">Published</SelectItem>
                    <SelectItem key="draft" textValue="Draft">Draft</SelectItem>
                    <SelectItem key="archived" textValue="Archived">Archived</SelectItem>
                </Select>

                <Select
                    placeholder="Filter by tag"
                    selectedKeys={tagFilter ? [tagFilter] : []}
                    className="w-full sm:w-40 bg-content1 rounded-lg"
                    radius='sm'
                    variant='bordered' onChange={(e) => onTagChange(e.target.value)}
                >
                    <SelectItem key="" textValue="">All Tags</SelectItem>
                    <SelectItem key="React" textValue="React">React</SelectItem>
                    <SelectItem key="JavaScript" textValue="JavaScript">JavaScript</SelectItem>
                    <SelectItem key="TypeScript" textValue="TypeScript">TypeScript</SelectItem>
                    <SelectItem key="Node.js" textValue="Node.js">Node.js</SelectItem>
                    <SelectItem key="CSS" textValue="CSS">CSS</SelectItem>
                    <SelectItem key="HTML" textValue="HTML">HTML</SelectItem>
                </Select>
            </div>
        </div>
    );
};

export default PostFilters;