import React from "react";
import { Chip, Button } from "@heroui/react"; // Loại bỏ Popover import vì dùng ConfirmableAction
import { Icon } from "@iconify/react";
import { DateFormatter } from "../../Common";
import type { QuestionResponse } from "../../../store/interfaces/questionInterfaces";
import { useDeleteQuestion } from "../../../hooks/questions/useDeleteQuestion";
import { useNavigate } from "react-router-dom";
import ConfirmableAction from "../../Common/PopoverConfirm"; // Import ConfirmableAction

interface QuestionHeaderProps {
  question: QuestionResponse;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({ question }) => {
  const navigate = useNavigate();
  const { DeleteQuestion } = useDeleteQuestion();

  const handleDelete = () => {
    DeleteQuestion(question.id);
    navigate("/questions");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="bordered"
              size="sm"
              startContent={<Icon icon="weui:back-outlined" />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
          <h1 className="text-2xl font-bold">{question.title}</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-default-500">
            <span>Asked by {question.author.username}</span>
            <span>•</span>
            <DateFormatter date={question.createdAt} format="medium" />
          </div>
        </div>

        <ConfirmableAction
          trigger={
            <Button
              size="sm"
              variant="bordered"
              color="danger"
              startContent={<Icon icon="lucide:trash" />}
            >
              Delete
            </Button>
          }
          title="Are you sure you want to delete this question?"
          confirmText="Confirm"
          cancelText="Cancel"
          onConfirm={handleDelete}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip color="success" variant="flat">
          {question.topic.name}
        </Chip>
      </div>

      <div className="flex items-center gap-6 text-sm text-default-500">
        <div className="flex items-center gap-1">
          <Icon icon="lucide:thumbs-up" fontSize={16} />
          <span>{question.reactionsCount} reactions</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon icon="lucide:message-circle" fontSize={16} />
          <span>{question.answersCount} answers</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon icon="lucide:bookmark" fontSize={16} />
          <span>{question.followsCount} follows</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionHeader;
