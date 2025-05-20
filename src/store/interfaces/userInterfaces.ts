export interface User {
    id: string;
    username: string;
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    avatar?: string;
    role: 'admin' | 'moderator' | 'user';
    status: 'active' | 'inactive' | 'banned';
    emailVerified: boolean;
    lastLogin?: Date;
    postsCount: number;
    commentsCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreateDto {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: 'admin' | 'moderator' | 'user';
}

export interface UserUpdateDto {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    avatar?: string;
    role?: 'admin' | 'moderator' | 'user';
    status?: 'active' | 'inactive' | 'banned';
    emailVerified?: boolean;
}

export interface UserLoginDto {
    email: string;
    password: string;
}

export interface UserResponse {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    avatar?: string;
    role: 'admin' | 'moderator' | 'user';
    status: 'active' | 'inactive' | 'banned';
    emailVerified: boolean;
    lastLogin?: Date;
    postsCount: number;
    commentsCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserAuthResponse {
    user: UserResponse;
    token: string;
}
