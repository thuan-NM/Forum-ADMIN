import { createBrowserRouter } from "react-router-dom";
import { lazy, type JSX } from "react";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "../components/Common/ScrollToTop";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const UsersPage = lazy(() => import("../pages/UsersPage"));
const PostsPage = lazy(() => import("../pages/PostsPage"));
const CommentsPage = lazy(() => import("../pages/CommentsPage"));
const TopicsPage = lazy(() => import("../pages/TopicsPage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const PermissionsPage = lazy(() => import("../pages/PermissionsPage"));
const TagsPage = lazy(() => import("../pages/TagsPage"));
const QuestionsPage = lazy(() => import("../pages/QuestionsPage"));
const AnswersPage = lazy(() => import("../pages/AnswersPage"));
const FileManager = lazy(() => import("../pages/FileManager"));
const Settings = lazy(() => import("../pages/SettingPage"));
const ReportsPage = lazy(() => import("../pages/ReportsPage"));
const NotificationsPage = lazy(() => import("../pages/NotificationsPage"));
const AnalyticsPage = lazy(() => import("../pages/AnalyticsPage"));
const QuestionDetailPage = lazy(() => import("../pages/QuestionDetailPage"));
const AnswerDetailPage = lazy(() => import("../pages/AnswerDetailPage"));
const PostDetailPage = lazy(() => import("../pages/PostDetailPage"));

const withPrivateRoute = (element: JSX.Element) => (
  <PrivateRoute>{element}</PrivateRoute>
);

const protectedRoutes = [
  { index: true, element: withPrivateRoute(<Dashboard />) },
  { path: "users", element: withPrivateRoute(<UsersPage />) },
  {
    path: "posts",
    children: [
      { index: true, element: withPrivateRoute(<PostsPage />) },
      { path: ":id", element: withPrivateRoute(<PostDetailPage />) },
    ],
  },
  { path: "comments", element: withPrivateRoute(<CommentsPage />) },
  { path: "topics", element: withPrivateRoute(<TopicsPage />) },
  { path: "permissions", element: withPrivateRoute(<PermissionsPage />) },
  { path: "tags", element: withPrivateRoute(<TagsPage />) },
  {
    path: "questions",
    children: [
      { index: true, element: withPrivateRoute(<QuestionsPage />) },
      { path: ":id", element: withPrivateRoute(<QuestionDetailPage />) },
    ],
  },
  {
    path: "answers",
    children: [
      { index: true, element: withPrivateRoute(<AnswersPage />) },
      { path: ":id", element: withPrivateRoute(<AnswerDetailPage />) },
    ],
  },
  { path: "reports", element: withPrivateRoute(<ReportsPage />) },
  { path: "notifications", element: withPrivateRoute(<NotificationsPage />) },
  { path: "analytics", element: withPrivateRoute(<AnalyticsPage />) },
  { path: "file-manager", element: withPrivateRoute(<FileManager />) },
  { path: "settings", element: withPrivateRoute(<Settings />) },
];

const publicRoutes = [{ path: "auth", element: <AuthPage /> }];
const routes = [
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <MainLayout />
      </>
    ),
    children: protectedRoutes,
  },
  ...publicRoutes,
];

const router = createBrowserRouter(routes);

export default router;
