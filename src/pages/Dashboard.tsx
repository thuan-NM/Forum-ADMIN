import React from 'react';
import { Card, CardBody, CardHeader, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';

interface DashboardStats {
    totalUsers: number;
    totalPosts: number;
    totalCategories: number;
    newUsersToday: number;
    newPostsToday: number;
}

const Dashboard: React.FC = () => {
    const [stats, setStats] = React.useState<DashboardStats | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch this data from your API
                // const response = await axios.get('http://localhost:3000/api/admin/dashboard');
                // setStats(response.data);

                // Simulating API response with mock data
                setTimeout(() => {
                    setStats({
                        totalUsers: 1254,
                        totalPosts: 3872,
                        totalCategories: 16,
                        newUsersToday: 24,
                        newPostsToday: 87
                    });
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data');
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="h-[400px] flex items-center justify-center">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-danger-50 text-danger-500 rounded-md">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardBody className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm">Total Users</p>
                                <h3 className="text-3xl font-semibold mt-1">{stats?.totalUsers.toLocaleString()}</h3>
                                <p className="text-success-500 text-xs mt-2 flex items-center">
                                    <Icon icon="lucide:trending-up" className="mr-1" />
                                    <span>+{stats?.newUsersToday} today</span>
                                </p>
                            </div>
                            <div className="bg-primary-100 p-4 rounded-full">
                                <Icon icon="lucide:users" className="text-primary-500 w-6 h-6" />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm">Total Posts</p>
                                <h3 className="text-3xl font-semibold mt-1">{stats?.totalPosts.toLocaleString()}</h3>
                                <p className="text-success-500 text-xs mt-2 flex items-center">
                                    <Icon icon="lucide:trending-up" className="mr-1" />
                                    <span>+{stats?.newPostsToday} today</span>
                                </p>
                            </div>
                            <div className="bg-secondary-100 p-4 rounded-full">
                                <Icon icon="lucide:file-text" className="text-secondary-500 w-6 h-6" />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm">Categories</p>
                                <h3 className="text-3xl font-semibold mt-1">{stats?.totalCategories}</h3>
                                <p className="text-default-400 text-xs mt-2">
                                    Active forum categories
                                </p>
                            </div>
                            <div className="bg-warning-100 p-4 rounded-full">
                                <Icon icon="lucide:tag" className="text-warning-500 w-6 h-6" />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-0">
                    <h3 className="text-lg font-semibold">Recent Activity</h3>
                </CardHeader>
                <CardBody>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 hover:bg-content2 rounded-md transition-colors">
                            <div className="bg-primary-100 p-2 rounded-full">
                                <Icon icon="lucide:user-plus" className="text-primary-500 w-4 h-4" />
                            </div>
                            <div>
                                <p className="font-medium">New user registered</p>
                                <p className="text-content5 opacity-80 text-sm">John Doe created an account</p>
                                <p className="text-content5 opacity-50 text-xs mt-1">10 minutes ago</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 hover:bg-content2 rounded-md transition-colors">
                            <div className="bg-secondary-100 p-2 rounded-full">
                                <Icon icon="lucide:file-plus" className="text-secondary-500 w-4 h-4" />
                            </div>
                            <div>
                                <p className="font-medium">New post created</p>
                                <p className="text-content5 opacity-80 text-sm">Jane Smith published "Getting Started with React"</p>
                                <p className="text-content5 opacity-50 text-xs mt-1">25 minutes ago</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 hover:bg-content2 rounded-md transition-colors">
                            <div className="bg-success-100 p-2 rounded-full">
                                <Icon icon="lucide:message-square" className="text-success-500 w-4 h-4" />
                            </div>
                            <div>
                                <p className="font-medium">New comment</p>
                                <p className="text-content5 opacity-80 text-sm">Alex Johnson commented on "TypeScript Tips"</p>
                                <p className="text-content5 opacity-50 text-xs mt-1">1 hour ago</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 hover:bg-content2 rounded-md transition-colors">
                            <div className="bg-warning-100 p-2 rounded-full">
                                <Icon icon="lucide:tag" className="text-warning-500 w-4 h-4" />
                            </div>
                            <div>
                                <p className="font-medium">New category added</p>
                                <p className="text-content5 opacity-80 text-sm">Admin created "Mobile Development" category</p>
                                <p className="text-content5 opacity-50 text-xs mt-1">3 hours ago</p>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default Dashboard;