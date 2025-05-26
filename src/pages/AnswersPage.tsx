import React from "react";
import { Card } from "@heroui/react";
import type { AnswerResponse } from "../store/interfaces/answerInterfaces";
import AnswerFilters from "../components/Answer/AnswerFilters";
import AnswerTable from "../components/Answer/AnswerTable";
import { useQuery } from "@tanstack/react-query";
import { GetAllAnswers } from "../services/AnswerServices";
import { ErrorState, LoadingState } from "../components/Common";
import { useDeleteAnswer } from "../hooks/useDeleteAnswer";
import { useUpdateAnswerStatus } from "../hooks/useUpdateAnswerStatus"

const AnswersPage: React.FC = () => {
    const [page, setPage] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [statusFilter, setStatusFilter] = React.useState<string>("all");
    const [questionFilter, setQuestionFilter] = React.useState<string>("");

    const rowsPerPage = 10;

    const filters = {
        ...(searchQuery && { search: searchQuery }),
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(questionFilter && { questiontitle: questionFilter }),
        page,
        limit: rowsPerPage,
    };

    const { data, isLoading, isError, error } = useQuery<{
        answers: AnswerResponse[];
        total: number;
    }>({
        queryKey: ["answers", filters],
        queryFn: () => GetAllAnswers(filters),
    });

    const { deleteAnswer, isDeleting, deleteError } = useDeleteAnswer();
    const { updateAnswerStatus, isUpdating, updateError } = useUpdateAnswerStatus();

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1);
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        setPage(1);
    };

    const handleQuestionChange = (value: string) => {
        setQuestionFilter(value);
        setPage(1);
    };
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    if (isError) {
        return <ErrorState message={error instanceof Error ? error.message : "Failed to load answers"} />;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <AnswerFilters
                    searchQuery={searchQuery}
                    statusFilter={statusFilter}
                    questionFilter={questionFilter}
                    onSearchChange={handleSearch}
                    onStatusChange={handleStatusChange}
                    onQuestionChange={handleQuestionChange}
                />
                {isLoading || isDeleting || isUpdating ? (
                    <LoadingState
                        message={
                            isDeleting
                                ? "Deleting answer..."
                                : isUpdating
                                    ? "Updating answer status..."
                                    : "Loading answers..."
                        }
                    />
                ) : (
                    <Card className="w-full p-4" radius="sm">
                        <AnswerTable
                            answers={data?.answers || []}
                            loading={isLoading}
                            page={page}
                            totalPages={Math.ceil((data?.total || 0) / rowsPerPage)}
                            onPageChange={handlePageChange}
                            onDeleteAnswer={deleteAnswer}
                            onUpdateStatus={updateAnswerStatus}
                        />
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

export default AnswersPage;