import React from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import {
    LoadingState,
    ErrorState
} from '../components/Common';
import TimeRangeSelector from '../components/Analytics/TimeRangeSelector';
import StatsOverview from '../components/Analytics/StatsOverview';
import TrafficSourceChart from '../components/Analytics/TrafficSourceChart';
import PopularContentTable from '../components/Analytics/PopularContentTable';


interface AnalyticsData {
    userStats: {
        totalUsers: number;
        activeUsers: number;
        newUsersToday: number;
        newUsersThisWeek: number;
        newUsersThisMonth: number;
        userGrowthRate: number;
    };
    contentStats: {
        totalPosts: number;
        totalComments: number;
        totalQuestions: number; // Added for questions
        totalAnswers: number; // Added for answers
        postsThisWeek: number;
        questionsThisWeek: number; // Added for questions
        answersThisWeek: number; // Added for answers
        commentsThisWeek: number;
        avgCommentsPerPost: number;
        avgAnswersPerQuestion: number; // Added for questions
        mostActiveCategory: string;
        mostActiveTopic: string; // Added for topics
    };
    engagementStats: {
        dailyActiveUsers: number;
        weeklyActiveUsers: number;
        monthlyActiveUsers: number;
        avgSessionDuration: number;
        bounceRate: number;
        retentionRate: number;
    };
    trafficSources: {
        source: string;
        percentage: number;
        change: number;
    }[];
    popularContent: {
        id: string;
        title: string;
        type: 'post' | 'question'; // Added question type
        views: number;
        comments: number;
        answers?: number; // Added for questions
        author: string;
    }[];
}

const Analytics: React.FC = () => {
    const [analyticsData, setAnalyticsData] = React.useState<AnalyticsData | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [timeRange, setTimeRange] = React.useState<string>('7d');

    React.useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch this data from your API
                // const response = await axios.get(`http://localhost:3000/api/analytics?timeRange=${timeRange}`);
                // setAnalyticsData(response.data);

                // Simulating API response with mock data
                setTimeout(() => {
                    setAnalyticsData({
                        userStats: {
                            totalUsers: 1254,
                            activeUsers: 876,
                            newUsersToday: 24,
                            newUsersThisWeek: 145,
                            newUsersThisMonth: 320,
                            userGrowthRate: 5.8
                        },
                        contentStats: {
                            totalPosts: 3872,
                            totalComments: 15280,
                            totalQuestions: 1250, // Added for questions
                            totalAnswers: 4320, // Added for answers
                            postsThisWeek: 87,
                            questionsThisWeek: 45, // Added for questions
                            answersThisWeek: 156, // Added for answers
                            commentsThisWeek: 342,
                            avgCommentsPerPost: 3.9,
                            avgAnswersPerQuestion: 3.5, // Added for questions
                            mostActiveCategory: 'JavaScript',
                            mostActiveTopic: 'Web Development' // Added for topics
                        },
                        engagementStats: {
                            dailyActiveUsers: 320,
                            weeklyActiveUsers: 876,
                            monthlyActiveUsers: 1120,
                            avgSessionDuration: 8.5, // minutes
                            bounceRate: 32.4, // percentage
                            retentionRate: 68.7 // percentage
                        },
                        trafficSources: [
                            { source: 'Direct', percentage: 35, change: 2.5 },
                            { source: 'Search', percentage: 28, change: 5.2 },
                            { source: 'Social', percentage: 22, change: -1.8 },
                            { source: 'Referral', percentage: 12, change: 3.4 },
                            { source: 'Email', percentage: 3, change: 0.5 }
                        ],
                        popularContent: [
                            { id: 'post-1', title: 'Getting Started with React', type: 'post', views: 1245, comments: 48, author: 'user1' },
                            { id: 'question-1', title: 'How to fix React rendering issue?', type: 'question', views: 1120, comments: 32, answers: 8, author: 'user3' },
                            { id: 'post-2', title: 'JavaScript Best Practices', type: 'post', views: 982, comments: 36, author: 'user5' },
                            { id: 'question-2', title: 'TypeScript type inference not working', type: 'question', views: 945, comments: 28, answers: 6, author: 'user2' },
                            { id: 'post-3', title: 'CSS Grid Layout Tutorial', type: 'post', views: 687, comments: 19, author: 'user2' }
                        ]
                    });
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching analytics data:', err);
                setError('Failed to load analytics data');
                setLoading(false);
            }
        };

        fetchAnalyticsData();
    }, [timeRange]);

    const handleTimeRangeChange = (range: string) => {
        setTimeRange(range);
    };

    const handleViewContentItem = (item: any) => {
        console.log('Viewing content item:', item);
    };

    if (loading) {
        return <LoadingState message="Loading analytics data..." />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end items-center">
                <TimeRangeSelector
                    timeRange={timeRange}
                    onTimeRangeChange={handleTimeRangeChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsOverview
                    title="User Growth"
                    icon="lucide:users"
                    iconBgColor="bg-primary-100"
                    iconColor="text-primary-500"
                    stats={[
                        { label: "Total Users", value: analyticsData?.userStats.totalUsers.toLocaleString() || "0" },
                        { label: "Active Users", value: analyticsData?.userStats.activeUsers.toLocaleString() || "0" },
                        { label: "New This Week", value: analyticsData?.userStats.newUsersThisWeek.toLocaleString() || "0" }
                    ]}
                    change={analyticsData?.userStats.userGrowthRate}
                />

                <StatsOverview
                    title="Content Activity"
                    icon="lucide:file-text"
                    iconBgColor="bg-secondary-100"
                    iconColor="text-secondary-500"
                    stats={[
                        { label: "Total Posts", value: analyticsData?.contentStats.totalPosts.toLocaleString() || "0" },
                        { label: "Total Questions", value: analyticsData?.contentStats.totalQuestions.toLocaleString() || "0" },
                        { label: "Total Answers", value: analyticsData?.contentStats.totalAnswers.toLocaleString() || "0" }
                    ]}
                />

                <StatsOverview
                    title="Engagement"
                    icon="lucide:activity"
                    iconBgColor="bg-success-100"
                    iconColor="text-success-500"
                    stats={[
                        { label: "Daily Active Users", value: analyticsData?.engagementStats.dailyActiveUsers.toLocaleString() || "0" },
                        { label: "Avg. Session", value: `${analyticsData?.engagementStats.avgSessionDuration || "0"} min` },
                        { label: "Retention Rate", value: `${analyticsData?.engagementStats.retentionRate || "0"}%` }
                    ]}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <h3 className="text-lg font-semibold">User Activity Trends</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="h-64 flex items-center justify-center bg-default-50 rounded-md">
                            <div className="text-center">
                                <Icon icon="lucide:bar-chart-2" className="w-12 h-12 text-default-300 mx-auto mb-2" />
                                <p className="text-default-500">Chart visualization would appear here</p>
                                <p className="text-xs text-default-400">User registrations, logins, and engagement over time</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <TrafficSourceChart sources={analyticsData?.trafficSources || []} />
            </div>

            <Card>
                <CardHeader>
                    <h3 className="text-lg font-semibold">Popular Content</h3>
                </CardHeader>
                <CardBody>
                    <PopularContentTable
                        items={analyticsData?.popularContent || []}
                        onViewItem={handleViewContentItem}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default Analytics;