import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { ReportResponse } from '../../store/interfaces/reportInterfaces';

interface ReportActionsProps {
    report: ReportResponse;
    onResolve?: (report: ReportResponse) => void;
    onDismiss?: (report: ReportResponse) => void;
    onDelete?: (report: ReportResponse) => void;
}

const ReportActions: React.FC<ReportActionsProps> = ({
    report,
    onResolve,
    onDismiss,
    onDelete
}) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <Icon icon="lucide:more-vertical" className="text-default-500" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Report actions">
                <DropdownItem key="view" startContent={<Icon icon="lucide:eye" />}>
                    View Details
                </DropdownItem>
                <>
                    {report.status === 'pending' && (

                        <>
                            <DropdownItem
                                key="resolve"
                                startContent={<Icon icon="lucide:check" />}
                                color="success"
                                onPress={() => onResolve && onResolve(report)}
                            >
                                Mark Resolved
                            </DropdownItem>
                            <DropdownItem
                                startContent={<Icon icon="lucide:x" />}
                                color="default"
                                onPress={() => onDismiss && onDismiss(report)}
                                key="dismiss"
                            >
                                Dismiss
                            </DropdownItem>
                        </>
                    )}
                </>
                <DropdownItem
                    startContent={<Icon icon="lucide:trash" />}
                    color="danger"
                    onPress={() => onDelete && onDelete(report)}
                    key="delete"

                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default ReportActions;