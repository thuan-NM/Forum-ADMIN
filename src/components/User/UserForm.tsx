import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from '@heroui/react';
import type { User, UserCreateDto, UserUpdateDto } from '../../store/interfaces/userInterfaces';

interface UserFormProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    mode: 'create' | 'edit';
    user?: User;
    onSubmit: (userData: UserCreateDto | UserUpdateDto) => void;
}

const UserForm: React.FC<UserFormProps> = ({ isOpen, onOpenChange, mode, user, onSubmit }) => {
    const [formData, setFormData] = React.useState<UserCreateDto | UserUpdateDto>({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: 'user'
    });

    React.useEffect(() => {
        if (mode === 'edit' && user) {
            setFormData({
                username: user.username,
                email: user.email,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                role: user.role
            });
        } else {
            setFormData({
                username: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                role: 'user'
            });
        }
    }, [mode, user, isOpen]);

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onOpenChange(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>{mode === 'create' ? 'Create User' : 'Edit User'}</ModalHeader>
                        <ModalBody>
                            <div className="space-y-4">
                                <Input
                                    label="Username"
                                    placeholder="Enter username"
                                    value={formData.username}
                                    onValueChange={(value) => handleChange('username', value)}
                                />

                                <Input
                                    label="Email"
                                    placeholder="Enter email"
                                    type="email"
                                    value={formData.email}
                                    onValueChange={(value) => handleChange('email', value)}
                                />

                                {mode === 'create' && (
                                    <Input
                                        label="Password"
                                        placeholder="Enter password"
                                        type="password"
                                        value={(formData as UserCreateDto).password}
                                        onValueChange={(value) => handleChange('password', value)}
                                    />
                                )}

                                <div className="flex gap-2">
                                    <Input
                                        label="First Name"
                                        placeholder="Enter first name"
                                        value={formData.firstName || ''}
                                        onValueChange={(value) => handleChange('firstName', value)}
                                        className="flex-1"
                                    />

                                    <Input
                                        label="Last Name"
                                        placeholder="Enter last name"
                                        value={formData.lastName || ''}
                                        onValueChange={(value) => handleChange('lastName', value)}
                                        className="flex-1"
                                    />
                                </div>

                                <Select
                                    label="Role"
                                    placeholder="Select role"
                                    selectedKeys={[formData.role || 'user']}
                                    onChange={(e) => handleChange('role', e.target.value)}
                                >
                                    <SelectItem key="user" textValue="user">User</SelectItem>
                                    <SelectItem key="moderator" textValue="moderator">Moderator</SelectItem>
                                    <SelectItem key="admin" textValue="admin">Admin</SelectItem>
                                </Select>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="flat" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={handleSubmit}>
                                {mode === 'create' ? 'Create' : 'Save'}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default UserForm;