import React from "react";
import { Card } from "@heroui/react";
import PostList from "../components/Post/PostList";
import PostFilters from "../components/Post/PostFilters";
import { useQuery } from "@tanstack/react-query";
import type { PostResponse } from "../store/interfaces/postInterfaces";
import { GetAllPosts } from "../services";
import { EmptyState, ErrorState, LoadingState } from "../components/Common";

const Posts: React.FC = () => {
  const [page, setPage] = React.useState<number>(1);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [tagFilter, setTagFilter] = React.useState<string>("");

  const rowsPerPage = 10;

  const filters = {
    ...(searchQuery && { search: searchQuery }),
    ...(statusFilter !== "all" && { status: statusFilter }),
    ...(tagFilter && { tagfilter: tagFilter }),
    page,
    limit: rowsPerPage,
  };

  const { data, isLoading, isError, error } = useQuery<{
    posts: PostResponse[];
    total: number;
  }>({
    queryKey: ["posts", filters],
    queryFn: () => GetAllPosts(filters),
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page on new search
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1); // Reset to first page on new filter
  };

  const handleTagChange = (value: string) => {
    setTagFilter(value);
    setPage(1); // Reset to first page on new filter
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (isError) {
    return (
      <ErrorState
        message={
          error instanceof Error ? error.message : "Failed to load answers"
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <PostFilters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          tagFilter={tagFilter}
          onSearchChange={handleSearch}
          onStatusChange={handleStatusChange}
          onTagChange={handleTagChange}
        />
        {isLoading ? (
          <LoadingState message={"Đang tải các bài viết..."} />
        ) : data?.posts != null ? (
          <Card className="w-full" radius="sm">
            <PostList
              posts={data?.posts || []}
              loading={isLoading}
              page={page}
              totalPages={Math.ceil((data?.total || 0) / rowsPerPage)}
              onPageChange={handlePageChange}
            />
          </Card>
        ) : (
          <Card className="w-full p-4" radius="sm">
            <EmptyState title="Không có bài viết nào" />
          </Card>
        )}
      </div>
    </div>
  );
};

export default Posts;
