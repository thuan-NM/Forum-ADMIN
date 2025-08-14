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
              {mode === "create" ? "Thêm nhãn mới" : "Chỉnh sửa nhãn"}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Tên nhãn"
                  placeholder="Nhập tên nhãn"
                  value={name}
                  onValueChange={setName}
                />

                <Input
                  label="Mô tả"
                  placeholder="Nhập mô tả"
                  value={description}
                  onValueChange={(value) => {
                    setDescription(value);
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Huỷ bỏ
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {mode === "create" ? "Thêm" : "Lưu"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TagForm;
