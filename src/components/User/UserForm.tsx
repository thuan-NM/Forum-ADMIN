import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import type {
  UserCreateDto,
  UserResponse,
  UserUpdateDto,
} from "../../store/interfaces/userInterfaces";
import { useUpdateUser } from "../../hooks/users/useEditUser";
import { useCreateUser } from "../../hooks/users/useCreateUser";

interface UserFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  mode: "create" | "edit";
  user: UserResponse;
}

const UserForm: React.FC<UserFormProps> = ({
  isOpen,
  onOpenChange,
  mode,
  user,
}) => {
  const [formData, setFormData] = React.useState<UserCreateDto | UserUpdateDto>(
    {
      username: "",
      email: "",
      password: "",
      fullName: "",
      role: "user",
      emailVerified: true,
    }
  );

  React.useEffect(() => {
    if (mode === "edit" && user) {
      setFormData({
        username: user.username,
        email: user.email,
        fullName: user.fullName || "",
        role: user.role,
      });
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        fullName: "",
        role: "user",
        emailVerified: true,
      });
    }
  }, [mode, user, isOpen]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { UpdateUser } = useUpdateUser(() => {
    onOpenChange(false);
  });
  const { CreateUser, isCreating } = useCreateUser(() => {
    onOpenChange(false);
  });
  const handleSubmit = async () => {
    if (mode === "create") {
      CreateUser(formData);
    } else if (mode === "edit" && user) {
      UpdateUser(user.id, formData);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {mode === "create" ? "Thêm người dùng" : "Chỉnh sửa người dùng"}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Tên người dùng"
                  placeholder="Nhập tên người dùng"
                  value={formData.username}
                  onValueChange={(value) => handleChange("username", value)}
                />

                <Input
                  label="Email"
                  placeholder="Nhập email"
                  type="email"
                  isDisabled={mode === "edit"}
                  value={formData.email}
                  onValueChange={(value) => handleChange("email", value)}
                />

                {mode === "create" && (
                  <Input
                    label="Mật khẩu"
                    placeholder="Nhập password"
                    type="password"
                    value={(formData as UserCreateDto).password}
                    onValueChange={(value) => handleChange("password", value)}
                  />
                )}

                <div className="flex gap-2">
                  <Input
                    label="Họ và tên"
                    placeholder="Nhập tên đầy đủ"
                    value={formData.fullName || ""}
                    onValueChange={(value) => handleChange("fullName", value)}
                    className="flex-1"
                  />
                </div>

                <Select
                  label="Vai trò"
                  placeholder="Chọn vai trò"
                  selectedKeys={[formData.role || "user"]}
                  onChange={(e) => handleChange("role", e.target.value)}
                >
                  <SelectItem key="user" textValue="user">
                    Người dùng
                  </SelectItem>
                  <SelectItem key="employee" textValue="employee">
                    Nhân viên
                  </SelectItem>
                  <SelectItem key="admin" textValue="admin">
                    Admin
                  </SelectItem>
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Huỷ bỏ
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isCreating}
              >
                {mode === "create" ? "Thêm" : "Lưu"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UserForm;
