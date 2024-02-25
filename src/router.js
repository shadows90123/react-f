import { createBrowserRouter } from "react-router-dom";

import { authMiddleware } from "./components/authMiddleware";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomeStudent from "./pages/student/HomeStudent";
import HomeTeacher from "./pages/teacher/HomeTeacher";

import Document1 from "./pages/student/Document1";
import Document2 from "./pages/student/Document2";
import Document3 from "./pages/student/Document3";
import Document4 from "./pages/student/Document4";
import Docx1 from "./pages/student/Docx1";
import Docx2 from "./pages/student/Docx2";
import Docx3 from "./pages/student/Docx3";
import Docx4 from "./pages/student/Docx4";

import TableDoc1 from "./pages/teacher/TableDoc1";
import TableDoc2 from "./pages/teacher/TableDoc2";
import TableDoc3 from "./pages/teacher/TableDoc3";
import TableDoc4 from "./pages/teacher/TableDoc4";
import DocDetails1 from "./pages/teacher/DocDetails1";
import DocDetails2 from "./pages/teacher/DocDetails2";
import DocDetails3 from "./pages/teacher/DocDetails3";
import DocDetails4 from "./pages/teacher/DocDetails4";

const AuthHomeStudent = authMiddleware(["student"])(HomeStudent);
const AuthDocument1 = authMiddleware(["student"])(Document1);
const AuthDocument2 = authMiddleware(["student"])(Document2);
const AuthDocument3 = authMiddleware(["student"])(Document3);
const AuthDocument4 = authMiddleware(["student"])(Document4);
const AuthDocx1 = authMiddleware(["student"])(Docx1);
const AuthDocx2 = authMiddleware(["student"])(Docx2);
const AuthDocx3 = authMiddleware(["student"])(Docx3);
const AuthDocx4 = authMiddleware(["student"])(Docx4);

const AuthHomeTeacher = authMiddleware(["teacher"])(HomeTeacher);
const AuthTableDoc1 = authMiddleware(["teacher"])(TableDoc1);
const AuthTableDoc2 = authMiddleware(["teacher"])(TableDoc2);
const AuthTableDoc3 = authMiddleware(["teacher"])(TableDoc3);
const AuthTableDoc4 = authMiddleware(["teacher"])(TableDoc4);
const AuthDocDetails1 = authMiddleware(["teacher"])(DocDetails1);
const AuthDocDetails2 = authMiddleware(["teacher"])(DocDetails2);
const AuthDocDetails3 = authMiddleware(["teacher"])(DocDetails3);
const AuthDocDetails4 = authMiddleware(["teacher"])(DocDetails4);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <SignUp />,
    },
    {
        path: "student",
        children: [
            {
                index: true,
                element: <AuthHomeStudent />,
            },
            {
                path: "document_1",
                children: [
                    {
                        index: true,
                        element: <AuthDocument1 />,
                    },
                    {
                        path: "create",
                        element: <AuthDocx1 action={"create"} />,
                    },
                    {
                        path: "edit",
                        element: <AuthDocx1 action={"edit"} />,
                    },
                ],
            },
            {
                path: "document_2",
                children: [
                    {
                        index: true,
                        element: <AuthDocument2 />,
                    },
                    {
                        path: "create",
                        element: <AuthDocx2 action={"create"} />,
                    },
                    {
                        path: "edit",
                        element: <AuthDocx2 action={"edit"} />,
                    },
                ],
            },
            {
                path: "document_3",
                children: [
                    {
                        index: true,
                        element: <AuthDocument3 />,
                    },
                    {
                        path: "create",
                        element: <AuthDocx3 action={"create"} />,
                    },
                    {
                        path: "edit",
                        element: <AuthDocx3 action={"edit"} />,
                    },
                ],
            },
            {
                path: "document_4",
                children: [
                    {
                        index: true,
                        element: <AuthDocument4 />,
                    },
                    {
                        path: "create",
                        element: <AuthDocx4 action={"create"} />,
                    },
                    {
                        path: "edit",
                        element: <AuthDocx4 action={"edit"} />,
                    },
                ],
            },
        ],
    },
    {
        path: "/teacher",
        children: [
            {
                index: true,
                element: <AuthHomeTeacher />,
            },
            {
                path: "document_1",
                children: [
                    {
                        index: true,
                        element: <AuthTableDoc1 />,
                    },
                    {
                        path: "detail",
                        element: <AuthDocDetails1 />,
                    },
                ],
            },
            {
                path: "document_2",
                children: [
                    {
                        index: true,
                        element: <AuthTableDoc2 />,
                    },
                    {
                        path: "detail",
                        element: <AuthDocDetails2 />,
                    },
                ],
            },
            {
                path: "document_3",
                children: [
                    {
                        index: true,
                        element: <AuthTableDoc3 />,
                    },
                    {
                        path: "detail",
                        element: <AuthDocDetails3 />,
                    },
                ],
            },
            {
                path: "document_4",
                children: [
                    {
                        index: true,
                        element: <AuthTableDoc4 />,
                    },
                    {
                        path: "detail",
                        element: <AuthDocDetails4 />,
                    },
                ],
            },
        ],
    },
]);
