import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AnswerResponse } from "../../store/interfaces/answerInterfaces";
import { ListAnswers, DeleteAnswer } from "../../services/AnswerServices";
import { Button } from "@heroui/react";
import { AnimatePresence } from "framer-motion";
import AnswerItem from "./AnswerDetail/AnswerItem";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { ErrorState, LoadingState } from "../Common";

interface AnswerListProp {
  questionId: string;
}

const AnswerList: React.FC<AnswerListProp> = ({ questionId }) => {
  const [page, setPage] = useState(1);
  const [allAnswers, setAllAnswers] = useState<AnswerResponse[]>([]);
  const limit = 10;

  const { data, isLoading, isError, error } = useQuery<{
    answers: AnswerResponse[];
    total: number;
  }>({
    queryKey: ["answers", questionId, page],
    queryFn: () => ListAnswers(questionId, limit, page),
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: DeleteAnswer,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["answers", questionId] });
      // Reset answers and page on delete to refetch from start
      setAllAnswers([]);
      setPage(1);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Không thể xóa câu trả lời");
    },
  });

  // Accumulate answers when new data is fetched
  useEffect(() => {
    if (data?.answers) {
      setAllAnswers((prev) => {
        // Avoid duplicates by filtering out existing answer IDs
        const newAnswers = data.answers.filter(
          (newAnswer) => !prev.some((answer) => answer.id === newAnswer.id)
        );
        return [...prev, ...newAnswers];
      });
    }
  }, [data]);

  const handleDelete = (answerId: string) => {
    deleteMutation.mutate(answerId);
  };

  const handleLoadMore = () => {
    if (data && page * limit < data.total) {
      setPage(page + 1);
    }
  };

  if ((isLoading && page === 1) || data == null) {
    return <LoadingState message="Đang tải câu trả lời ..." />;
  }

  if (isError) {
    return <ErrorState message={error?.message || "Đã xảy ra lỗi"} />;
  }

  return (
    <div className="mt-3 w-full flex flex-col gap-y-5">
      <AnimatePresence>
        {allAnswers.map((answer) => (
          <AnswerItem key={answer.id} answer={answer} onDelete={handleDelete} />
        ))}
      </AnimatePresence>
      {data?.total > allAnswers.length && (
        <div className="mt-4 text-center">
          <Button
            variant="bordered"
            size="sm"
            onPress={handleLoadMore}
            isLoading={isLoading}
          >
            Tải thêm
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnswerList;
