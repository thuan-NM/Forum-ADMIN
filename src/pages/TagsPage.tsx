import React from "react";
import { Card } from "@heroui/react";
import { useDisclosure } from "@heroui/react";
import type { TagResponse } from "../store/interfaces/tagInterfaces";
import TagSearch from "../components/Tag/TagSearch";
import TagList from "../components/Tag/TagList";
import TagForm from "../components/Tag/TagForm";
import { useQuery } from "@tanstack/react-query";
import { GetAllTags } from "../services";
import { ErrorState } from "../components/Common";

const Tags: React.FC = () => {
  const [page, setPage] = React.useState<number>(1);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [selectedTag, setSelectedTag] = React.useState<TagResponse>(
    {} as TagResponse
  );

  const rowsPerPage = 10;
  const filters = {
    ...(searchQuery && { search: searchQuery }),
    page,
    limit: rowsPerPage,
  };
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["tags", filters],
    queryFn: () => GetAllTags(filters),
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleAddTag = () => {
    setFormMode("create");
    onOpen();
  };

  const handleEditTag = (tag: TagResponse) => {
    setFormMode("edit");
    setSelectedTag(tag);
    onOpen();
  };

  if (isError) {
    return <ErrorState message={error?.message || "Failed to load tags"} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <TagSearch
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onAddTag={handleAddTag}
        />

        <Card className="w-full p-4" radius="sm">
          <TagList
            tags={data?.tags || []}
            loading={isLoading}
            page={page}
            totalPages={Math.ceil((data?.total || 0) / rowsPerPage)}
            onPageChange={setPage}
            onEditTag={handleEditTag}
          />
        </Card>
      </div>

      <TagForm
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        mode={formMode}
        tag={selectedTag}
      />
    </div>
  );
};

export default Tags;
