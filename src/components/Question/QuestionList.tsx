import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Chip,
  type SortDescriptor,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import QuestionActions from "./QuestionActions";
import type { QuestionResponse } from "../../store/interfaces/questionInterfaces";
import { StatusChip } from "../Common";

interface QuestionListProps {
  questions: QuestionResponse[];
  loading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  loading,
  page,
  totalPages,
  onPageChange,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    {} as SortDescriptor
  );

  const sortedQuestions = useMemo(() => {
    if (!sortDescriptor.column) return questions;

    return [...questions].sort((a, b) => {
      let cmp = 0;

      switch (sortDescriptor.column) {
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "author":
          cmp = a.author.fullName.localeCompare(b.author.fullName);
          break;
        case "topic":
          cmp = a.topic.name.localeCompare(b.topic.name);
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
        case "question_state":
          cmp = a.interactionStatus.localeCompare(b.interactionStatus);
          break;
        case "stats":
          cmp = a.answersCount - b.answersCount;
          break;
        case "created":
          cmp =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [questions, sortDescriptor]);

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <Table
      aria-label="Questions table"
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
        <TableColumn key="title" allowsSorting>
          TIÊU ĐỀ
        </TableColumn>
        <TableColumn key="author" allowsSorting>
          TÁC GIẢ
        </TableColumn>
        <TableColumn key="topic" allowsSorting>
          CHỦ ĐỀ
        </TableColumn>
        <TableColumn key="status" allowsSorting>
          TRẠNG THÁI DUYỆT
        </TableColumn>
        <TableColumn key="question_state" allowsSorting>
          TRẠNG THÁI CÂU HỎI
        </TableColumn>
        <TableColumn key="stats" allowsSorting>
          THỐNG KÊ
        </TableColumn>
        <TableColumn key="created" allowsSorting>
          NGÀY TẠO
        </TableColumn>
        <TableColumn key="actions">HÀNH ĐỘNG</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No questions found"}>
        {sortedQuestions.map((question) => (
          <TableRow key={question.id}>
            <TableCell>
              <p className="font-medium truncate max-w-[200px]">
                {question.title}
              </p>
            </TableCell>
            <TableCell>{question.author.fullName}</TableCell>
            <TableCell>
              <Chip color="success" variant="flat" size="sm">
                {question.topic.name}
              </Chip>
            </TableCell>
            <TableCell>
              <StatusChip status={question.status} type="question" />
            </TableCell>
            <TableCell>
              <StatusChip
                status={question.interactionStatus}
                type="interaction_status"
              />
            </TableCell>
            <TableCell>
              <div className="flex flex-row gap-x-3 text-xs">
                <div className="flex items-center gap-1">
                  <Icon
                    icon="lucide:message-square"
                    fontSize={14}
                    className="text-default-400"
                  />
                  <span>{question.answersCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon
                    icon="fe:bookmark"
                    fontSize={14}
                    className="text-default-400"
                  />
                  <span>{question.followsCount}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{formatDate(question.createdAt)}</TableCell>
            <TableCell>
              <QuestionActions question={question} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default QuestionList;
