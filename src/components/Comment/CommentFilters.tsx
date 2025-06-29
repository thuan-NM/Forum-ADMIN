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
                placeholder="Tìm kiếm bình luận..."
                value={searchQuery}
                onValueChange={onSearchChange}
                startContent={<Icon icon="lucide:search" className="text-default-400" />}
                className="w-full sm:w-64 bg-content1 rounded-lg"
                variant='bordered'
                radius='sm'
                isClearable
            />

            <Select
                placeholder="Lọc trạng thái"
                selectedKeys={[statusFilter]}
                className="w-full sm:w-40 !bg-content1 rounded-lg"
                radius='sm'
                variant='bordered'
                onChange={(e) => onStatusChange(e.target.value)}
            >
                <SelectItem key="all" textValue="All">Tất cả</SelectItem>
                <SelectItem key="approved" textValue="Approved">Chấp nhận</SelectItem>
                <SelectItem key="pending" textValue="Pending">Đang chờ</SelectItem>
                <SelectItem key="spam" textValue="Spam">Spam</SelectItem>
                <SelectItem key="rejected" textValue="Rejected">Từ chối</SelectItem>
            </Select>

            <Select
                placeholder="Lọc theo loại"
                selectedKeys={[typeFilter]}
                className="w-full sm:w-40 !bg-content1 rounded-lg"
                radius='sm'
                variant='bordered'
                onChange={(e) => onTypeChange(e.target.value)}
            >
                <SelectItem key="all" textValue="All">Tất cả</SelectItem>
                <SelectItem key="post_id" textValue="Posts">Bài đăng</SelectItem>
                <SelectItem key="answer_id" textValue="Answers">Câu trả lời</SelectItem>
                <SelectItem key="parent_id" textValue="Comments">Bình luận</SelectItem>
            </Select>
        </div>
    );
};

export default CommentFilters;