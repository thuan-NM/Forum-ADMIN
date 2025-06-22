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
              {mode === "create" ? "Create User" : "Edit User"}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Username"
                  placeholder="Enter username"
                  value={formData.username}
                  onValueChange={(value) => handleChange("username", value)}
                />

                <Input
                  label="Email"
                  placeholder="Enter email"
                  type="email"
                  isDisabled={mode === "edit"}
                  value={formData.email}
                  onValueChange={(value) => handleChange("email", value)}
                />

                {mode === "create" && (
                  <Input
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    value={(formData as UserCreateDto).password}
                    onValueChange={(value) => handleChange("password", value)}
                  />
                )}

                <div className="flex gap-2">
                  <Input
                    label="Full Name"
                    placeholder="Enter full name"
                    value={formData.fullName || ""}
                    onValueChange={(value) => handleChange("fullName", value)}
                    className="flex-1"
                  />
                </div>

                <Select
                  label="Role"
                  placeholder="Select role"
                  selectedKeys={[formData.role || "user"]}
                  onChange={(e) => handleChange("role", e.target.value)}
                >
                  <SelectItem key="user" textValue="user">
                    User
                  </SelectItem>
                  <SelectItem key="employee" textValue="employee">
                    Employee
                  </SelectItem>
                  <SelectItem key="admin" textValue="admin">
                    Admin
                  </SelectItem>
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isCreating}
              >
                {mode === "create" ? "Create" : "Save"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UserForm;
