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

const PostList: React.FC<PostListProps> = ({
  posts,
  loading,
  page,
  totalPages,
  onPageChange,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "warning";
      case "archived":
        return "default";
      default:
        return "default";
    }
  };

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
      aria-label="Posts table"
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
        <TableColumn>TITLE</TableColumn>
        <TableColumn>AUTHOR</TableColumn>
        <TableColumn>TAGS</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>COMMENTS</TableColumn>
        <TableColumn>CREATED</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No posts found"}>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="max-w-xs truncate">{post.content}</TableCell>
            <TableCell>{post.author.username}</TableCell>
            <TableCell>
              {post.tags ? (
                <div className="flex flex-row flex-wrap gap-1 max-w-[150px]">
                  {post?.tags.map((tag) => (
                    <Chip size="sm" color="success" variant="flat">
                      {tag.name}
                    </Chip>
                  ))}
                </div>
              ) : (
                <Chip size="sm" color="danger" variant="flat">
                  No tags attached
                </Chip>
              )}
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
