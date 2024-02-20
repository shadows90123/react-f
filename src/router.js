import { createBrowserRouter } from "react-router-dom";

import { authMiddleware } from "./components/authMiddleware";

import Login from "./pages/Login";
import HomeStudent from "./pages/student/HomeStudent";
import HomeTeacher from "./pages/teacher/HomeTeacher";

import Document1 from "./pages/student/Document1";
import Docx1 from "./pages/student/Docx1";

const AuthHomeStudent = authMiddleware(["student"])(HomeStudent);
const AuthHomeTeacher = authMiddleware(["teacher"])(HomeTeacher);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "student",
        children: [
            {
                index: true,
                element: <AuthHomeStudent />,
            },
            {
                path: "document_i",
                children: [
                    {
                        index: true,
                        element: <Document1 />,
                    },
                    {
                        path: "create",
                        element: <Docx1 />,
                    },
                ],
            },
            {
                path: "document_ii",
                element: <Document1 />,
            },
        ],
    },
    {
        path: "/teacher",
        element: <AuthHomeTeacher />,
    },
]);
