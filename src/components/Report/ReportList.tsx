import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@heroui/react";
import ReportActions from "./ReportActions";
import { ContentTypeChip, StatusChip, DateFormatter } from "../Common";
import type { ReportResponse } from "../../store/interfaces/reportInterfaces";

interface ReportListProps {
  reports: ReportResponse[];
  loading?: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onResolve?: (report: ReportResponse) => void;
  onDismiss?: (report: ReportResponse) => void;
  onDelete?: (report: ReportResponse) => void;
  onView?: (report: ReportResponse) => void;
}

const ReportList: React.FC<ReportListProps> = ({
  reports,
  loading,
  page,
  totalPages,
  onPageChange,
  onResolve,
  onDismiss,
  onDelete,
  onView,
}) => {
  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <Table
      aria-label="Reports table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPages}
            onChange={onPageChange}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[400px]",
      }}
      removeWrapper
    >
      <TableHeader>
        <TableColumn>REASON</TableColumn>
        <TableColumn>CONTENT TYPE</TableColumn>
        <TableColumn>CONTENT</TableColumn>
        <TableColumn>REPORTER</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>REPORTED</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No reports found"}>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.reason}</TableCell>
            <TableCell>
              <ContentTypeChip type={report.contentType} />
            </TableCell>
            <TableCell className="max-w-xs truncate">
              {report.contentPreview}
            </TableCell>
            <TableCell>{report.reporter.username}</TableCell>
            <TableCell>
              <StatusChip status={report.status} type="report" />
            </TableCell>
            <TableCell>
              <DateFormatter date={report.createdAt} format="medium" />
            </TableCell>
            <TableCell>
              <ReportActions
                report={report}
                onResolve={onResolve}
                onDismiss={onDismiss}
                onDelete={onDelete}
                onView={onView}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReportList;
