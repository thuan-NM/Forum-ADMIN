import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  type SortDescriptor,
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
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    {} as SortDescriptor
  );

  const sortedReports = useMemo(() => {
    if (!sortDescriptor.column) return reports;

    return [...reports].sort((a, b) => {
      let cmp = 0;

      switch (sortDescriptor.column) {
        case "reason":
          cmp = a.reason.localeCompare(b.reason);
          break;
        case "contentType":
          cmp = a.contentType.localeCompare(b.contentType);
          break;
        case "content":
          cmp = a.contentPreview.localeCompare(b.contentPreview);
          break;
        case "reporter":
          cmp = a.reporter.username.localeCompare(b.reporter.username);
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
        case "reported":
          cmp =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [reports, sortDescriptor]);

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
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
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
        <TableColumn key="reason" allowsSorting>
          LÝ DO
        </TableColumn>
        <TableColumn key="contentType" allowsSorting>
          LOẠI NỘI DUNG
        </TableColumn>
        <TableColumn key="content" allowsSorting>
          NỘI DUNG
        </TableColumn>
        <TableColumn key="reporter" allowsSorting>
          NGƯỜI BÁO CÁO
        </TableColumn>
        <TableColumn key="status" allowsSorting>
          TRẠNG THÁI
        </TableColumn>
        <TableColumn key="reported" allowsSorting>
          NGÀY BÁO CÁO
        </TableColumn>
        <TableColumn key="actions">HÀNH ĐỘNG</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"Không tìm thấy báo cáo nào"}>
        {sortedReports.map((report) => (
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
