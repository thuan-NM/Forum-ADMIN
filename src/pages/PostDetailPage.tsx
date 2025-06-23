import React from 'react';

import { useParams } from 'react-router-dom';
import type { PostResponse } from '../store/interfaces/postInterfaces'
import { LoadingState, ErrorState } from '../components/Common';
import PostItem from '../components/Post/PostDetail/PostItem';
import { useQuery } from '@tanstack/react-query';
import { GetPost } from '../services/PostServices';
import CommentList from '../components/Comment/CommentDetail/CommentList';

const PostDetailPage: React.FC = () => {
    const { id } = useParams<string>();

    const { data, isLoading, error } = useQuery<PostResponse>({
        queryKey: ["posts", id],
        queryFn: () => GetPost(id || ""),
        enabled: !!id,
    });


    if (isLoading) {
        return <LoadingState message="Loading post data..." />;
    }
    if (error || !data) {
        return <ErrorState message={error?.message || 'Failed to load posts'} />
    }
    return (
        <div className="flex w-full justify-between">
            <div className='w-8/12 mr-6'> <PostItem post={data} /></div>
            <div className='w-4/12'> <CommentList type='post'/></div>
        </div>
    );
};

export default PostDetailPage;