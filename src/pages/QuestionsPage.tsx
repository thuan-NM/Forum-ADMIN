import React from "react";
import { Card } from "@heroui/react";
import type { QuestionResponse } from "../store/interfaces/questionInterfaces";
import QuestionList from "../components/Question/QuestionList";
import QuestionFilters from "../components/Question/QuestionFilters";
import { useQuery } from "@tanstack/react-query";
import { GetAllQuestions } from "../services";
import { EmptyState, ErrorState, LoadingState } from "../components/Common";

const QuestionsPage: React.FC = () => {
  const [page, setPage] = React.useState<number>(1);

  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [interstatusFilter, setInterstatusFilter] =
    React.useState<string>("all");
  const [topicFilter, setTopicFilter] = React.useState<string>("");

  const rowsPerPage = 10;
  const filters = {
    ...(searchQuery && { search: searchQuery }),
    ...(statusFilter !== "all" && { status: statusFilter }),
    ...(interstatusFilter !== "all" && { interstatus: interstatusFilter }),
    ...(topicFilter && { topic_id: topicFilter }),
    page,
    limit: rowsPerPage,
  };

  const { data, isLoading, isError, error } = useQuery<{
    questions: QuestionResponse[];
    total: number;
  }>({
    queryKey: ["questions", filters],
    queryFn: () => GetAllQuestions(filters),
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleInterstatusFilter = (value: string) => {
    setInterstatusFilter(value);
    setPage(1);
  };

  const handleTopicFilter = (value: string) => {
    setTopicFilter(value);
    setPage(1);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (isError) {
    return <ErrorState message={error.message || "Failed to load questions"} />;
  }

  if (isLoading) {
    return <LoadingState message={"Loading questions ..."} />;
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <QuestionFilters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          topicFilter={topicFilter}
          interstatusFilter={interstatusFilter}
          onInterstatusChange={handleInterstatusFilter}
          onSearchChange={handleSearch}
          onStatusChange={handleStatusFilter}
          onTopicChange={handleTopicFilter}
          isGlobalLoading={isLoading}
        />
        {isLoading ? (
          <LoadingState message={"Loading questions ..."} />
        ) : data?.questions != null ? (
          <Card className="w-full p-4" radius="sm">
            <QuestionList
              questions={data?.questions || []}
              loading={isLoading}
              page={page}
              totalPages={Math.ceil((data?.total || 0) / rowsPerPage)}
              onPageChange={handlePageChange}
            />
          </Card>
        ) : (
          <Card className="w-full p-4" radius="sm">
            <EmptyState title="No question found" />
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
