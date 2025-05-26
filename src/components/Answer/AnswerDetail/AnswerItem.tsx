import AnswerHeader from "./AnswerHeader";
import AnswerContent from "./AnswerContent";
import { motion } from 'framer-motion';
import type { AnswerResponse } from "../../../store/interfaces/answerInterfaces";
import { Card } from "@heroui/react";

interface AnswerItemProps {
  answer: AnswerResponse;
  onDelete?: (postId: string) => void;
}

const AnswerItem: React.FC<AnswerItemProps> = ({ answer, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 bg-content1 relative" radius="sm">
        <AnswerHeader answer={answer} onDelete={() => onDelete?.(answer.id)} />
        <AnswerContent answer={answer} />
      </Card>
    </motion.div>
  );
};

export default AnswerItem;