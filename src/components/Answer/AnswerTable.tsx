import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Avatar,
  Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import type { AnswerResponse } from "../../store/interfaces/answerInterfaces";
import AnswerActions from "./AnswerActions";
import { StatusChip } from "../Common";

interface AnswerTableProps {
  answers: AnswerResponse[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDeleteAnswer: (answer: AnswerResponse) => void;
  onUpdateStatus: (id: string, status: string) => void;
}

const AnswerTable: React.FC<AnswerTableProps> = ({
  answers,
  page,
  totalPages,
  onPageChange,
  onDeleteAnswer,
  onUpdateStatus,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateHTML = (html: string, maxLength: number = 100) => {
    const text = html.replace(/<[^>]*>/g, "");
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Table
      aria-label="Bảng câu trả lời"
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
        <TableColumn>Nội dung</TableColumn>
        <TableColumn>Người đăng</TableColumn>
        <TableColumn>Câu hỏi</TableColumn>
        <TableColumn>Trạng thái</TableColumn>
        <TableColumn>TAGS</TableColumn>
        <TableColumn>STATS</TableColumn>
        <TableColumn>Ngày tạo</TableColumn>
        <TableColumn>Hành động</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"Không có câu trả lời nào"}>
        {answers.map((answer) => (
          <TableRow key={answer.id}>
            <TableCell className="!max-w-[200px] min-w-[200px]">
              <p className="truncate">{truncateHTML(answer.content)}</p>
              {answer.hasEditHistory && (
                <span className="text-xs text-default-500 mt-1 inline-block">
                  (đã chỉnh sửa)
                </span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar
                  name={answer.author.fullName}
                  size="sm"
                  src={answer.author.avatar}
                />
                <span>{answer.author.fullName}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="text-sm truncate max-w-[200px]">
                  {answer.question.title}
                </span>
                <span className="text-xs text-default-500">
                  ID: {answer.question.id}
                </span>
              </div>
            </TableCell>
            <TableCell>
              {answer.isAccepted ? (
                <StatusChip type="answer" status="accepted"></StatusChip>
              ) : (
                <StatusChip type="answer" status={answer.status} />
              )}
            </TableCell>
            <TableCell>
              {answer.tags ? (
                <div className="flex flex-row flex-wrap gap-1 max-w-[150px]">
                  {answer?.tags.map((tag) => (
                    <Chip size="sm" color="success" variant="flat">
                      {tag.name}
                    </Chip>
                  ))}
                </div>
              ) : (
                <Chip size="sm" color="danger" variant="flat">
                  Không có tags
                </Chip>
              )}
            </TableCell>
            <TableCell>
              <div className="flex flex-row gap-x-3 text-xs">
                <div className="flex items-center gap-1">
                  <Icon
                    icon="lucide:thumbs-up"
                    fontSize={14}
                    className="text-default-400"
                  />
                  <span>{answer.comments?.length || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon
                    icon="lucide:message-square"
                    fontSize={14}
                    className="text-default-400"
                  />
                  <span>{answer.comments?.length || 0}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{formatDate(answer.createdAt)}</TableCell>
            <TableCell>
              <AnswerActions
                answer={answer}
                onUpdateStatus={onUpdateStatus}
                onDelete={onDeleteAnswer}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AnswerTable;
