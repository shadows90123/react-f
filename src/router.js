import { createBrowserRouter } from "react-router-dom";

import { authMiddleware } from "./components/authMiddleware";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import Layout from "./components/V2/Layout";
import NotFound from "./components/V2/NotFound";

import HomeStudent from "./pages/student/Home";
import ManageStudent from "./components/V2/Student/Management";

import HomeTeacher from "./pages/teacher/Home";
import ManageTeacher from "./components/V2/Teacher/Management";

import HomePresident from "./pages/president/Home";
import ManagePresident from "./components/V2/President/Management";

import HomeAdmin from "./pages/admin/Home";
import UserTable from "./components/V2/Admin/UserTable";
import ManageAdmin from "./components/V2/Admin/Management";

const AuthLogin = authMiddleware(["*"])(Login);

const AuthIndex = authMiddleware(["student"])(() => <></>);
const AuthHomeStudent = authMiddleware(["student"])(HomeStudent);
const AuthManageStudent = authMiddleware(["student"])(ManageStudent);

const AuthHomeTeacher = authMiddleware(["teacher"])(HomeTeacher);
const AuthManageTeacher = authMiddleware(["teacher"])(ManageTeacher);

const AuthHomePresident = authMiddleware(["president"])(HomePresident);
const AuthManagePresident = authMiddleware(["president"])(ManagePresident);

const AuthHomeAdmin = authMiddleware(["admin"])(HomeAdmin);
const AuthUserTable = authMiddleware(["admin"])(UserTable);
const AuthManageAdmin = authMiddleware(["admin"])(ManageAdmin);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthIndex />,
        errorElement: <NotFound />,
    },
    {
        path: "/login",
        element: <AuthLogin />,
        errorElement: <NotFound />,
    },
    {
        path: "/register",
        element: <SignUp />,
        errorElement: <NotFound />,
    },
    {
        path: "student",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <AuthHomeStudent />,
            },
            {
                path: "project_1",
                children: [
                    {
                        path: "document_1",
                        element: <AuthManageStudent />,
                    },
                    {
                        path: "document_2_1",
                        element: <AuthManageStudent />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthManageStudent />,
                    },
                ],
            },
            {
                path: "project_2",
                children: [
                    {
                        path: "document_2_1",
                        element: <AuthManageStudent />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthManageStudent />,
                    },
                    {
                        path: "document_3",
                        element: <AuthManageStudent />,
                    },
                    {
                        path: "document_4",
                        element: <AuthManageStudent />,
                    },
                ],
            },
        ],
    },
    {
        path: "teacher",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <AuthHomeTeacher />,
            },
            {
                path: "project_1",
                children: [
                    {
                        path: "document_1",
                        element: <AuthManageTeacher />,
                    },
                    {
                        path: "document_2_1",
                        element: <AuthManageTeacher />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthManageTeacher />,
                    },
                ],
            },
            {
                path: "project_2",
                children: [
                    {
                        path: "document_2_1",
                        element: <AuthManageTeacher />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthManageTeacher />,
                    },
                    {
                        path: "document_3",
                        element: <AuthManageTeacher />,
                    },
                    {
                        path: "document_4",
                        element: <AuthManageTeacher />,
                    },
                ],
            },
        ],
    },
    {
        path: "president",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <AuthHomePresident />,
            },
            {
                path: "project_1",
                children: [
                    {
                        path: "document_1",
                        element: <AuthManagePresident />,
                    },
                    {
                        path: "document_2_1",
                        element: <AuthManagePresident />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthManagePresident />,
                    },
                ],
            },
            {
                path: "project_2",
                children: [
                    {
                        path: "document_2_1",
                        element: <AuthManagePresident />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthManagePresident />,
                    },
                    {
                        path: "document_3",
                        element: <AuthManagePresident />,
                    },
                    {
                        path: "document_4",
                        element: <AuthManagePresident />,
                    },
                ],
            },
        ],
    },
    {
        path: "admin",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <AuthHomeAdmin />,
            },
            {
                path: "users",
                element: <AuthUserTable />,
            },
            {
                path: "project_1",
                children: [
                    {
                        path: "document_1",
                        element: <AuthManageAdmin />,
                    },
                    {
                        path: "document_2_1",
                        element: <AuthManageAdmin />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthManageAdmin />,
                    },
                ],
            },
            {
                path: "project_2",
                children: [
                    {
                        path: "document_2_1",
                        element: <AuthManageAdmin />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthManageAdmin />,
                    },
                    {
                        path: "document_3",
                        element: <AuthManageAdmin />,
                    },
                    {
                        path: "document_4",
                        element: <AuthManageAdmin />,
                    },
                ],
            },
        ],
    },
]);
