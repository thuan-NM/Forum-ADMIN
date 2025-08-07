import React from "react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Chip,
} from "@heroui/react";
import { ContentTypeChip, StatusChip, DateFormatter } from "../Common";
import type { ReportResponse } from "../../store/interfaces/reportInterfaces";

interface ReportDetailProps {
  report?: ReportResponse;
  isOpen: boolean;
  onClose: () => void;
  onResolve?: (report: ReportResponse) => void;
  onDismiss?: (report: ReportResponse) => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({
  report,
  isOpen,
  onClose,
  onResolve,
  onDismiss,
}) => {
  if (!report) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="2xl" placement="right">
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              Report Details
            </DrawerHeader>
            <DrawerBody>
              <div className="space-y-4 px-2">
                <div>
                  <h3 className="text-sm font-medium text-default-500">
                    Reason
                  </h3>
                  <p className="mt-1">{report.reason}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-default-500">
                      Content Type
                    </h3>
                    <ContentTypeChip type={report.contentType} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-default-500">
                      Content ID
                    </h3>
                    <Chip className="" size="sm">{report.contentId}</Chip>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-default-500">
                      Status
                    </h3>
                    <StatusChip status={report.status} type="report" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-default-500">
                    Content Preview
                  </h3>
                  <p className="mt-1 p-2 bg-default-100 rounded-md">
                    {report.contentPreview}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-default-500">
                    Reported By
                  </h3>
                  <p className="mt-1">{report.reporter.username}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-default-500">
                    Reported On
                  </h3>
                  <DateFormatter date={report.createdAt} format="long" />
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter>
              {report.status === "pending" && (
                <>
                  <Button
                    color="success"
                    onPress={() => onResolve && onResolve(report)}
                  >
                    Mark Resolved
                  </Button>
                  <Button
                    color="warning"
                    onPress={() => onDismiss && onDismiss(report)}
                  >
                    Dismiss
                  </Button>
                </>
              )}
              <Button color="danger" variant="bordered" onPress={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ReportDetail;
