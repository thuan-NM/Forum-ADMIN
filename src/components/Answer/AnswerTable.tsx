import React, { useState, useEffect, useMemo } from "react";
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
  Tooltip,
  type SortDescriptor,
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

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("vi-VN", {
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

const TagsCell: React.FC<{ tags: { name: string }[] | undefined }> = ({
  tags,
}) => {
  if (!tags || tags.length === 0) {
    return (
      <Chip size="sm" color="danger" variant="flat">
        No tags attached
      </Chip>
    );
  }

  const [visibleCount, setVisibleCount] = useState(tags.length);

  useEffect(() => {
    const MAX_WIDTH = 150;
    const GAP = 4; // gap-1 ≈ 4px
    const PLUS_WIDTH = 40; // approximate width for +N chip

    // Measure widths of chips approximately
    const chipWidths = tags.map((tag) => {
      const span = document.createElement("span");
      span.style.fontSize = "0.75rem"; // size="sm"
      span.style.paddingLeft = "0.5rem";
      span.style.paddingRight = "0.5rem";
      span.style.whiteSpace = "nowrap";
      span.style.position = "absolute";
      span.style.visibility = "hidden";
      span.innerText = tag.name;
      document.body.appendChild(span);
      const width = span.getBoundingClientRect().width;
      document.body.removeChild(span);
      return width;
    });

    let cumulativeWidth = 0;
    let count = 0;

    for (let i = 0; i < tags.length; i++) {
      const added = chipWidths[i] + (i > 0 ? GAP : 0);
      if (cumulativeWidth + added > MAX_WIDTH) {
        break;
      }
      cumulativeWidth += added;
      count++;
    }

    if (count < tags.length) {
      const addPlusWithoutRemove =
        cumulativeWidth + (count > 0 ? GAP : 0) + PLUS_WIDTH <= MAX_WIDTH;
      if (addPlusWithoutRemove) {
        setVisibleCount(count);
      } else {
        setVisibleCount(count > 0 ? count - 1 : 0);
      }
    } else {
      setVisibleCount(count);
    }
  }, [tags]);

  const remaining = tags.length - visibleCount;

  return (
    <div className="flex flex-row items-center flex-nowrap gap-1 max-w-[150px] overflow-hidden">
      {tags.slice(0, visibleCount).map((tag) => (
        <Chip
          key={tag.name}
          size="sm"
          color="success"
          variant="flat"
          className="!cursor-pointer"
        >
          {tag.name}
        </Chip>
      ))}
      {remaining > 0 && (
        <Tooltip
          content={
            <div className="flex flex-row flex-wrap gap-1 p-1 !cursor-pointer">
              {tags.map((tag) => (
                <Chip key={tag.name} size="sm" color="success" variant="flat">
                  {tag.name}
                </Chip>
              ))}
            </div>
          }
          placement="top"
        >
          <Chip
            size="sm"
            color="success"
            variant="flat"
            className="!cursor-pointer"
          >
            +{remaining}
          </Chip>
        </Tooltip>
      )}
    </div>
  );
};

const AnswerTable: React.FC<AnswerTableProps> = ({
  answers,
  page,
  totalPages,
  onPageChange,
  onDeleteAnswer,
  onUpdateStatus,
}) => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    {} as SortDescriptor
  );

  const sortedAnswers = useMemo(() => {
    if (!sortDescriptor.column) return answers;

    return [...answers].sort((a, b) => {
      let cmp = 0;

      switch (sortDescriptor.column) {
        case "content":
          cmp = truncateHTML(a.content).localeCompare(truncateHTML(b.content));
          break;
        case "author":
          cmp = a.author.fullName.localeCompare(b.author.fullName);
          break;
        case "question":
          cmp = a.question.title.localeCompare(b.question.title);
          break;
        case "status":
          const aStatus = a.isAccepted ? "accepted" : a.status;
          const bStatus = b.isAccepted ? "accepted" : b.status;
          cmp = aStatus.localeCompare(bStatus);
          break;
        case "tags":
          cmp = (a.tags?.length || 0) - (b.tags?.length || 0);
          break;
        case "stats":
          cmp = (a.comments?.length || 0) - (b.comments?.length || 0);
          break;
        case "created":
          cmp =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [answers, sortDescriptor]);

  return (
    <Table
      aria-label="Answers table"
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
        <TableColumn key="content" allowsSorting>
          NỘI DUNG
        </TableColumn>
        <TableColumn key="author" allowsSorting>
          TÁC GIẢ
        </TableColumn>
        <TableColumn key="question" allowsSorting>
          CÂU HỎI
        </TableColumn>
        <TableColumn key="status" allowsSorting>
          TRẠNG THÁI
        </TableColumn>
        <TableColumn key="tags" allowsSorting>
          NHÃN
        </TableColumn>
        <TableColumn key="stats" allowsSorting>
          TRẠNG THÁI
        </TableColumn>
        <TableColumn key="created" allowsSorting>
          NGÀY TẠO
        </TableColumn>
        <TableColumn key="actions">HÀNH ĐỘNG</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No answers found"}>
        {sortedAnswers.map((answer) => (
          <TableRow key={answer.id}>
            <TableCell className="!max-w-[200px] min-w-[200px]">
              <p className="truncate">{truncateHTML(answer.content)}</p>
              {answer.hasEditHistory && (
                <span className="text-xs text-default-500 mt-1 inline-block">
                  (edited)
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
                <StatusChip type="answer" status="accepted" />
              ) : (
                <StatusChip type="answer" status={answer.status} />
              )}
            </TableCell>
            <TableCell>
              <TagsCell tags={answer.tags} />
            </TableCell>
            <TableCell>
              <div className="flex flex-row gap-x-3 text-xs">
                {/* <div className="flex items-center gap-1">
                  <Icon
                    icon="lucide:thumbs-up"
                    fontSize={14}
                    className="text-default-400"
                  />
                  <span>{answer.reactionsCount || 0}</span>
                </div> */}
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
