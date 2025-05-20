import React from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import RolesList from '../components/Permission/RolesList';
import PermissionsView from '../components/Permission/PermissionsView';
import type { Role, Permission } from '../store/interfaces/permissionInterfaces';
import { GetAllPermissions, UpdatePermission } from '../services/PermissionServices';

const PermissionsPage: React.FC = () => {
    const [roles, setRoles] = React.useState<Role[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);

    React.useEffect(() => {
        const fetchPermissions = async () => {
            try {
                setLoading(true);
                const rolesData = await GetAllPermissions(searchQuery);
                setRoles(rolesData);
                if (rolesData.length > 0 && !selectedRole) {
                    setSelectedRole(rolesData[0]);
                }
            } catch (err) {
                console.error('Error fetching permissions:', err);
                setError('Failed to load roles and permissions');
            } finally {
                setLoading(false);
            }
        };

        fetchPermissions();
    }, [searchQuery]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    const handlePermissionChange = async (permissionId: string, isChecked: boolean) => {
        if (!selectedRole) return;
        const permission = selectedRole.permissions.find(p => p.id === permissionId);
        if (!permission) return;

        try {
            const updatedPermission = await UpdatePermission(
                permission.role,
                permission.resource,
                permission.action,
                isChecked
            );
            setRoles(roles.map(r => {
                if (r.id === selectedRole.id) {
                    return {
                        ...r,
                        permissions: r.permissions.map(p =>
                            p.id === permissionId ? updatedPermission : p
                        ),
                    };
                }
                return r;
            }));
            setSelectedRole({
                ...selectedRole,
                permissions: selectedRole.permissions.map(p =>
                    p.id === permissionId ? updatedPermission : p
                ),
            });
        } catch (err) {
            console.error('Error updating permission:', err);
            setError('Failed to update permission');
        }
    };

    const groupPermissionsByModule = (permissions: Permission[]) => {
        const grouped: Record<string, Permission[]> = {};
        permissions.forEach(permission => {
            const module = permission.resource;
            if (!grouped[module]) {
                grouped[module] = [];
            }
            grouped[module].push(permission);
        });
        return grouped;
    };

    if (error) {
        return (
            <div className="p-4 bg-danger-50 text-danger-500 rounded-md">
                {error}
            </div>
        );
    }

    return (
        <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RolesList
                    roles={roles}
                    loading={loading}
                    selectedRole={selectedRole}
                    searchQuery={searchQuery}
                    onSearch={handleSearch}
                    onSelectRole={setSelectedRole}
                    onAddRole={() => alert('Role creation not supported by backend')}
                    onEditRole={() => alert('Role editing not supported by backend')}
                />

                <Card className="lg:col-span-2 p-4" radius='sm'>
                    <CardHeader className='pb-0'>
                        <h3 className="text-lg font-semibold">
                            {selectedRole ? `Permissions for ${selectedRole.name}` : 'Select a role'}
                        </h3>
                    </CardHeader>
                    <CardBody className="min-h-[400px]">
                        <PermissionsView
                            loading={loading}
                            selectedRole={selectedRole}
                            permissions={selectedRole?.permissions || []}
                            groupPermissionsByModule={groupPermissionsByModule}
                            onPermissionChange={handlePermissionChange}
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default PermissionsPage;