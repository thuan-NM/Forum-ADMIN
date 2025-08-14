import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { TagResponse } from "../../store/interfaces/tagInterfaces";
import { GetAllTags } from "../../services";
import { useQuery } from "@tanstack/react-query";

interface PostFiltersProps {
  searchQuery: string;
  statusFilter: string;
  tagFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTagChange: (value: string) => void;
}

const PostFilters: React.FC<PostFiltersProps> = ({
  searchQuery,
  statusFilter,
  tagFilter,
  onSearchChange,
  onStatusChange,
  onTagChange,
}) => {
  const { data } = useQuery<{
    tags: TagResponse[];
    total: number;
  }>({
    queryKey: ["tags"],
    queryFn: () => GetAllTags({}),
  });

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 flex-wrap">
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Input
          placeholder="Tìm kiếm bài đăng..."
          value={searchQuery}
          onValueChange={onSearchChange}
          startContent={
            <Icon icon="lucide:search" className="text-default-400" />
          }
          isClearable
          className="w-full sm:w-64 bg-content1 rounded-lg"
          variant="bordered"
          radius="sm"
        />

        <Select
          placeholder="Lọc theo trạng thái"
          selectedKeys={[statusFilter]}
          className="w-full sm:w-40 bg-content1 rounded-lg"
          radius="sm"
          variant="bordered"
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <SelectItem key="all" textValue="Tất cả">
            Tất cả
          </SelectItem>
          <SelectItem key="approved" textValue="Đã duyệt">
            Đã duyệt
          </SelectItem>
          <SelectItem key="pending" textValue="Chờ duyệt">
            Chờ duyệt
          </SelectItem>
          <SelectItem key="rejected" textValue="Từ chối">
            Từ chối
          </SelectItem>
        </Select>

        <Select
          placeholder="Lọc theo nhãn"
          selectedKeys={tagFilter ? [tagFilter] : []}
          className="w-full sm:w-40 bg-content1 rounded-lg"
          radius="sm"
          variant="bordered"
          onChange={(e) => onTagChange(e.target.value)}
        >
          <SelectItem key="" textValue="">
            Tất cả nhãn
          </SelectItem>
          <>
            {data?.tags.map((tag: TagResponse) => (
              <SelectItem key={tag.id} textValue={tag.name}>
                {tag.name}
              </SelectItem>
            ))}
          </>
        </Select>
      </div>
    </div>
  );
};

export default PostFilters;
