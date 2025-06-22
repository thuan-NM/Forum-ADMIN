import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import type { TopicResponse } from "../../store/interfaces/topicInterfaces";
import { useCreateTopic } from "../../hooks/topics/useCreateTopic";
import { useUpdateTopic } from "../../hooks/topics/useEditTopic";

interface TopicFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  mode: "create" | "edit";
  topic?: TopicResponse;
}

const TopicForm: React.FC<TopicFormProps> = ({
  isOpen,
  onOpenChange,
  mode,
  topic,
}) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (mode === "edit" && topic) {
      setName(topic.name);
      setDescription(topic.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [mode, topic, isOpen]);

  const { UpdateTopic } = useUpdateTopic(() => {
    onOpenChange(false);
  });
  const { CreateTopic } = useCreateTopic(() => {
    onOpenChange(false);
  });

  const handleSubmit = async () => {
    if (mode === "create") {
      CreateTopic({ name, description });
    } else if (mode === "edit" && topic) {
      UpdateTopic(topic.id, { name, description });
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {mode === "create" ? "Create Topic" : "Edit Topic"}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Topic Name"
                  placeholder="Enter topic name"
                  value={name}
                  onValueChange={setName}
                />

                <Input
                  label="Description"
                  placeholder="Enter topic description"
                  value={description}
                  onValueChange={setDescription}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {mode === "create" ? "Create" : "Save"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TopicForm;
