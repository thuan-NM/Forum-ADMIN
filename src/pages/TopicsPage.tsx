import React from "react";
import { Card } from "@heroui/react";
import { useDisclosure } from "@heroui/react";

import type { Topic, TopicResponse } from "../store/interfaces/topicInterfaces";
import TopicSearch from "../components/Topic/TopicSearch";
import TopicList from "../components/Topic/TopicList";
import TopicForm from "../components/Topic/TopicForm";
import { GetAllTopics } from "../services/TopicServices";
import { useQuery } from "@tanstack/react-query";
import { ErrorState } from "../components/Common";

const Topics: React.FC = () => {
  const [page, setPage] = React.useState<number>(1);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Topic form modal state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [selectedTopic, setSelectedTopic] = React.useState<TopicResponse>({} as TopicResponse);

  const rowsPerPage = 10;

  const filters = {
    ...(searchQuery && { search: searchQuery }),
    page,
    limit: rowsPerPage,
  };
  const { data, isLoading, isError, error } = useQuery<{
    topics: TopicResponse[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>({
    queryKey: ["topics", filters],
    queryFn: () => GetAllTopics(filters),
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleAddTopic = () => {
    setFormMode("create");
    onOpen();
  };

  const handleEditTopic = (topic: TopicResponse) => {
    setFormMode("edit");
    setSelectedTopic(topic);
    onOpen();
  };

  if (isError) {
    return <ErrorState message={error.message || "Failed to load topics"} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <TopicSearch
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onAddTopic={handleAddTopic}
        />

        <Card className="w-full p-4" radius="sm">
          <TopicList
            topics={data?.topics || []}
            loading={isLoading}
            page={page}
            totalPages={Math.ceil((data?.total || 0) / rowsPerPage)}
            onPageChange={setPage}
            onEditTopic={handleEditTopic}
          />
        </Card>
      </div>

      <TopicForm
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        mode={formMode}
        topic={selectedTopic}
      />
    </div>
  );
};

export default Topics;
