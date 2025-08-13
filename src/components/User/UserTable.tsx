import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  type SortDescriptor,
} from "@heroui/react";
import UserActions from "./UserActions";
import type { UserResponse } from "../../store/interfaces/userInterfaces";
import { RoleChip, StatusChip } from "../Common";

interface UserTableProps {
  users: UserResponse[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEditUser?: (user: UserResponse) => void;
  onBanUnbanUser?: (user: UserResponse) => void;
  onDeleteUser?: (user: UserResponse) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  page,
  totalPages,
  onPageChange,
  onEditUser = () => {},
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    {} as SortDescriptor
  );

  const sortedUsers = useMemo(() => {
    if (!sortDescriptor.column) return users;

    return [...users].sort((a, b) => {
      let cmp = 0;

      switch (sortDescriptor.column) {
        case "username":
          cmp = a.username.localeCompare(b.username);
          break;
        case "email":
          cmp = a.email.localeCompare(b.email);
          break;
        case "fullname":
          cmp = a.fullName.localeCompare(b.fullName);
          break;
        case "role":
          cmp = a.role.localeCompare(b.role);
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
        case "joined":
          cmp =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [users, sortDescriptor]);

  return (
    <Table
      aria-label="Users table"
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
        <TableColumn key="username" allowsSorting>
          TÊN ĐĂNG NHẬP
        </TableColumn>
        <TableColumn key="email" allowsSorting>
          EMAIL
        </TableColumn>
        <TableColumn key="fullname" allowsSorting>
          HỌ VÀ TÊN
        </TableColumn>
        <TableColumn key="role" allowsSorting>
          VAI TRÒ
        </TableColumn>
        <TableColumn key="status" allowsSorting>
          TRẠNG THÁI
        </TableColumn>
        <TableColumn key="joined" allowsSorting>
          NGÀY THAM GIA
        </TableColumn>
        <TableColumn key="actions">HÀNH ĐỘNG</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No users found"}>
        {sortedUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.fullName}</TableCell>
            <TableCell>
              <RoleChip role={user.role} />
            </TableCell>
            <TableCell>
              <StatusChip type="user" status={user.status} />
            </TableCell>
            <TableCell>{formatDate(user.createdAt.toString())}</TableCell>
            <TableCell>
              <UserActions user={user} onEdit={onEditUser} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
