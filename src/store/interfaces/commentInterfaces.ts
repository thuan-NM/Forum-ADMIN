import type { User } from './userInterfaces';


export interface Comment {
    id: string;
    content: string;
    author: User | string; 
    postId?: string; 
    answerId?: string; 
    parentId?: string; 
    status: 'approved' | 'pending' | 'rejected';
    upvotes: number;
    downvotes: number;
    votedBy: {
        userId: string;
        voteType: 'up' | 'down';
    }[];
    hasEditHistory: boolean;
    metadata?: any; 
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date; 
}

export interface CommentCreateDto {
    content: string;
    postId?: string;
    answerId?: string; 
    parentId?: string;
}

export interface CommentUpdateDto {
    content?: string;
    status?: 'approved' | 'pending' | 'rejected';
}

export interface CommentResponse {
    id: string;
    content: string;
    author: {
        id: string;
        username: string;
        avatar?: string;
    };
    postId?: string;
    answerId?: string; 
    parentId?: string;
    status: 'approved' | 'pending' | 'rejected';
    upvotes: number;
    downvotes: number;
    userVote?: 'up' | 'down' | null;
    hasEditHistory: boolean;
    replies?: CommentResponse[]; 
    createdAt: Date;
    updatedAt: Date;
}

export interface CommentListResponse {
    comments: CommentResponse[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}