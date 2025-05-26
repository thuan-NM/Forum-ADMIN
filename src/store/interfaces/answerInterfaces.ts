import type { Comment } from "./commentInterfaces";

export interface AnswerResponse {
    id: string;
    content: string;
    questionId: string;
    status: 'approved' | 'pending' | 'rejected';
    isAccepted: boolean;
    rootCommentId?: string;
    hasEditHistory: boolean;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    username: string;
    questionTitle: string;
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
    userId: string;
    questionId: string;
    status: 'approved' | 'pending' | 'rejected';
    isAccepted: boolean;
    rootCommentId?: string;
    hasEditHistory: boolean;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
    username: string;
    questionTitle: string;
}