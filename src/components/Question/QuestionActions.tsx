import React from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import type { QuestionResponse } from "../../store/interfaces/questionInterfaces";
import { useDeleteQuestion } from "../../hooks/questions/useDeleteQuestion";
import { useUpdateQuestionStatus } from "../../hooks/questions/useUpdateQuestionStatus";
import { useCloseQuestion } from "../../hooks/questions/useCloseQuestion";

interface QuestionActionsProps {
  question: QuestionResponse;
}

const QuestionActions: React.FC<QuestionActionsProps> = ({ question }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/questions/${question.id}`);
  };

  const { DeleteQuestion } = useDeleteQuestion();
  const { UpdateQuestionStatus } = useUpdateQuestionStatus();
  const {CloseQuestion} = useCloseQuestion();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <Icon icon="lucide:more-vertical" className="text-default-500" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Question actions">
        <DropdownItem
          key="view"
          startContent={<Icon icon="lucide:eye" />}
          onPress={handleView}
        >
          View
        </DropdownItem>
        {question.interactionStatus === "solved" ? (
          <DropdownItem
            key="close"
            startContent={<Icon icon="lucide:check-circle" />}
            color="warning"
            onPress={() => CloseQuestion(question.id)}
          >
            Close Question
          </DropdownItem>
        ) : null}
        {question.status === "pending" ? (
          <>
            <DropdownItem
              key="approve"
              startContent={<Icon icon="mdi:tag-approve-outline" />}
              color="success"
              onPress={() => UpdateQuestionStatus(question.id, "approved")}
            >
              Approve
            </DropdownItem>
            <DropdownItem
              key="reject"
              startContent={<Icon icon="lucide:rotate-ccw" />}
              color="warning"
              onPress={() => UpdateQuestionStatus(question.id, "rejected")}
            >
              Reject
            </DropdownItem>
          </>
        ) : null}
        <DropdownItem
          key="delete"
          startContent={<Icon icon="lucide:trash" />}
          color="danger"
          onPress={() => DeleteQuestion(question.id)}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default QuestionActions;
