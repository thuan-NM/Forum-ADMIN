import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { GetAllTopics } from "../../services";
import type { TopicResponse } from "../../store/interfaces/topicInterfaces";

interface QuestionFiltersProps {
  searchQuery: string;
  statusFilter: string;
  topicFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTopicChange: (value: string) => void;
  onInterstatusChange: (value: string) => void;
  isGlobalLoading: boolean;
  interstatusFilter: string;
}

const QuestionFilters: React.FC<QuestionFiltersProps> = ({
  searchQuery,
  statusFilter,
  topicFilter,
  onSearchChange,
  onStatusChange,
  onTopicChange,
  onInterstatusChange,
  isGlobalLoading,
  interstatusFilter,
}) => {
  const { data, isLoading, isError } = useQuery<{
    topics: TopicResponse[];
    total: number;
  }>({
    queryKey: ["topics"],
    queryFn: () => GetAllTopics({ limit: 10000000 }),
  });

  return (
    !isGlobalLoading && (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 flex-wrap">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Input
            placeholder="Tìm kiếm câu hỏi..."
            value={searchQuery}
            onValueChange={onSearchChange}
            startContent={<Icon icon="lucide:search" className="opacity-50" />}
            className="w-full sm:w-64 bg-content1 rounded-lg"
            variant="bordered"
            radius="sm"
            isClearable
          />

          <Select
            placeholder="Lọc theo trạng thái duyệt"
            selectedKeys={[statusFilter]}
            className="w-full sm:w-40 bg-content1 rounded-lg"
            radius="sm"
            variant="bordered"
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <SelectItem key="all" textValue="Tất cả">
              Tất cả
            </SelectItem>
            <SelectItem key="approved" textValue="Đã duyệt">
              Đã duyệt
            </SelectItem>
            <SelectItem key="pending" textValue="Chờ duyệt">
              Chờ duyệt
            </SelectItem>
            <SelectItem key="rejected" textValue="Từ chối">
              Từ chối
            </SelectItem>
          </Select>

          <Select
            placeholder="Lọc theo trạng thái câu hỏi"
            selectedKeys={[interstatusFilter]}
            className="w-full sm:w-40 bg-content1 rounded-lg"
            radius="sm"
            variant="bordered"
            onChange={(e) => onInterstatusChange(e.target.value)}
          >
            <SelectItem key="all" textValue="Tất cả">
              Tất cả
            </SelectItem>
            <SelectItem key="opened" textValue="Đang mở">
              Đang mở
            </SelectItem>
            <SelectItem key="closed" textValue="Đã đóng">
              Đã đóng
            </SelectItem>
            <SelectItem key="solved" textValue="Được trả lời">
              Được trả lời
            </SelectItem>
          </Select>

          {!isLoading && data && !isError && (
            <Select
              placeholder="Lọc theo chủ đề"
              selectedKeys={[topicFilter]}
              className="w-full sm:w-80 bg-content1 rounded-lg"
              radius="sm"
              variant="bordered"
              onChange={(e) => onTopicChange(e.target.value)}
            >
              <SelectItem key="" textValue="Tất cả">
                Tất cả
              </SelectItem>
              <>
                {data?.topics.map((topic) => (
                  <SelectItem key={topic.id} textValue={topic.name}>
                    {topic.name}
                  </SelectItem>
                ))}
              </>
            </Select>
          )}
        </div>
      </div>
    )
  );
};

export default QuestionFilters;
