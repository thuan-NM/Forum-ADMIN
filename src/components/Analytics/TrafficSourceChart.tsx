import React from 'react';
import { Card, CardHeader, CardBody, Chip } from '@heroui/react';

interface TrafficSource {
    source: string;
    percentage: number;
    change: number;
}

interface TrafficSourceChartProps {
    sources: TrafficSource[];
}

const TrafficSourceChart: React.FC<TrafficSourceChartProps> = ({ sources }) => {
    return (
        <Card>
            <CardHeader>
                <h3 className="text-lg font-semibold">Lưu lượng</h3>
            </CardHeader>
            <CardBody>
                <div className="space-y-4">
                    {sources.map((source, index) => (
                        <div key={index} className="space-y-1">
                            <div className="flex justify-between items-center">
                                <p className="font-medium">{source.source}</p>
                                <div className="flex items-center gap-2">
                                    <p>{source.percentage}%</p>
                                    <Chip
                                        color={source.change > 0 ? 'success' : source.change < 0 ? 'danger' : 'default'}
                                        variant="flat"
                                        size="sm"
                                    >
                                        {source.change > 0 ? '+' : ''}{source.change}%
                                    </Chip>
                                </div>
                            </div>
                            <div className="w-full bg-default-100 rounded-full h-2">
                                <div
                                    className="bg-primary-500 h-2 rounded-full"
                                    style={{ width: `${source.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
};

export default TrafficSourceChart;