import React from "react";
import { Icon } from "@iconify/react";

interface ActivityItemProps {
  icon: string;
  iconBgColor: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  iconBgColor,
  iconColor,
  title,
  description,
  time,
}) => {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-content2 rounded-md transition-colors">
      <div className={`${iconBgColor} p-2 rounded-full`}>
        <Icon icon={icon} className={`${iconColor} w-4 h-4`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{title}</p>
        <p className="text-default-500 text-sm truncate">{description}</p>
        <p className="text-default-400 text-xs mt-1">{time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
