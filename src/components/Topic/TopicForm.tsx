import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@heroui/react';
import type { Topic } from '../../store/interfaces/topicInterfaces';


interface TopicFormProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    mode: 'create' | 'edit';
    topic?: Topic;
    onSubmit: (topicData: { name: string; description: string }) => void;
}

const TopicForm: React.FC<TopicFormProps> = ({ isOpen, onOpenChange, mode, topic, onSubmit }) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        if (mode === 'edit' && topic) {
            setName(topic.name);
            setDescription(topic.description);
        } else {
            setName('');
            setDescription('');
        }
    }, [mode, topic, isOpen]);

    const handleSubmit = () => {
        onSubmit({ name, description });
        onOpenChange(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            {mode === 'create' ? 'Create Topic' : 'Edit Topic'}
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
                                {mode === 'create' ? 'Create' : 'Save'}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default TopicForm;