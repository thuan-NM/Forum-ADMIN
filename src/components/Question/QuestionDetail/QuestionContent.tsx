import React from 'react';
import { Card, CardBody } from '@heroui/react';

interface QuestionContentProps {
    content: string;
}

const QuestionContent: React.FC<QuestionContentProps> = ({ content }) => {
    return (
        <Card>
            <CardBody>
                <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </CardBody>
        </Card>
    );
};

export default QuestionContent;