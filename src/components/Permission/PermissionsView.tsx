import React from 'react';
import { Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';
import PermissionModuleCard from './PermissionModuleCard';
import type { Permission, Role } from '../../store/interfaces/permissionInterfaces';

interface PermissionsViewProps {
    loading: boolean;
    selectedRole: Role | null;
    permissions: Permission[];
    groupPermissionsByModule: (permissions: Permission[]) => Record<string, Permission[]>;
    onPermissionChange: (permissionId: string, isChecked: boolean) => void;
}

const PermissionsView: React.FC<PermissionsViewProps> = ({
    loading,
    selectedRole,
    permissions,
    groupPermissionsByModule,
    onPermissionChange
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
            <div className="h-[400px] flex items-center justify-center text-default-500">
                Select a role to view and manage permissions
            </div>
        );
    }

    const groupedPermissions = groupPermissionsByModule(permissions);

    return (
        <div className="space-y-6">
            <p className="text-default-500">{selectedRole.description}</p>

            {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
                <PermissionModuleCard
                    key={module}
                    module={module}
                    permissions={modulePermissions}
                    selectedRole={selectedRole}
                    onPermissionChange={onPermissionChange}
                />
            ))}

            {selectedRole.isSystem && (
                <div className="p-3 bg-warning-50 text-warning-700 rounded-md flex items-center gap-2">
                    <Icon icon="lucide:alert-triangle" />
                    <p className="text-sm">System roles cannot be modified</p>
                </div>
            )}
        </div>
    );
};

export default PermissionsView;