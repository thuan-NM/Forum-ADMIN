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
  Chip,
  type SortDescriptor,
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

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({} as SortDescriptor);

  const sortedTags = useMemo(() => {
    if (!sortDescriptor.column) return tags;

    return [...tags].sort((a, b) => {
      let cmp = 0;

      switch (sortDescriptor.column) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "description":
          cmp = a.description.localeCompare(b.description);
          break;
        case "posts":
          cmp = a.postsCount - b.postsCount;
          break;
        case "answers":
          cmp = a.answersCount - b.answersCount;
          break;
        case "created":
          cmp =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [tags, sortDescriptor]);

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
          NAME
        </TableColumn>
        <TableColumn key="description" allowsSorting>
          DESCRIPTION
        </TableColumn>
        <TableColumn key="posts" allowsSorting>
          POSTS
        </TableColumn>
        <TableColumn key="answers" allowsSorting>
          ANSWERS
        </TableColumn>
        <TableColumn key="created" allowsSorting>
          CREATED
        </TableColumn>
        <TableColumn key="actions">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No tags found"}>
        {sortedTags.map((tag) => (
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
