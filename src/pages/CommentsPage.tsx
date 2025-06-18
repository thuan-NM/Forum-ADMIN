import React from 'react';
import { Card } from '@heroui/react';
import CommentFilters from '../components/Comment/CommentFilters';
import CommentTable from '../components/Comment/CommentTable';
import type { CommentResponse } from '../store/interfaces/commentInterfaces';
import { useQuery } from '@tanstack/react-query';
import { EmptyState, ErrorState, LoadingState } from '../components/Common';
import { getAllComments } from '../services/CommentServices';
import { useUpdateCommentStatus } from '../hooks/useUpdateCommentStatus';
import { useDeleteComment } from '../hooks/useDeleteComment';



const Comments: React.FC = () => {
    const [page, setPage] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [statusFilter, setStatusFilter] = React.useState<string>('all');
    const [typeFilter, setTypeFilter] = React.useState<string>('');

    const rowsPerPage = 10;

    const filters = {
        ...(searchQuery && { search: searchQuery }),
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(typeFilter && { typefilter: typeFilter }),
        page,
        limit: rowsPerPage,
    };
    const { data, isLoading, isError, error } = useQuery<{
        comments: CommentResponse[];
        total: number;
    }>({
        queryKey: ["comments", filters],
        queryFn: () => getAllComments(filters),
    });
    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1);
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        setPage(1);
    };

    const handleTypeChange = (value: string) => {
        setTypeFilter(value);
        setPage(1);
    };
    const { UpdateCommentStatus, isUpdating, updateError } = useUpdateCommentStatus()

    const { deleteComment, isDeleting, deleteError } = useDeleteComment()

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    if (isError) {
        return <ErrorState message={error instanceof Error ? error.message : "Failed to load comments"} />;
    }
    console.log(data?.comments)
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <CommentFilters
                    searchQuery={searchQuery}
                    statusFilter={statusFilter}
                    typeFilter={typeFilter}
                    onSearchChange={handleSearch}
                    onStatusChange={handleStatusChange}
                    onTypeChange={handleTypeChange}
                />

                {(isLoading || isDeleting || isUpdating) ? (
                    <LoadingState
                        message={
                            isDeleting
                                ? "Deleting answer..."
                                : isUpdating
                                    ? "Updating answer status..."
                                    : "Loading answers..."
                        }
                    />
                ) :
                    ((data?.comments != null) ?
                        (<Card className="w-full p-4" radius="sm">
                            <CommentTable
                                comments={data.comments}
                                page={page}
                                totalPages={Math.ceil((data?.total || 0) / rowsPerPage)}
                                onPageChange={handlePageChange}
                                onUpdateAnswerStatus={UpdateCommentStatus}
                                onDeleteComment={deleteComment}
                            />
                        </Card>)
                        :
                        <Card className='w-full p-4' radius='sm'>
                            <EmptyState title='No comment found' />
                        </Card>
                    )}
                {(deleteError || updateError) && (
                    <ErrorState
                        message={
                            deleteError
                                ? deleteError instanceof Error
                                    ? deleteError.message
                                    : "Failed to delete answer"
                                : updateError instanceof Error
                                    ? updateError.message
                                    : "Failed to update answer status"
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default Comments;