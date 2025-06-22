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
import TagActions from "./TagActions";
import type { TagResponse } from "../../store/interfaces/tagInterfaces";

interface TagListProps {
  tags: TagResponse[];
  loading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEditTag: (tag: TagResponse) => void;
}

const TagList: React.FC<TagListProps> = ({
  tags,
  loading,
  page,
  totalPages,
  onPageChange,
  onEditTag,
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
      aria-label="Tags table"
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
        <TableColumn>POSTS</TableColumn>
        <TableColumn>ANSWERS</TableColumn>
        <TableColumn>CREATED</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No tags found"}>
        {tags.map((tag) => (
          <TableRow key={tag.id}>
            <TableCell>
              <Chip color="primary" variant="flat" size="sm">
                {tag.name}
              </Chip>
            </TableCell>
            <TableCell>{tag.description}</TableCell>
            <TableCell>{tag.postsCount}</TableCell>
            <TableCell>{tag.answersCount}</TableCell>
            <TableCell>{formatDate(tag.createdAt)}</TableCell>
            <TableCell>
              <TagActions tag={tag} onEdit={onEditTag} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TagList;
