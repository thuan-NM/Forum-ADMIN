// components/Permission/PermissionsView.tsx
import React from "react";
import { Spinner, Accordion, AccordionItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import PermissionModuleCard from "./PermissionModuleCard";
import type {
  Permission,
  Role,
} from "../../store/interfaces/permissionInterfaces";

interface PermissionsViewProps {
  loading: boolean;
  selectedRole: Role | null;
  permissions: Permission[];
  groupPermissionsByModule: (
    permissions: Permission[]
  ) => Record<string, Permission[]>;
  onPermissionChange: (permissionId: string, isChecked: boolean) => void;
}

const PermissionsView: React.FC<PermissionsViewProps> = ({
  loading,
  selectedRole,
  permissions,
  groupPermissionsByModule,
  onPermissionChange,
}) => {
  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!selectedRole) {
    return (
      <div className="h-[400px] flex items-center justify-center opacity-60">
        Select a role to view and manage permissions
      </div>
    );
  }

  const groupedPermissions = groupPermissionsByModule(permissions);

  const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="space-y-6">
      <p className="opacity-60">{selectedRole.description}</p>
      <Accordion variant="shadow" className="w-full">
        {Object.entries(groupedPermissions).map(
          ([module, modulePermissions]) => (
            <AccordionItem
              key={module}
              aria-label={module}
              title={capitalizeFirstLetter(module)} // Capitalize the module name
              startContent={
                <Icon
                  icon="lucide:chevron-down"
                  className="transition-transform"
                />
              }
              className="overflow-hidden"
            >
              <div className="overflow-y-auto">
                <PermissionModuleCard
                  module={module}
                  permissions={modulePermissions}
                  selectedRole={selectedRole}
                  onPermissionChange={onPermissionChange}
                />
              </div>
            </AccordionItem>
          )
        )}
      </Accordion>
      {selectedRole.isSystem && (
        <div className="p-3 bg-warning-50 text-warning-700 rounded-md flex items-center gap-2">
          <Icon icon="lucide:alert-triangle" />
          <p className="text-sm">Không thể chỉnh sửa vai trò hệ thống</p>
        </div>
      )}
    </div>
  );
};

export default PermissionsView;
