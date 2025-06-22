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
import type { TagResponse } from "../../store/interfaces/tagInterfaces";
import { useUpdateTag } from "../../hooks/tags/useEditTag";
import { useCreateTag } from "../../hooks/tags/useCreateTag";

interface TagFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  mode: "create" | "edit";
  tag?: TagResponse;
}

const TagForm: React.FC<TagFormProps> = ({
  isOpen,
  onOpenChange,
  mode,
  tag,
}) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  React.useEffect(() => {
    if (mode === "edit" && tag) {
      setName(tag.name);
      setDescription(tag.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [mode, tag, isOpen]);

  const { UpdateTag } = useUpdateTag(() => {
    onOpenChange(false);
  });
  const { CreateTag } = useCreateTag(() => {
    onOpenChange(false);
  });

  const handleSubmit = async () => {
    if (mode === "create") {
      CreateTag({ name, description });
    } else if (mode === "edit" && tag) {
      UpdateTag(tag.id, { name, description });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {mode === "create" ? "Create Tag" : "Edit Tag"}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Tag Name"
                  placeholder="Enter tag name"
                  value={name}
                  onValueChange={setName}
                />

                <Input
                  label="Description"
                  placeholder="Enter tag description"
                  value={description}
                  onValueChange={(value) => {
                    setDescription(value);
                  }}
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

export default TagForm;
