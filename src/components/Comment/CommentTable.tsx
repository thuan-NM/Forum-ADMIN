import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Avatar,
  type SortDescriptor,
} from "@heroui/react";
import CommentActions from "./CommentActions";
import type { CommentResponse } from "../../store/interfaces/commentInterfaces";
import { ContentTypeChip, StatusChip } from "../Common";
import { stripHTML } from "../../utils/stripHTML";

interface CommentListProps {
  comments: CommentResponse[];
  page?: number;
  totalPages: number | 0;
  onPageChange: (page: number) => void;
  onUpdateAnswerStatus: (id: string, status: string) => void;
  onDeleteComment?: (comment: CommentResponse) => void;
  isSimpleView?: boolean;
}

const CommentTable: React.FC<CommentListProps> = ({
  comments,
  page = 1,
  totalPages,
  onPageChange = () => {},
  onUpdateAnswerStatus,
  onDeleteComment = () => {},
  isSimpleView = false,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    {} as SortDescriptor
  );

  const sortedComments = useMemo(() => {
    if (!sortDescriptor.column) return comments;

    return [...comments].sort((a, b) => {
      let cmp = 0;

      switch (sortDescriptor.column) {
        case "content":
          cmp = a.content.localeCompare(b.content);
          break;
        case "author":
          cmp = a.author.fullName.localeCompare(b.author.fullName);
          break;
        case "on":
          const aTitle = a.postTitle || a.answerTitle || a.parentTitle || "";
          const bTitle = b.postTitle || b.answerTitle || b.parentTitle || "";
          cmp = aTitle.localeCompare(bTitle);
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
        case "created":
          cmp =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [comments, sortDescriptor]);

  if (isSimpleView) {
    return (
      <div className="space-y-3 w-full">
        {sortedComments.map((comment) => (
          <div key={comment.id} className="bg-default-50 rounded-md p-3">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">
                    {comment.author.fullName}
                  </span>
                  <span className="text-xs text-default-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Table
      aria-label="Comments table"
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
          CONTENT
        </TableColumn>
        <TableColumn key="author" allowsSorting>
          AUTHOR
        </TableColumn>
        <TableColumn key="on" allowsSorting>
          ON
        </TableColumn>
        <TableColumn key="status" allowsSorting>
          STATUS
        </TableColumn>
        <TableColumn key="created" allowsSorting>
          CREATED
        </TableColumn>
        <TableColumn key="actions">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No comments found"}>
        {sortedComments.map((comment) => (
          <TableRow key={comment.id}>
            <TableCell className="max-w-[300px]">
              <p className="truncate">{stripHTML(comment.content)}</p>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar
                  src={comment.author.avatar}
                  name={comment.author.fullName}
                  size="sm"
                />
                <span>{comment.author.fullName}</span>
              </div>
            </TableCell>
            <TableCell>
              {comment.postId ? (
                <div className="flex items-start gap-1 flex-col">
                  <ContentTypeChip type="post" />
                  <span className="text-sm truncate max-w-[320px]">
                    {comment.postTitle}
                  </span>
                </div>
              ) : comment.answerId ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-start gap-1 flex-col">
                    <ContentTypeChip type="answer" />
                    <span className="text-sm truncate max-w-[320px]">
                      {comment.answerTitle}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <div className="flex items-start gap-1 flex-col">
                    <ContentTypeChip type="comment" />
                    <span className="text-sm truncate max-w-[320px]">
                      {comment.parentTitle}
                    </span>
                  </div>
                </div>
              )}
            </TableCell>
            <TableCell>
              <StatusChip type="comment" status={comment.status} />
            </TableCell>
            <TableCell>{formatDate(comment.createdAt)}</TableCell>
            <TableCell>
              <CommentActions
                comment={comment}
                onUpdateAnswerStatus={onUpdateAnswerStatus}
                onDelete={onDeleteComment}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CommentTable;
