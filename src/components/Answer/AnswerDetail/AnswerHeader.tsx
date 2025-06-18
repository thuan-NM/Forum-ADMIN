import { Avatar, CardHeader } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../../../store/interfaces/userInterfaces";
import { GetUserById } from "../../../services/UserServices";
import { GoDotFill } from "react-icons/go";
import { format } from "timeago.js";
import { ErrorState, LoadingState, StatusChip } from "../../Common";
import type { AnswerResponse } from "../../../store/interfaces/answerInterfaces";
import AnswerActions from "../AnswerActions";
import { useDeleteAnswer } from "../../../hooks/useDeleteAnswer";
import { useUpdateAnswerStatus } from "../../../hooks/useUpdateAnswerStatus";

interface AnswerHeaderProps {
    answer: AnswerResponse;
    onDelete?: () => void;
}

const AnswerHeader: React.FC<AnswerHeaderProps> = ({ answer }) => {
    const { data: user, isLoading, isError, error } = useQuery<User>({
        queryKey: ["users", answer.author.id],
        queryFn: () => GetUserById(answer.author.id),
    });
    const date = new Date(answer?.createdAt).getTime();
    const { deleteAnswer, deleteError } = useDeleteAnswer();

    const { updateAnswerStatus, updateError } = useUpdateAnswerStatus();
    if (isLoading) {
        return <LoadingState />;
    }

    if (isError) {
        return (
            <ErrorState
                message={error.message}
            />
        );
    }

    if (deleteError || updateError) {
        return (
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
        )
    }

    return (
        <CardHeader className="flex w-full justify-between">
            <div className="flex items-center gap-x-2">
                <Avatar
                    size="sm"
                    radius="full"
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                <div className="flex flex-col !text-xs md:text-sm gap-y-1">
                    <div className="font-bold flex flex-wrap items-center gap-x-1">
                        <div>{user?.fullName}</div>
                        < StatusChip type="answer" status={answer.status} />
                    </div>
                    <div className="opacity-90 text-xs flex flex-wrap !items-center gap-x-1">
                        <div className="hidden sm:block">{user?.email}</div>
                        <GoDotFill className="w-2 h-2" />
                        <div>{format(date)}</div>
                    </div>
                </div>
            </div>
            <AnswerActions answer={answer} onDelete={deleteAnswer} onUpdateStatus={updateAnswerStatus} />
        </CardHeader>
    );
};

export default AnswerHeader;