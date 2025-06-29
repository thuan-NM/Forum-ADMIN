import React from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import TrafficSourceItem from './TrafficSourceItem';

interface TrafficSource {
    source: string;
    percentage: number;
    change: number;
}

interface TrafficSourcesProps {
    sources: TrafficSource[];
}

const TrafficSources: React.FC<TrafficSourcesProps> = ({ sources }) => {
    return (
        <Card>
            <CardHeader className="pb-0">
                <h3 className="text-lg font-semibold">Nguồn truy cập</h3>
            </CardHeader>
            <CardBody>
                <div className="space-y-4">
                    {sources.map((source, index) => (
                        <TrafficSourceItem
                            key={index}
                            source={source.source}
                            percentage={source.percentage}
                            change={source.change}
                        />
                    ))}
                </div>
            </CardBody>
        </Card>
    );
};

export default TrafficSources;