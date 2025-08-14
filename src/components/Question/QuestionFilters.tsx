import React from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { GetAllTopics } from "../../services";
import type { TopicResponse } from "../../store/interfaces/topicInterfaces";
import { useSyncQuestion } from "../../hooks/questions/useSyncQuestion";

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
  const { SyncQuestions, isSyncing, syncError } = useSyncQuestion();
  return (
    !isGlobalLoading && (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 flex-wrap">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onValueChange={onSearchChange}
            startContent={<Icon icon="lucide:search" className="opacity-50" />}
            className="w-full sm:w-64 bg-content1 rounded-lg"
            variant="bordered"
            radius="sm"
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

          <Select
            placeholder="Filter by status"
            selectedKeys={[interstatusFilter]}
            className="w-full sm:w-40 bg-content1 rounded-lg"
            radius="sm"
            variant="bordered"
            onChange={(e) => onInterstatusChange(e.target.value)}
          >
            <SelectItem key="all" textValue="All">
              All
            </SelectItem>
            <SelectItem key="opened" textValue="Opened">
              Opened
            </SelectItem>
            <SelectItem key="closed" textValue="Closed">
              Closed
            </SelectItem>
            <SelectItem key="solved" textValue="Solved">
              Solved
            </SelectItem>
          </Select>

          {!isLoading && data && !isError && (
            <Select
              placeholder="Filter by topic"
              selectedKeys={[topicFilter]}
              className="w-full sm:w-80 bg-content1 rounded-lg"
              radius="sm"
              variant="bordered"
              onChange={(e) => onTopicChange(e.target.value)}
            >
              <SelectItem key="" textValue="All">
                All
              </SelectItem>
              <>
                {data?.topics?.map((topic) => (
                  <SelectItem key={topic.id} textValue={topic.name}>
                    {topic.name}
                  </SelectItem>
                ))}
              </>
            </Select>
          )}
        </div>
        <div>
          <Button
            variant="bordered"
            className="w-full sm:w-40 bg-content1 rounded-lg"
            onPress={() => SyncQuestions()}
            isLoading={isSyncing}
          >
            Đồng bộ câu hỏi
          </Button>
        </div>
      </div>
    )
  );
};

export default QuestionFilters;
