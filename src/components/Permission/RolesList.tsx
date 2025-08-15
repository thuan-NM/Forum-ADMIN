import React from "react";
import { Card, CardHeader, CardBody, Spinner, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import RoleItem from "./RoleItem";
import type { Role } from "../../store/interfaces/permissionInterfaces";

interface RolesListProps {
  roles: Role[];
  loading: boolean;
  selectedRole: Role | null;
  searchQuery: string;
  onSearch: (value: string) => void;
  onSelectRole: (role: Role) => void;
  onAddRole: () => void;
  onEditRole: (role: Role) => void;
}

const RolesList: React.FC<RolesListProps> = ({
  roles,
  loading,
  selectedRole,
  searchQuery,
  onSearch,
  onSelectRole,
}) => {
  return (
    <Card className="lg:col-span-1 p-2 h-fit" radius="sm">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Vai trò</h3>
      </CardHeader>
      <CardBody className="min-h-[400px]">
        {loading ? (
          <div className="h-[200px] flex items-center justify-center">
            <Spinner size="lg" color="primary" />
          </div>
        ) : (
          <div className="space-y-2">
            <Input
              placeholder="Tìm vai trò..."
              value={searchQuery}
              onValueChange={onSearch}
              startContent={
                <Icon icon="lucide:search" className="opacity-50" />
              }
              size="sm"
              className="mb-4"
            />
            {roles.map((role) => (
              <RoleItem
                key={role.id}
                role={role}
                isSelected={selectedRole?.id === role.id}
                onSelect={onSelectRole}
                onEdit={() => alert("Role editing not supported by backend")}
              />
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default RolesList;
