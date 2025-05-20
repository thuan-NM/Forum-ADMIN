import React from 'react';
import { Card } from '@heroui/react';
import PostList from '../components/Post/PostList';
import PostFilters from '../components/Post/PostFilters';


interface Post {
    id: string;
    title: string;
    author: {
        id: string;
        username: string;
    };
    tags: {
        id: string;
        name: string;
    }[];
    status: 'published' | 'draft' | 'archived';
    commentsCount: number;
    createdAt: string;
}

const Posts: React.FC = () => {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [statusFilter, setStatusFilter] = React.useState<string>('all');
    const [tagFilter, setTagFilter] = React.useState<string>('');

    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch this data from your API
                // const response = await axios.get(`http://localhost:3000/api/posts?page=${page}&limit=${rowsPerPage}&search=${searchQuery}&status=${statusFilter}&tagId=${tagFilter}`);
                // setPosts(response.data.posts);
                // setTotalPages(Math.ceil(response.data.total / rowsPerPage));

                // Simulating API response with mock data
                setTimeout(() => {
                    const tags = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS', 'HTML'];
                    const statuses = ['published', 'draft', 'archived'];

                    const mockPosts: Post[] = Array.from({ length: 50 }, (_, i) => ({
                        id: `post-${i + 1}`,
                        title: `Post ${i + 1}: How to ${i % 2 === 0 ? 'master' : 'learn'} ${tags[i % tags.length]}`,
                        author: {
                            id: `user-${(i % 10) + 1}`,
                            username: `user${(i % 10) + 1}`,
                        },
                        tags: [
                            {
                                id: `tag-${(i % tags.length) + 1}`,
                                name: tags[i % tags.length],
                            },
                            {
                                id: `tag-${((i + 3) % tags.length) + 1}`,
                                name: tags[(i + 3) % tags.length],
                            }
                        ],
                        status: statuses[i % statuses.length] as 'published' | 'draft' | 'archived',
                        commentsCount: Math.floor(Math.random() * 50),
                        createdAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
                    }));

                    let filteredPosts = mockPosts;

                    // Apply search filter
                    if (searchQuery) {
                        filteredPosts = filteredPosts.filter(post =>
                            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.author.username.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                    }

                    // Apply status filter
                    if (statusFilter !== 'all') {
                        filteredPosts = filteredPosts.filter(post => post.status === statusFilter);
                    }

                    // Apply tag filter
                    if (tagFilter) {
                        filteredPosts = filteredPosts.filter(post =>
                            post.tags.some(tag => tag.name === tagFilter)
                        );
                    }

                    const paginatedPosts = filteredPosts.slice((page - 1) * rowsPerPage, page * rowsPerPage);
                    setPosts(paginatedPosts);
                    setTotalPages(Math.ceil(filteredPosts.length / rowsPerPage));
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to load posts');
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page, searchQuery, statusFilter, tagFilter]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1); // Reset to first page on new search
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        setPage(1); // Reset to first page on new filter
    };

    const handleTagChange = (value: string) => {
        setTagFilter(value);
        setPage(1); // Reset to first page on new filter
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
                <PostFilters
                    searchQuery={searchQuery}
                    statusFilter={statusFilter}
                    tagFilter={tagFilter}
                    onSearchChange={handleSearch}
                    onStatusChange={handleStatusChange}
                    onTagChange={handleTagChange}
                />

                <Card className="w-full" radius='sm'>
                    <PostList
                        posts={posts}
                        loading={loading}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </Card>
            </div>
        </div>
    );
};

export default Posts;