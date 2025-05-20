import React from 'react';
import { Card } from '@heroui/react';
import { useDisclosure } from '@heroui/react';
import type { Tag } from '../store/interfaces/tagInterfaces';
import TagSearch from '../components/Tag/TagSearch';
import TagList from '../components/Tag/TagList';
import TagForm from '../components/Tag/TagForm';


const Tags: React.FC = () => {
    const [tags, setTags] = React.useState<Tag[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');

    // Tag form modal state
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formMode, setFormMode] = React.useState<'create' | 'edit'>('create');
    const [selectedTag, setSelectedTag] = React.useState<Tag | undefined>(undefined);

    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchTags = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch this data from your API
                // const response = await axios.get(`http://localhost:3000/api/tags?page=${page}&limit=${rowsPerPage}&search=${searchQuery}`);
                // setTags(response.data.tags);
                // setTotalPages(Math.ceil(response.data.total / rowsPerPage));

                // Simulating API response with mock data
                setTimeout(() => {
                    const tagNames = [
                        'javascript', 'react', 'node.js', 'typescript', 'css', 'html',
                        'mongodb', 'express', 'vue', 'angular', 'python', 'java',
                        'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin'
                    ];

                    const mockTags: Tag[] = tagNames.map((name, i) => ({
                        id: `tag-${i + 1}`,
                        name,
                        slug: name.replace(/\./g, '-'),
                        postsCount: Math.floor(Math.random() * 200),
                        createdAt: new Date(Date.now() - i * 86400000 * 3),
                        updatedAt: new Date()
                    }));

                    const filteredTags = searchQuery
                        ? mockTags.filter(tag =>
                            tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tag.slug.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        : mockTags;

                    const paginatedTags = filteredTags.slice((page - 1) * rowsPerPage, page * rowsPerPage);
                    setTags(paginatedTags);
                    setTotalPages(Math.ceil(filteredTags.length / rowsPerPage));
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching tags:', err);
                setError('Failed to load tags');
                setLoading(false);
            }
        };

        fetchTags();
    }, [page, searchQuery]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1); // Reset to first page on new search
    };

    const handleAddTag = () => {
        setFormMode('create');
        setSelectedTag(undefined);
        onOpen();
    };

    const handleEditTag = (tag: Tag) => {
        setFormMode('edit');
        setSelectedTag(tag);
        onOpen();
    };

    const handleDeleteTag = (tag: Tag) => {
        // In a real app, you would call your API to delete the tag
        console.log('Deleting tag:', tag);
    };

    const handleSubmitTagForm = (tagData: { name: string; slug?: string }) => {
        // In a real app, you would call your API to create/update the tag
        console.log(`${formMode === 'create' ? 'Creating' : 'Updating'} tag:`, tagData);
    };

    if (error) {
        return (
            <div className="p-4 bg-danger-50 text-danger-500 rounded-md">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <TagSearch
                    searchQuery={searchQuery}
                    onSearchChange={handleSearch}
                    onAddTag={handleAddTag}
                />

                <Card className="w-full p-4" radius='sm'>
                    <TagList
                        tags={tags}
                        loading={loading}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        onEditTag={handleEditTag}
                        onDeleteTag={handleDeleteTag}
                    />
                </Card>
            </div>

            <TagForm
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                mode={formMode}
                tag={selectedTag}
                onSubmit={handleSubmitTagForm}
            />
        </div>
    );
};

export default Tags;