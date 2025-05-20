import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, Chip } from '@heroui/react';
import PostActions from './PostActions';

interface Post {
    id: string;
    title: string;
    author: {
        id: string;
        username: string;
    };
    tags: {
        id: string;
        name: string;
    }[];
    status: 'published' | 'draft' | 'archived';
    commentsCount: number;
    createdAt: string;
}

interface PostListProps {
    posts: Post[];
    loading: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, loading, page, totalPages, onPageChange }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'success';
            case 'draft':
                return 'warning';
            case 'archived':
                return 'default';
            default:
                return 'default';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="h-[400px] flex items-center justify-center">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    return (
        <Table
            aria-label="Posts table"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={totalPages}
                        onChange={onPageChange}
                    />
                </div>
            }
            classNames={{
                wrapper: "min-h-[400px]",
            }} 
            className='p-4'
            removeWrapper
        >
            <TableHeader>
                <TableColumn>TITLE</TableColumn>
                <TableColumn>AUTHOR</TableColumn>
                <TableColumn>TAGS</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>COMMENTS</TableColumn>
                <TableColumn>CREATED</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No posts found"}>
                {posts.map((post) => (
                    <TableRow key={post.id}>
                        <TableCell className="max-w-xs truncate">{post.title}</TableCell>
                        <TableCell>{post.author.username}</TableCell>
                        <TableCell>
                            <div className="flex flex-wrap gap-1">
                                {post.tags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        color="primary"
                                        variant="flat"
                                        size="sm"
                                    >
                                        {tag.name}
                                    </Chip>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Chip
                                color={getStatusColor(post.status)}
                                variant="dot"
                                size="sm"
                            >
                                {post.status}
                            </Chip>
                        </TableCell>
                        <TableCell>{post.commentsCount}</TableCell>
                        <TableCell>{formatDate(post.createdAt)}</TableCell>
                        <TableCell>
                            <PostActions post={post} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default PostList;