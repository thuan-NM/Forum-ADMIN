import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  type SortDescriptor,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom"; // thêm import này
import type { PopularContent } from "../../services/AnalysticServices";

interface PopularContentTableProps {
  items: PopularContent[];
}

const PopularContentTable: React.FC<PopularContentTableProps> = ({ items }) => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    {} as SortDescriptor
  );
  const navigate = useNavigate();

  const sortedItems = useMemo(() => {
    if (!sortDescriptor.column) return items;

    return [...items].sort((a, b) => {
      let cmp = 0;

      switch (sortDescriptor.column) {
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "type":
          cmp = a.type.localeCompare(b.type);
          break;
        case "author":
          cmp = a.author.localeCompare(b.author);
          break;
        case "popularPoint":
          cmp = a.engagement - b.engagement;
          break;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [items, sortDescriptor]);

  const handleView = (item: PopularContent) => {
    const typeLower = item.type.toLowerCase();
    if (typeLower === "question") {
      navigate(`/questions/${item.id}`);
    } else if (typeLower === "post") {
      navigate(`/posts/${item.id}`);
    } else if (typeLower === "answer") {
      navigate(`/answers/${item.id}`);
    }
  };

  return (
    <Table
      aria-label="Popular content table"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      removeWrapper
    >
      <TableHeader>
        <TableColumn key="title" allowsSorting>
          TIÊU ĐỀ
        </TableColumn>
        <TableColumn key="type" allowsSorting>
          LOẠI
        </TableColumn>
        <TableColumn key="author" allowsSorting>
          TÁC GIẢ
        </TableColumn>
        <TableColumn key="popularPoint" allowsSorting>
          ĐỘ PHỔ BIẾN
        </TableColumn>
        <TableColumn key="actions">HÀNH ĐỘNG</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"Không tìm thấy nội dung phổ biến"}>
        {sortedItems.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>
              <Chip
                color={item.type === "post" ? "primary" : "secondary"}
                variant="flat"
                size="sm"
              >
                {item.type}
              </Chip>
            </TableCell>
            <TableCell>{item.author}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <Icon
                    icon="memory:coin-copper"
                    fontSize={14}
                    className="text-default-400"
                  />
                  <span>{item.engagement}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Button
                size="sm"
                variant="flat"
                startContent={<Icon icon="lucide:eye" />}
                onPress={() => handleView(item)}
              >
                Xem
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PopularContentTable;
