import type { Topic } from './topicInterfaces';
import type { User } from './userInterfaces';

export interface Question {
    id: string;
    title: string;
    content: string;
    slug: string;
    author: User | string;
    topic: Topic | string;
    status: 'open' | 'closed' | 'solved' | 'duplicate';
    viewCount: number;
    votedBy: { userId: string; voteType: 'up' | 'down' }[];
    acceptedAnswerId?: string;
    duplicateOfId?: string;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
    ollowCount: number;

}


export interface QuestionCreateDto {
    title: string;
    content: string;
    topicId: string;
}

export interface QuestionUpdateDto {
    title?: string;
    content?: string;
    topicId?: string;
    status?: 'open' | 'closed' | 'solved' | 'duplicate';
    acceptedAnswerId?: string;
    duplicateOfId?: string;
    isFeatured?: boolean;
}



export interface QuestionResponse {
    id: string;
    title: string;
    content: string;
    slug: string;
    author: {
        id: string;
        username: string;
        avatar?: string;
    };
    topic: {
        id: string;
        name: string;
        slug: string;
    };
    status: 'open' | 'closed' | 'solved' | 'duplicate';
    viewCount: number;
    acceptedAnswer?: {
        id: string;
        content: string;
        answerContent?: string;
        author: {
            id: string;
            username: string;
            avatar?: string;
        };
    };
    answersCount: number;
    followCount: number;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}


export interface QuestionListResponse {
    questions: QuestionResponse[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}