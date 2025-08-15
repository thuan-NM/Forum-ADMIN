import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  type SortDescriptor,
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
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    {} as SortDescriptor
  );

  const sortedTopics = useMemo(() => {
    if (!sortDescriptor.column) return topics;

    return [...topics].sort((a, b) => {
      let cmp = 0;

      switch (sortDescriptor.column) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "description":
          cmp = a.description.localeCompare(b.description);
          break;
        case "questions":
          cmp = a.questionsCount - b.questionsCount;
          break;
        case "created":
          cmp =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [topics, sortDescriptor]);

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <Table
      aria-label="Bảng chủ đề"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
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
        <TableColumn key="name" allowsSorting>
          TÊN CHỦ ĐỀ
        </TableColumn>
        <TableColumn key="description" allowsSorting>
          MÔ TẢ
        </TableColumn>
        <TableColumn key="questions" allowsSorting>
          CÂU HỎI
        </TableColumn>
        <TableColumn key="created" allowsSorting>
          NGÀY TẠO
        </TableColumn>
        <TableColumn key="actions">HÀNH ĐỘNG</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"Không tìm thấy chủ đề"}>
        {sortedTopics.map((topic) => (
          <TableRow key={topic.id}>
            <TableCell className="font-medium">{topic.name}</TableCell>
            <TableCell className="max-w-xs truncate">
              {topic.description}
            </TableCell>
            <TableCell>{topic.questionsCount}</TableCell>
            <TableCell>{formatDate(topic.createdAt)}</TableCell>
            <TableCell>
              <TopicActions topic={topic} onEdit={onEditTopic} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TopicList;
