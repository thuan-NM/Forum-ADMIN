import React from 'react';
import { Spinner } from '@heroui/react';
import TrafficSources from '../components/Dashboard/TrafficSources';
import RecentActivity from '../components/Dashboard/RecentActivity';
import StatsCard from '../components/Dashboard/StatCard';

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Users"
                    value={stats?.totalUsers.toLocaleString() || "0"}
                    change={stats?.newUsersToday || 0}
                    icon="lucide:users"
                    iconColor="text-primary-500"
                    iconBgColor="bg-primary-100"
                />

                <StatsCard
                    title="Total Posts"
                    value={stats?.totalPosts.toLocaleString() || "0"}
                    change={stats?.newPostsToday || 0}
                    icon="lucide:file-text"
                    iconColor="text-secondary-500"
                    iconBgColor="bg-secondary-100"
                />

                <StatsCard
                    title="Categories"
                    value={stats?.totalCategories.toString() || "0"}
                    icon="lucide:tag"
                    iconColor="text-warning-500"
                    iconBgColor="bg-warning-100"
                />
            </div>

            <RecentActivity
                activities={[
                    {
                        id: "activity-1",
                        type: "user",
                        title: "New user registered",
                        description: "John Doe created an account",
                        time: "10 minutes ago"
                    },
                    {
                        id: "activity-2",
                        type: "post",
                        title: "New post created",
                        description: "Jane Smith published \"Getting Started with React\"",
                        time: "25 minutes ago"
                    },
                    {
                        id: "activity-3",
                        type: "comment",
                        title: "New comment",
                        description: "Alex Johnson commented on \"TypeScript Tips\"",
                        time: "1 hour ago"
                    },
                    {
                        id: "activity-4",
                        type: "category",
                        title: "New category added",
                        description: "Admin created \"Mobile Development\" category",
                        time: "3 hours ago"
                    }
                ]}
            />

            <TrafficSources
                sources={[
                    { source: "Direct", percentage: 35, change: 2.5 },
                    { source: "Search", percentage: 28, change: 5.2 },
                    { source: "Social", percentage: 22, change: -1.8 },
                    { source: "Referral", percentage: 12, change: 3.4 },
                    { source: "Email", percentage: 3, change: 0.5 }
                ]}
            />
        </div>
    );
};

export default Dashboard;