import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Card, Switch } from '@heroui/react';
import type { Permission, Role } from '../../store/interfaces/permissionInterfaces';

interface PermissionModuleCardProps {
    module: string;
    permissions: Permission[];
    selectedRole: Role;
    onPermissionChange: (permissionId: string, isChecked: boolean) => void;
}

const PermissionModuleCard: React.FC<PermissionModuleCardProps> = ({
    permissions,
    selectedRole,
    onPermissionChange,
}) => {
    return (
        <Card className="shadow-none border border-default-200 p-4">
            <Table removeWrapper className="w-full">
                <TableHeader>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                    {permissions.map((permission) => (
                        <TableRow key={permission.id}>
                            <TableCell>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{permission.action}</p>
                                        <p className="text-xs opacity-60">{`${permission.resource}.${permission.action}`}</p>
                                    </div>
                                    <Switch
                                        isSelected={permission.allowed}
                                        onValueChange={(isChecked) => onPermissionChange(permission.id, isChecked)}
                                        isDisabled={selectedRole.isSystem}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default PermissionModuleCard;