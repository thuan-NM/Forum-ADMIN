import React from 'react';
import { Input, Card, CardBody, Switch, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import type { Permission } from '../../store/interfaces/permissionInterfaces';

interface RoleModalContentProps {
    modalMode: 'create' | 'edit';
    roleName: string;
    roleDescription: string;
    rolePermissions: string[];
    permissions: Permission[];
    groupPermissionsByModule: (permissions: Permission[]) => Record<string, Permission[]>;
    onRoleNameChange: (value: string) => void;
    onRoleDescriptionChange: (value: string) => void;
    onPermissionToggle: (permissionId: string, isChecked: boolean) => void;
    onSave: () => void;
    onClose: () => void;
}

const RoleModalContent: React.FC<RoleModalContentProps> = ({
    modalMode,
    roleName,
    roleDescription,
    rolePermissions,
    permissions,
    groupPermissionsByModule,
    onRoleNameChange,
    onRoleDescriptionChange,
    onPermissionToggle,
    onSave,
    onClose
}) => {
    return (
        <>
            <ModalHeader>
                {modalMode === 'create' ? 'Create Role' : 'Edit Role'}
            </ModalHeader>
            <ModalBody>
                <div className="space-y-4">
                    <Input
                        label="Role Name"
                        placeholder="Enter role name"
                        value={roleName}
                        onValueChange={onRoleNameChange}
                    />

                    <Input
                        label="Description"
                        placeholder="Enter role description"
                        value={roleDescription}
                        onValueChange={onRoleDescriptionChange}
                    />

                    <div>
                        <p className="text-sm font-medium mb-2">Permissions</p>
                        <Card>
                            <CardBody className="max-h-[300px] overflow-y-auto">
                                {Object.entries(groupPermissionsByModule(permissions)).map(([module, modulePermissions]) => (
                                    <div key={module} className="mb-4">
                                        <p className="font-medium mb-2">{module}</p>
                                        <div className="space-y-2">
                                            {modulePermissions.map((permission) => (
                                                <div key={permission.id} className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm">{permission.name}</p>
                                                        <p className="text-xs text-default-500">{permission.description}</p>
                                                    </div>
                                                    <Switch
                                                        isSelected={rolePermissions.includes(permission.id)}
                                                        onValueChange={(isChecked) => onPermissionToggle(permission.id, isChecked)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                    Cancel
                </Button>
                <Button color="primary" onPress={onSave}>
                    {modalMode === 'create' ? 'Create' : 'Save'}
                </Button>
            </ModalFooter>
        </>
    );
};

export default RoleModalContent;