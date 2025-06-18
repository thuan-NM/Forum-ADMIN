import React from "react";
import { Card } from "@heroui/react";

import { useDisclosure } from "@heroui/react";
import type {
  User,
  UserCreateDto,
  UserResponse,
  UserUpdateDto,
} from "../store/interfaces/userInterfaces";
import UserSearch from "../components/User/UserSearch";
import UserForm from "../components/User/UserForm";
import { useQuery } from "@tanstack/react-query";
import { GetAllUsers } from "../services/UserServices";
import UserTable from "../components/User/UserTable";
import { EmptyState, ErrorState, LoadingState } from "../components/Common";

const Users: React.FC = () => {
  const [page, setPage] = React.useState<number>(1);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [selectedUser, setSelectedUser] = React.useState<User>({} as User);

  const rowsPerPage = 10;
  const filters = {
    ...(searchQuery && { search: searchQuery }),
    page,
    limit: rowsPerPage,
  };
  const { data, isLoading, isError, error } = useQuery<{
    users: UserResponse[];
    total: number;
  }>({
    queryKey: ["users", filters],
    queryFn: () => GetAllUsers(filters),
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleAddUser = () => {
    setFormMode("create");
    onOpen();
  };

  const handleEditUser = (user: User) => {
    setFormMode("edit");
    setSelectedUser(user);
    onOpen();
  };

  const handleBanUnbanUser = (user: User) => {
    console.log(
      `${user.status === "banned" ? "Unbanning" : "Banning"} user:`,
      user
    );
  };

  const handleDeleteUser = (user: User) => {
    console.log("Deleting user:", user);
  };

  const handleSubmitUserForm = (userData: UserCreateDto | UserUpdateDto) => {
    console.log(
      `${formMode === "create" ? "Creating" : "Updating"} user:`,
      userData
    );
  };
  if (isError) {
    return (
      <ErrorState
        message={
          error instanceof Error ? error.message : "Failed to load users"
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <UserSearch
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onAddUser={handleAddUser}
        />
        {isLoading ? (
          <LoadingState message="Loading answers..." />
        ) : data?.users != null ? (
          <Card className="w-full" radius="sm">
            <UserTable
              users={data.users}
              page={page}
              totalPages={Math.ceil((data?.total || 0) / rowsPerPage)}
              onPageChange={setPage}
              onEditUser={handleEditUser}
              onBanUnbanUser={handleBanUnbanUser}
              onDeleteUser={handleDeleteUser}
            />
          </Card>
        ) : (
          <Card className="w-full p-4" radius="sm">
            <EmptyState title="No answer found" />
          </Card>
        )}
      </div>
      <UserForm
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        mode={formMode}
        user={selectedUser}
        onSubmit={handleSubmitUserForm}
      />
    </div>
  );
};

export default Users;
