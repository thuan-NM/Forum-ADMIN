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
  module,
  permissions,
  selectedRole,
  onPermissionChange
}) => {
  return (
    <div className="space-y-2">
      <h4 className="text-md font-semibold">{module}</h4>
      <Card>
        <Table removeWrapper>
          <TableHeader>
            <TableColumn>Permission</TableColumn>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => {
              const hasPermission = selectedRole.permissions.some(p => p.id === permission.id);
              return (
                <TableRow key={permission.id}>
                  <TableCell>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{permission.name}</p>
                        <p className="text-xs text-default-500">{permission.description}</p>
                      </div>
                      <Switch
                        isSelected={hasPermission}
                        onValueChange={(isChecked) => onPermissionChange(permission.id, isChecked)}
                        isDisabled={selectedRole.isSystem}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default PermissionModuleCard;