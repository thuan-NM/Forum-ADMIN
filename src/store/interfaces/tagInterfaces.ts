export interface Tag {
    id: string;
    name: string;
    slug: string;
    postsCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface TagCreateDto {
    name: string;
}

export interface TagUpdateDto {
    name?: string;
}

export interface TagResponse {
    id: string;
    name: string;
    slug: string;
    postsCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface TagListResponse {
    tags: TagResponse[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
