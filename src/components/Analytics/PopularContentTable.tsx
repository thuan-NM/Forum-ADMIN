import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';

interface ContentItem {
    id: string;
    title: string;
    type: 'post' | 'question';
    views: number;
    comments: number;
    answers?: number;
    author: string;
}

interface PopularContentTableProps {
    items: ContentItem[];
    onViewItem?: (item: ContentItem) => void;
}

const PopularContentTable: React.FC<PopularContentTableProps> = ({
    items,
    onViewItem
}) => {
    return (
        <Table
            aria-label="Popular content table"
            removeWrapper
        >
            <TableHeader>
                <TableColumn>TITLE</TableColumn>
                <TableColumn>TYPE</TableColumn>
                <TableColumn>AUTHOR</TableColumn>
                <TableColumn>VIEWS</TableColumn>
                <TableColumn>ENGAGEMENT</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>
                            <Chip
                                color={item.type === 'post' ? 'primary' : 'secondary'}
                                variant="flat"
                                size="sm"
                            >
                                {item.type}
                            </Chip>
                        </TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell>{item.views.toLocaleString()}</TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <Icon icon="lucide:message-square" fontSize={14} className="text-default-400" />
                                    <span>{item.comments}</span>
                                </div>
                                {item.type === 'question' && item.answers && (
                                    <div className="flex items-center gap-1">
                                        <Icon icon="lucide:message-circle" fontSize={14} className="text-default-400" />
                                        <span>{item.answers}</span>
                                    </div>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Button
                                size="sm"
                                variant="flat"
                                startContent={<Icon icon="lucide:eye" />}
                                onPress={() => onViewItem && onViewItem(item)}
                            >
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default PopularContentTable;