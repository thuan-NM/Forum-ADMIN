import React from 'react';
import { Card, CardHeader, CardBody, Modal, ModalContent, useDisclosure } from '@heroui/react';
import RolesList from '../components/Permission/RolesList';
import PermissionsView from '../components/Permission/PermissionsView';
import RoleModalContent from '../components/Permission/RoleModalContent';
import type { Role, Permission } from '../store/interfaces/permissionInterfaces';

const PermissionsPage: React.FC = () => {
    const [roles, setRoles] = React.useState<Role[]>([]);
    const [permissions, setPermissions] = React.useState<Permission[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);

    // Modal states
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalMode, setModalMode] = React.useState<'create' | 'edit'>('create');
    const [roleName, setRoleName] = React.useState<string>('');
    const [roleDescription, setRoleDescription] = React.useState<string>('');
    const [rolePermissions, setRolePermissions] = React.useState<string[]>([]);

    React.useEffect(() => {
        const fetchRolesAndPermissions = async () => {
            try {
                setLoading(true);
                // Simulating API response with mock data
                setTimeout(() => {
                    const mockPermissions: Permission[] = [
                        { id: 'perm-1', name: 'posts.create', description: 'Create posts', module: 'Posts' },
                        { id: 'perm-2', name: 'posts.edit', description: 'Edit posts', module: 'Posts' },
                        { id: 'perm-3', name: 'posts.delete', description: 'Delete posts', module: 'Posts' },
                        { id: 'perm-4', name: 'posts.view', description: 'View posts', module: 'Posts' },
                        { id: 'perm-5', name: 'comments.create', description: 'Create comments', module: 'Comments' },
                        { id: 'perm-6', name: 'comments.edit', description: 'Edit comments', module: 'Comments' },
                        { id: 'perm-7', name: 'comments.delete', description: 'Delete comments', module: 'Comments' },
                        { id: 'perm-8', name: 'users.create', description: 'Create users', module: 'Users' },
                        { id: 'perm-9', name: 'users.edit', description: 'Edit users', module: 'Users' },
                        { id: 'perm-10', name: 'users.delete', description: 'Delete users', module: 'Users' },
                        { id: 'perm-11', name: 'settings.edit', description: 'Edit settings', module: 'Settings' },
                        { id: 'perm-12', name: 'categories.manage', description: 'Manage categories', module: 'Categories' },
                        { id: 'perm-13', name: 'tags.manage', description: 'Manage tags', module: 'Tags' },
                        { id: 'perm-14', name: 'files.upload', description: 'Upload files', module: 'Files' },
                        { id: 'perm-15', name: 'files.delete', description: 'Delete files', module: 'Files' },
                    ];

                    const mockRoles: Role[] = [
                        {
                            id: 'role-1',
                            name: 'Administrator',
                            description: 'Full access to all features',
                            usersCount: 3,
                            isSystem: true,
                            permissions: mockPermissions,
                            createdAt: new Date(Date.now() - 365 * 86400000).toISOString(),
                        },
                        {
                            id: 'role-2',
                            name: 'Moderator',
                            description: 'Can moderate content and users',
                            usersCount: 8,
                            isSystem: true,
                            permissions: mockPermissions.filter(p =>
                                p.name.includes('posts') ||
                                p.name.includes('comments') ||
                                p.name === 'users.edit'
                            ),
                            createdAt: new Date(Date.now() - 300 * 86400000).toISOString(),
                        },
                        {
                            id: 'role-3',
                            name: 'Editor',
                            description: 'Can create and edit content',
                            usersCount: 15,
                            isSystem: false,
                            permissions: mockPermissions.filter(p =>
                                p.name.includes('posts') ||
                                p.name.includes('comments.create') ||
                                p.name.includes('files.upload')
                            ),
                            createdAt: new Date(Date.now() - 200 * 86400000).toISOString(),
                        },
                        {
                            id: 'role-4',
                            name: 'Contributor',
                            description: 'Can create content but not edit others',
                            usersCount: 27,
                            isSystem: false,
                            permissions: mockPermissions.filter(p =>
                                p.name === 'posts.create' ||
                                p.name === 'comments.create' ||
                                p.name === 'files.upload'
                            ),
                            createdAt: new Date(Date.now() - 150 * 86400000).toISOString(),
                        },
                        {
                            id: 'role-5',
                            name: 'Subscriber',
                            description: 'Can view content and comment',
                            usersCount: 1201,
                            isSystem: true,
                            permissions: mockPermissions.filter(p =>
                                p.name === 'posts.view' ||
                                p.name === 'comments.create'
                            ),
                            createdAt: new Date(Date.now() - 100 * 86400000).toISOString(),
                        },
                    ];

                    const filteredRoles = searchQuery
                        ? mockRoles.filter(role =>
                            role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            role.description.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        : mockRoles;

                    setRoles(filteredRoles);
                    setPermissions(mockPermissions);
                    setLoading(false);

                    // Set the first role as selected by default
                    if (filteredRoles.length > 0 && !selectedRole) {
                        setSelectedRole(filteredRoles[0]);
                    }
                }, 1000);
            } catch (err) {
                console.error('Error fetching roles and permissions:', err);
                setError('Failed to load roles and permissions');
                setLoading(false);
            }
        };

        fetchRolesAndPermissions();
    }, [searchQuery, selectedRole]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    const handleAddRole = () => {
        setModalMode('create');
        setRoleName('');
        setRoleDescription('');
        setRolePermissions([]);
        onOpen();
    };

    const handleEditRole = (role: Role) => {
        setModalMode('edit');
        setRoleName(role.name);
        setRoleDescription(role.description);
        setRolePermissions(role.permissions.map(p => p.id));
        onOpen();
    };

    const handleSaveRole = () => {
        // In a real app, you would call your API to save the role
        console.log('Saving role:', {
            name: roleName,
            description: roleDescription,
            permissions: rolePermissions
        });

        // Close the modal
        onOpenChange();
    };

    const handlePermissionChange = (permissionId: string, isChecked: boolean) => {
        if (!selectedRole) return;

        // In a real app, you would call your API to update the permission
        console.log('Updating permission:', {
            roleId: selectedRole.id,
            permissionId,
            isChecked
        });
    };

    const handlePermissionToggle = (permissionId: string, isChecked: boolean) => {
        if (isChecked) {
            setRolePermissions([...rolePermissions, permissionId]);
        } else {
            setRolePermissions(rolePermissions.filter(id => id !== permissionId));
        }
    };

    const groupPermissionsByModule = (permissions: Permission[]) => {
        const grouped: Record<string, Permission[]> = {};

        permissions.forEach(permission => {
            if (!grouped[permission.module]) {
                grouped[permission.module] = [];
            }
            grouped[permission.module].push(permission);
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
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold mb-1">Roles & Permissions</h1>
                <p className="text-default-500">Manage user roles and their permissions</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Roles List */}
                <RolesList
                    roles={roles}
                    loading={loading}
                    selectedRole={selectedRole}
                    searchQuery={searchQuery}
                    onSearch={handleSearch}
                    onSelectRole={setSelectedRole}
                    onAddRole={handleAddRole}
                    onEditRole={handleEditRole}
                />

                {/* Permissions View */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <h3 className="text-lg font-semibold">
                            {selectedRole ? `Permissions for ${selectedRole.name}` : 'Select a role'}
                        </h3>
                    </CardHeader>
                    <CardBody>
                        <PermissionsView
                            loading={loading}
                            selectedRole={selectedRole}
                            permissions={permissions}
                            groupPermissionsByModule={groupPermissionsByModule}
                            onPermissionChange={handlePermissionChange}
                        />
                    </CardBody>
                </Card>
            </div>

            {/* Role Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <RoleModalContent
                            modalMode={modalMode}
                            roleName={roleName}
                            roleDescription={roleDescription}
                            rolePermissions={rolePermissions}
                            permissions={permissions}
                            groupPermissionsByModule={groupPermissionsByModule}
                            onRoleNameChange={setRoleName}
                            onRoleDescriptionChange={setRoleDescription}
                            onPermissionToggle={handlePermissionToggle}
                            onSave={handleSaveRole}
                            onClose={onClose}
                        />
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default PermissionsPage;