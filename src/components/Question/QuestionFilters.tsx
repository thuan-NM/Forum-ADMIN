import React from 'react';
import { Input, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';

interface QuestionFiltersProps {
    searchQuery: string;
    statusFilter: string;
    topicFilter: string;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onTopicChange: (value: string) => void;
}

const QuestionFilters: React.FC<QuestionFiltersProps> = ({
    searchQuery,
    statusFilter,
    topicFilter,
    onSearchChange,
    onStatusChange,
    onTopicChange,
}) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 flex-wrap">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Input
                    placeholder="Search questions..."
                    value={searchQuery}
                    onValueChange={onSearchChange}
                    startContent={<Icon icon="lucide:search" className="opacity-50" />}
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
                    <SelectItem key="open" textValue="Open">Open</SelectItem>
                    <SelectItem key="closed" textValue="Closed">Closed</SelectItem>
                    <SelectItem key="solved" textValue="Solved">Solved</SelectItem>
                    <SelectItem key="duplicate" textValue="Duplicate">Duplicate</SelectItem>
                </Select>

                <Select
                    placeholder="All Topics"
                    selectedKeys={topicFilter ? [topicFilter] : []}
                    className="w-full sm:w-48 bg-content1 rounded-lg"
                    radius='sm'
                    variant='bordered'
                    onChange={(e) => onTopicChange(e.target.value)}
                >
                    <SelectItem key="" textValue="">All Topics</SelectItem>
                    <SelectItem key="Programming Languages" textValue="Programming Languages">Programming Languages</SelectItem>
                    <SelectItem key="Web Development" textValue="Web Development">Web Development</SelectItem>
                    <SelectItem key="Mobile Development" textValue="Mobile Development">Mobile Development</SelectItem>
                    <SelectItem key="Data Science" textValue="Data Science">Data Science</SelectItem>
                    <SelectItem key="DevOps" textValue="DevOps">DevOps</SelectItem>
                </Select>

            </div>
        </div>
    );
};

export default QuestionFilters;