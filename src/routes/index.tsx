import { createBrowserRouter } from "react-router-dom";
import { lazy, type JSX } from "react";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const UsersPage = lazy(() => import("../pages/UsersPage"));
const PostsPage = lazy(() => import("../pages/PostsPage"));
const CommentsPage = lazy(() => import("../pages/CommentsPage"));
const TopicsPage = lazy(() => import("../pages/TopicsPage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const PermissionsPage = lazy(() => import("../pages/PermissionsPage"));
const TagsPage = lazy(() => import("../pages/TagsPage"));
const withPrivateRoute = (element: JSX.Element) => <PrivateRoute>{element}</PrivateRoute>;

const protectedRoutes = [
    { index: true, element: withPrivateRoute(<Dashboard />) },
    { path: "users", element: withPrivateRoute(<UsersPage />) },
    { path: "posts", element: withPrivateRoute(<PostsPage />) },
    { path: "comments", element: withPrivateRoute(<CommentsPage />) },
    { path: "topics", element: withPrivateRoute(<TopicsPage />) },
    { path: "permissions", element: withPrivateRoute(<PermissionsPage />) },
    { path: "tags", element: withPrivateRoute(<TagsPage />) },
];

const publicRoutes = [
    { path: "auth", element: <AuthPage /> },
]
const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: protectedRoutes,
    },
    ...publicRoutes,
];

const router = createBrowserRouter(routes);

export default router;
