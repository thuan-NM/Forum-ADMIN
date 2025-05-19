export interface Permission {
    id: string;
    name: string;
    description: string;
    module: string;
}

export interface Role {
    id: string;
    name: string;
    description: string;
    usersCount: number;
    isSystem: boolean;
    permissions: Permission[];
    createdAt: string;
}