import React from 'react';
import { Chip } from '@heroui/react';
import type { Role } from '../../store/interfaces/permissionInterfaces';

interface RoleItemProps {
    role: Role;
    isSelected: boolean;
    onSelect: (role: Role) => void;
    onEdit: (role: Role) => void;
}

const RoleItem: React.FC<RoleItemProps> = ({ role, isSelected, onSelect }) => {
    return (
        <div
            className={`p-3 rounded-md cursor-pointer transition-colors ${isSelected ? 'bg-primary-50 border border-primary-200' : 'hover:bg-default-50'}`}
            onClick={() => onSelect(role)}
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-medium">{role.name}</p>
                    <p className="text-xs text-default-500">{role.description}</p>
                </div>
                {role.isSystem && (
                    <Chip size="sm" variant="flat" color="secondary">System</Chip>
                )}
            </div>
        </div>
    );
};

export default RoleItem;