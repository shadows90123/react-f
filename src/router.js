import { createBrowserRouter } from "react-router-dom";

import { authMiddleware } from "./components/authMiddleware";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import Layout from "./components/V2/Layout";
import NotFound from "./components/V2/NotFound";

import HomeStudent from "./pages/student/Home";
import DocStudent from "./components/V2/Student/DocMain";

import HomeTeacher from "./pages/teacher/Home";
import DocTeacher from "./components/V2/Teacher/DocMain";

import HomePresident from "./pages/president/Home";
import DocPresident from "./components/V2/President/DocMain";

import HomeAdmin from "./pages/admin/Home";
import UserMain from "./components/V2/Admin/UserMain";
import DocAdmin from "./components/V2/Admin/DocMain";

const AuthLogin = authMiddleware(["*"])(Login);

const AuthIndex = authMiddleware(["student"])(() => <></>);
const AuthHomeStudent = authMiddleware(["student"])(HomeStudent);
const AuthDocStudent = authMiddleware(["student"])(DocStudent);

const AuthHomeTeacher = authMiddleware(["teacher"])(HomeTeacher);
const AuthDocTeacher = authMiddleware(["teacher"])(DocTeacher);

const AuthHomePresident = authMiddleware(["president"])(HomePresident);
const AuthDocPresident = authMiddleware(["president"])(DocPresident);

const AuthHomeAdmin = authMiddleware(["admin"])(HomeAdmin);
const AuthUserMain = authMiddleware(["admin"])(UserMain);
const AuthDocAdmin = authMiddleware(["admin"])(DocAdmin);

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
                        element: <AuthDocStudent />,
                    },
                    {
                        path: "document_2_1",
                        element: <AuthDocStudent />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthDocStudent />,
                    },
                ],
            },
            {
                path: "project_2",
                children: [
                    {
                        path: "document_2_1",
                        element: <AuthDocStudent />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthDocStudent />,
                    },
                    {
                        path: "document_3",
                        element: <AuthDocStudent />,
                    },
                    {
                        path: "document_4",
                        element: <AuthDocStudent />,
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
                        element: <AuthDocTeacher />,
                    },
                    {
                        path: "document_2_1",
                        element: <AuthDocTeacher />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthDocTeacher />,
                    },
                ],
            },
            {
                path: "project_2",
                children: [
                    {
                        path: "document_2_1",
                        element: <AuthDocTeacher />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthDocTeacher />,
                    },
                    {
                        path: "document_3",
                        element: <AuthDocTeacher />,
                    },
                    {
                        path: "document_4",
                        element: <AuthDocTeacher />,
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
                        path: "document_2_1",
                        element: <AuthDocPresident />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthDocPresident />,
                    },
                ],
            },
            {
                path: "project_2",
                children: [
                    {
                        path: "document_2_1",
                        element: <AuthDocPresident />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthDocPresident />,
                    },
                    {
                        path: "document_3",
                        element: <AuthDocPresident />,
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
                element: <AuthUserMain />,
            },
            {
                path: "project_1",
                children: [
                    {
                        path: "document_1",
                        element: <AuthDocAdmin />,
                    },
                    {
                        path: "document_2_1",
                        element: <AuthDocAdmin />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthDocAdmin />,
                    },
                ],
            },
            {
                path: "project_2",
                children: [
                    {
                        path: "document_2_1",
                        element: <AuthDocAdmin />,
                    },
                    {
                        path: "document_2_2",
                        element: <AuthDocAdmin />,
                    },
                    {
                        path: "document_3",
                        element: <AuthDocAdmin />,
                    },
                    {
                        path: "document_4",
                        element: <AuthDocAdmin />,
                    },
                ],
            },
        ],
    },
]);
