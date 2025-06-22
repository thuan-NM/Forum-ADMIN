import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";

interface AnswerFiltersProps {
  searchQuery: string;
  statusFilter: string;
  questionFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onQuestionChange: (value: string) => void;
}

const AnswerFilters: React.FC<AnswerFiltersProps> = ({
  searchQuery,
  statusFilter,
  questionFilter,
  onSearchChange,
  onStatusChange,
  onQuestionChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <Input
        placeholder="Search answers..."
        value={searchQuery}
        onValueChange={onSearchChange}
        startContent={
          <Icon icon="lucide:search" className="text-default-400" />
        }
        className="w-full sm:w-64 bg-content1 rounded-lg"
        radius="sm"
        variant="bordered"
        isClearable
      />

      <Select
        placeholder="Filter by status"
        selectedKeys={[statusFilter]}
        className="w-full sm:w-40 bg-content1 rounded-lg"
        radius="sm"
        variant="bordered"
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <SelectItem key="all" textValue="All">
          All
        </SelectItem>
        <SelectItem key="approved" textValue="Approved">
          Approved
        </SelectItem>
        <SelectItem key="pending" textValue="Pending">
          Pending
        </SelectItem>
        <SelectItem key="rejected" textValue="Rejected">
          Rejected
        </SelectItem>
      </Select>
      <Input
        placeholder="Search questions..."
        value={questionFilter}
        onValueChange={onQuestionChange}
        startContent={
          <Icon icon="lucide:search" className="text-default-400" />
        }
        className="w-full sm:w-64 bg-content1 rounded-lg"
        radius="sm"
        variant="bordered"
        isClearable
      />
    </div>
  );
};

export default AnswerFilters;
