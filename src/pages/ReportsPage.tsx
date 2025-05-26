import React from 'react';
import { ErrorState, LoadingState } from '../components/Common';
import { Card } from '@heroui/react';
import ReportList from '../components/Report/ReportList';
import type { ReportResponse } from '../store/interfaces/reportInterfaces';
import ReportFilters from '../components/Report/ReportFilters';

const Reports: React.FC = () => {
    const [reports, setReports] = React.useState<ReportResponse[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [statusFilter, setStatusFilter] = React.useState<string>('all');

    const rowsPerPage = 10;

    React.useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch this data from your API
                // const response = await axios.get(`http://localhost:3000/api/reports?page=${page}&limit=${rowsPerPage}&search=${searchQuery}&status=${statusFilter}`);
                // setReports(response.data.reports);
                // setTotalPages(Math.ceil(response.data.total / rowsPerPage));

                // Simulating API response with mock data
                setTimeout(() => {
                    const reasons = [
                        'Inappropriate content',
                        'Spam',
                        'Harassment',
                        'Misinformation',
                        'Offensive language',
                        'Hate speech',
                        'Violence'
                    ];

                    const contentPreviews = {
                        post: [
                            'How to hack into any website easily...',
                            'This product will make you rich overnight!',
                            'Why [political group] is ruining everything',
                            'Secret method to get free stuff online'
                        ],
                        comment: [
                            'You are completely wrong and stupid!',
                            'Go back to where you came from!',
                            'This is the dumbest thing I\'ve ever read',
                            'Everyone who disagrees with me is an idiot'
                        ],
                        user: [
                            'Username: toxic_troll',
                            'Username: spammer123',
                            'Username: offensive_name',
                            'Username: impersonator'
                        ],
                        question: [
                            'How to hack someone\'s account?',
                            'Why is [political figure] so terrible?',
                            'Can someone help me cheat on my exam?',
                            'Looking for illegal software downloads'
                        ],
                        answer: [
                            'This is completely wrong advice that could harm people',
                            'Just use this sketchy tool I\'m selling',
                            'The solution is to break the terms of service',
                            'Everyone else giving advice here is stupid'
                        ]
                    };

                    const mockReports: ReportResponse[] = Array.from({ length: 35 }, (_, i) => {
                        const contentType = i % 5 === 0 ? 'post' :
                            i % 5 === 1 ? 'comment' :
                                i % 5 === 2 ? 'user' :
                                    i % 5 === 3 ? 'question' : 'answer';

                        return {
                            id: `report-${i + 1}`,
                            reason: reasons[i % reasons.length],
                            reporter: {
                                id: `user-${(i % 10) + 1}`,
                                username: `user${(i % 10) + 1}`,
                            },
                            contentType,
                            contentId: `${contentType}-${(i % 20) + 1}`,
                            contentPreview: contentPreviews[contentType][i % contentPreviews[contentType].length],
                            status: i % 3 === 0 ? 'pending' : i % 3 === 1 ? 'resolved' : 'dismissed',
                            createdAt: new Date(Date.now() - i * 3600000 * 2),
                        };
                    });

                    let filteredReports = mockReports;

                    if (searchQuery) {
                        filteredReports = filteredReports.filter(report =>
                            report.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            report.contentPreview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            report.reporter.username.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                    }

                    if (statusFilter !== 'all') {
                        filteredReports = filteredReports.filter(report => report.status === statusFilter);
                    }

                    const paginatedReports = filteredReports.slice((page - 1) * rowsPerPage, page * rowsPerPage);
                    setReports(paginatedReports);
                    setTotalPages(Math.ceil(filteredReports.length / rowsPerPage));
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching reports:', err);
                setError('Failed to load reports');
                setLoading(false);
            }
        };

        fetchReports();
    }, [page, searchQuery, statusFilter]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setPage(1);
    };

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        setPage(1);
    };

    const handleResolveReport = (report: ReportResponse) => {
        console.log('Resolving report:', report);
    };

    const handleDismissReport = (report: ReportResponse) => {
        console.log('Dismissing report:', report);
    };

    const handleDeleteReport = (report: ReportResponse) => {
        console.log('Deleting report:', report);
    };

    if (error) {
        return <ErrorState message={error} />;
    }

    return (
        <div className="space-y-6">

            <div className="flex flex-col gap-4">
                <ReportFilters
                    searchQuery={searchQuery}
                    statusFilter={statusFilter}
                    onSearchChange={handleSearch}
                    onStatusFilter={handleStatusFilter}
                />

                <Card className="w-full p-4" radius="sm">
                    {loading ? (
                        <LoadingState />
                    ) : (
                        <ReportList
                            reports={reports}
                            loading={loading}
                            page={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                            onResolve={handleResolveReport}
                            onDismiss={handleDismissReport}
                            onDelete={handleDeleteReport}
                        />
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Reports;