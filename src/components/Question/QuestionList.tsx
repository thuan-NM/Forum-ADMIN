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
  Chip,
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
    return new Date(date).toLocaleDateString("en-US", {
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
      aria-label="Questions table"
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
        <TableColumn>TITLE</TableColumn>
        <TableColumn>AUTHOR</TableColumn>
        <TableColumn>TOPIC</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>QUESTION STATE</TableColumn>
        <TableColumn>STATS</TableColumn>
        <TableColumn>CREATED</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No questions found"}>
        {questions.map((question) => (
          <TableRow key={question.id}>
            <TableCell>
              <p className="font-medium truncate max-w-xs">{question.title}</p>
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
                    icon="lucide:thumbs-up"
                    fontSize={14}
                    className="text-default-400"
                  />
                  <span>{question.reactionsCount}</span>
                </div>
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
              <QuestionActions
                question={question}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default QuestionList;
