import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fileName?: string;
  loading?: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  fileName,
  loading = false,
}) => {
  return (
    <Modal onOpenChange={onClose} isOpen={open}>
      <ModalContent>
        <ModalHeader>Xác nhận xoá</ModalHeader>
        <ModalBody>
          <div className="text-sm ">
            Bạn có chắc chắn muốn xoá{" "}
            <span className="font-medium text-red-500">"{fileName}"</span>{" "}
            không? Thao tác này không thể hoàn tác.
          </div>
        </ModalBody>
        <ModalFooter className="mt-4">
          <Button variant="ghost" onPress={onClose} disabled={loading}>
            Huỷ
          </Button>
          <Button variant="ghost" color="danger" onPress={onConfirm} disabled={loading}>
            {loading ? "Đang xoá..." : "Xoá"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;
