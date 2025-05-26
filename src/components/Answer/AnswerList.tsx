import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AnswerResponse } from "../../store/interfaces/answerInterfaces";
import { ListAnswers, DeleteAnswer } from "../../services/AnswerServices";
import { Skeleton } from "@heroui/react";
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence
import AnswerItem from "./AnswerDetail/AnswerItem";
import toast from "react-hot-toast";
interface AnswerListProp {
    questionId: string
}
const AnswerList: React.FC<AnswerListProp> = ({ questionId }) => {
    const { data = [], isLoading, isError, error } = useQuery<AnswerResponse[]>({
        queryKey: ["answers"],
        queryFn: () => ListAnswers(questionId),
    });
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: DeleteAnswer,
        onSuccess: (data) => {
            toast.success(data?.message);
            queryClient.invalidateQueries({ queryKey: ["answers"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message);
        },
    });

    const handleDelete = (answerId: string) => {
        deleteMutation.mutate(answerId);
    };

    if (isLoading) {
        return (
            <div className="my-3 text-center">
                <Skeleton className="w-full h-32 rounded-lg" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="my-3 text-center">
                <p className="text-red-500">{error?.message || "An error occurred"}</p>
            </div>
        );
    }

    return (
        <div className="mt-3">
            <AnimatePresence>
                {data.map((answer) => (
                    <AnswerItem
                        key={answer.id}
                        answer={answer}
                        onDelete={handleDelete}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default AnswerList;