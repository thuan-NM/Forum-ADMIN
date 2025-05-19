export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    status: 'active' | 'inactive' | 'banned';
    createdAt: string;
}

export interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}
