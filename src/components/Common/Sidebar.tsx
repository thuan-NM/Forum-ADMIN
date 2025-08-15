import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-content2 p-4 hidden md:block bg-content1 ">
      <nav className="flex flex-col gap-1 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
          end
        >
          <Icon icon="lucide:home" />
          <span>Tổng quát</span>
        </NavLink>

        <div className="mt-6 mb-2 px-3">
          <p className="text-xs font-medium text-default-500 uppercase tracking-wider">
            Nội dung
          </p>
        </div>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon icon="lucide:file-text" />
          <span>Quản lý bài viết</span>
        </NavLink>
        <NavLink
          to="/questions"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon icon="lucide:help-circle" />
          <span>Quản lý câu hỏi</span>
        </NavLink>
        <NavLink
          to="/answers"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon icon="lucide:message-circle" />
          <span>Quản lý câu trả lời</span>
        </NavLink>
        <NavLink
          to="/comments"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon icon="lucide:message-square" />
          <span>Quản lý bình luận</span>
        </NavLink>
        <NavLink
          to="/topics"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon icon="lucide:tag" />
          <span>Quản lý chủ đề</span>
        </NavLink>
        <NavLink
          to="/tags"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon icon="lucide:hash" />
          <span>Quản lý thẻ</span>
        </NavLink>

        <div className="mt-6 mb-2 px-3">
          <p className="text-xs font-medium text-default-500 uppercase tracking-wider">
            Người dùng
          </p>
        </div>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon icon="lucide:users" />
          <span>Quản lý người dùng</span>
        </NavLink>
        <NavLink
          to="/permissions"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon icon="lucide:shield" />
          <span>Quản lý quyền</span>
        </NavLink>

        <div className="mt-6 mb-2 px-3">
          <p className="text-xs font-medium text-default-500 uppercase tracking-wider">
            Giám sát
          </p>
        </div>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon icon="lucide:flag" />
          <span>Quản lý báo cáo</span>
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon icon="lucide:bell" />
          <span>Thông báo</span>
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon icon="lucide:bar-chart-2" />
          <span>Phân tích</span>
        </NavLink>

        <div className="mt-6 mb-2 px-3">
          <p className="text-xs font-medium text-default-500 uppercase tracking-wider">
            Hệ thống
          </p>
        </div>
        <NavLink
          to="/file-manager"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon icon="lucide:folder" />
          <span>Quản lý tệp</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <Icon icon="lucide:settings" />
          <span>Cài đặt</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
