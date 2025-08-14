import React from "react";

import { useParams } from "react-router-dom";
import type { AnswerResponse } from "../store/interfaces/answerInterfaces";
import { LoadingState, ErrorState } from "../components/Common";
import AnswerItem from "../components/Answer/AnswerDetail/AnswerItem";
import { useQuery } from "@tanstack/react-query";
import { GetAnswer } from "../services/AnswerServices";
import CommentList from "../components/Comment/CommentDetail/CommentList";

const AnswerDetailPage: React.FC = () => {
  const { id } = useParams<string>();

  const { data, isLoading, error } = useQuery<AnswerResponse>({
    queryKey: ["answers", id],
    queryFn: () => GetAnswer(id || ""),
    enabled: !!id,
  });

  if (isLoading) {
    return <LoadingState message="Loading answer data..." />;
  }
  if (error || !data) {
    return <ErrorState message={error?.message || "Failed to load answers"} />;
  }
  return (
    <div className="flex w-full justify-between">
      <div className="w-8/12 mr-6">
        {" "}
        <AnswerItem answer={data} />
      </div>
      <div className="w-4/12">
        {" "}
        <CommentList type="answer" />
      </div>
    </div>
  );
};

export default AnswerDetailPage;
