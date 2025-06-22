import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@heroui/react";
import TopicActions from "./TopicActions";
import type { TopicResponse } from "../../store/interfaces/topicInterfaces";

interface TopicListProps {
  topics: TopicResponse[];
  loading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEditTopic: (topic: TopicResponse) => void;
}

const TopicList: React.FC<TopicListProps> = ({
  topics,
  loading,
  page,
  totalPages,
  onPageChange,
  onEditTopic,
}) => {
  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <Table
      aria-label="Topics table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPages}
            onChange={onPageChange}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[400px]",
      }}
      removeWrapper
    >
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>DESCRIPTION</TableColumn>
        <TableColumn>QUESTIONS</TableColumn>
        <TableColumn>CREATED</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No topics found"}>
        {topics.map((topic) => (
          <TableRow key={topic.id}>
            <TableCell className="font-medium">{topic.name}</TableCell>
            <TableCell className="max-w-xs truncate">
              {topic.description}
            </TableCell>
            <TableCell>{topic.questionsCount}</TableCell>
            <TableCell>{formatDate(topic.createdAt)}</TableCell>
            <TableCell>
              <TopicActions
                topic={topic}
                onEdit={onEditTopic}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TopicList;
