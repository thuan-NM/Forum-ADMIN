import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import ActivityItem from "./ActivityItem";

interface Activity {
  id: string;
  type: "user" | "post" | "comment" | "topic" | "question" | "answer" | string;
  title: string;
  description: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  // Map activity types to icon and color, adjust colors to match your theme (e.g., primary-100 from Tailwind or similar)
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return {
          icon: "lucide:user-plus",
          bgColor: "bg-blue-100", // Match blue from your image
          color: "text-blue-500",
        };
      case "post":
        return {
          icon: "lucide:file-plus",
          bgColor: "bg-purple-100", // Match purple
          color: "text-purple-500",
        };
      case "comment":
        return {
          icon: "lucide:message-square",
          bgColor: "bg-green-100", // Match green
          color: "text-green-500",
        };
      case "category":
        return {
          icon: "lucide:tag",
          bgColor: "bg-orange-100", // Match orange
          color: "text-orange-500",
        };
      case "question":
        return {
          icon: "lucide:help-circle",
          bgColor: "bg-red-100",
          color: "text-red-500",
        };
      case "answer":
        return {
          icon: "lucide:message-circle",
          bgColor: "bg-blue-100",
          color: "text-blue-500",
        };
      default:
        return {
          icon: "lucide:activity",
          bgColor: "bg-gray-100",
          color: "text-gray-500",
        };
    }
  };

  return (
    <Card>
      <CardHeader className="pb-0">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {activities.map((activity) => {
            const { icon, bgColor, color } = getActivityIcon(activity.type);

            return (
              <ActivityItem
                key={activity.id}
                icon={icon}
                iconBgColor={bgColor}
                iconColor={color}
                title={activity.title}
                description={activity.description}
                time={activity.time}
              />
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};

export default RecentActivity;
