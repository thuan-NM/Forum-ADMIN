import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@heroui/react';
import type { Tag } from '../../store/interfaces/tagInterfaces';

interface TagFormProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    mode: 'create' | 'edit';
    tag?: Tag;
    onSubmit: (tagData: { name: string; slug?: string }) => void;
}

const TagForm: React.FC<TagFormProps> = ({ isOpen, onOpenChange, mode, tag, onSubmit }) => {
    const [name, setName] = React.useState('');
    const [slug, setSlug] = React.useState('');
    const [autoGenerateSlug, setAutoGenerateSlug] = React.useState(true);

    React.useEffect(() => {
        if (mode === 'edit' && tag) {
            setName(tag.name);
            setSlug(tag.slug);
            setAutoGenerateSlug(false);
        } else {
            setName('');
            setSlug('');
            setAutoGenerateSlug(true);
        }
    }, [mode, tag, isOpen]);

    React.useEffect(() => {
        if (autoGenerateSlug) {
            setSlug(name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
        }
    }, [name, autoGenerateSlug]);

    const handleSubmit = () => {
        onSubmit({ name, slug });
        onOpenChange(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            {mode === 'create' ? 'Create Tag' : 'Edit Tag'}
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
                                    label="Slug"
                                    placeholder="Enter tag slug"
                                    value={slug}
                                    onValueChange={(value) => {
                                        setSlug(value);
                                        setAutoGenerateSlug(false);
                                    }}
                                    description="URL-friendly version of the name"
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

export default TagForm;