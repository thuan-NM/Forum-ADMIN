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
  Tooltip,
  type SortDescriptor,
} from "@heroui/react";
import PostActions from "./PostActions";
import type { PostResponse } from "../../store/interfaces/postInterfaces";
import { StatusChip } from "../Common";

interface PostListProps {
  posts: PostResponse[];
  loading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const formatDate = (dateString: Date) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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

const PostList: React.FC<PostListProps> = ({
  posts,
  loading,
  page,
  totalPages,
  onPageChange,
}) => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    {} as SortDescriptor
  );

  const sortedPosts = useMemo(() => {
    if (!sortDescriptor.column) return posts;

    return [...posts].sort((a, b) => {
      let cmp = 0;

      switch (sortDescriptor.column) {
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "author":
          cmp = a.author.username.localeCompare(b.author.username);
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
        case "comments":
          cmp = (a.comments?.length || 0) - (b.comments?.length || 0);
          break;
        case "created":
          cmp =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [posts, sortDescriptor]);

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <Table
      aria-label="Posts table"
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
      className="p-4"
      removeWrapper
    >
      <TableHeader>
        <TableColumn key="title" allowsSorting>
          TIÊU ĐỀ
        </TableColumn>
        <TableColumn key="author" allowsSorting>
          TÁC GIẢ
        </TableColumn>
        <TableColumn key="tags">THẺ</TableColumn>
        <TableColumn key="status" allowsSorting>
          TRẠNG THÁI
        </TableColumn>
        <TableColumn key="comments" allowsSorting>
          BÌNH LUẬN
        </TableColumn>
        <TableColumn key="created" allowsSorting>
          NGÀY TẠO
        </TableColumn>
        <TableColumn key="actions">HÀNH ĐỘNG</TableColumn>
      </TableHeader>

      <TableBody emptyContent={"No posts found"}>
        {sortedPosts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="max-w-xs truncate">{post.title}</TableCell>
            <TableCell>{post.author.username}</TableCell>
            <TableCell>
              <TagsCell tags={post.tags} />
            </TableCell>
            <TableCell>
              <StatusChip status={post.status} type="post" />
            </TableCell>
            <TableCell>{post.comments?.length || 0}</TableCell>
            <TableCell>{formatDate(post.createdAt)}</TableCell>
            <TableCell>
              <PostActions post={post} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PostList;
