import React from "react";
import { Button, Card, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import AnswerList from "../components/Answer/AnswerList";
import type { QuestionResponse } from "../store/interfaces/questionInterfaces";
import type { AnswerResponse } from "../store/interfaces/answerInterfaces";
import {
  QuestionHeader,
  QuestionContent,
} from "../components/Question/QuestionDetail";
import { LoadingState, ErrorState, StatusChip } from "../components/Common";
import type { Comment } from "../store/interfaces/commentInterfaces";
import { GetQuestionById } from "../services";
import { useQuery } from "@tanstack/react-query";

const QuestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: question,
    isLoading,
    error,
    isError,
  } = useQuery<QuestionResponse>({
    queryKey: ["questions", id],
    queryFn: () => GetQuestionById(id || ""),
    enabled: !!id,
  });
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading || question === undefined) {
    return <LoadingState message="Đang tải câu hỏi..." />;
  }

  if (isError) {
    return <ErrorState message={error.message || "Lỗi khi tải câu hỏi"} />;
  }

  return (
    <Card className="space-y-6 p-8">
      <QuestionHeader question={question} />

      <div className="flex items-center gap-2">
        <StatusChip status={question.status} type="question" />
        <span className="text-sm text-default-500">
          Đăng vào lúc {formatDate(question.createdAt)}
        </span>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {question.answersCount || 0}
            {" câu trả lời"}
          </h2>
        </div>

        <AnswerList questionId={question.id} />
      </div>
    </Card>
  );
};

export default QuestionDetail;
