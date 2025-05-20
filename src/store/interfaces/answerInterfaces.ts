import type { CommentResponse } from "./commentInterfaces";
import type { User } from "./userInterfaces";

export interface AnswerResponse {
    id: string;
    content: string;
    answerContent?: string;
    author: {
        id: string;
        username: string;
        avatar?: string;
    };
    questionId: string;
    questionTitle: string;
    status: 'approved' | 'pending' | 'rejected';
    isAccepted: boolean;
    upvotes: number;
    downvotes: number;
    userVote?: 'up' | 'down' | null;
    rootCommentId?: string;
    hasEditHistory: boolean;
    comments: CommentResponse[];
    createdAt: Date;
    updatedAt: Date;
}

export interface AnswerCreateDto {
    content: string;
    questionId: string;
}

export interface AnswerUpdateDto {
    content?: string;
    answerContent?: string;
    isAccepted?: boolean;
    status?: 'approved' | 'pending' | 'rejected';
}


export interface Answer {
    id: string;
    content: string;
    answerContent?: string;
    author: User | string;
    questionId: string;
    status: 'approved' | 'pending' | 'rejected';
    isAccepted: boolean;
    upvotes: number;
    downvotes: number;
    votedBy: { userId: string; voteType: 'up' | 'down' }[];
    rootCommentId?: string;
    hasEditHistory: boolean;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}