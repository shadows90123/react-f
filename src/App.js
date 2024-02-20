import "./App.css";
import Login from "./pages/Login";
import Docx1 from "./Docx1";
import Docx2 from "./Docx2";
import Docx3 from "./Docx3";
import CreatePDF from "./components/CreatePDF";
import Home_teachar from "./pages/HomeTeacher";
import Home_studen from "./pages/HomeStudent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import DocDetails from "./pages/DocDetails";
import DocDetailsStudents from "./pages/DocDetailsStudents";
import HomeStudent from "./pages/HomeStudent";
import HomeTeacher from "./pages/HomeTeacher";
import CreatePDF2 from "./components/CreatePDF2";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Home" element={<Home_studen />} />
                    <Route path="/Docx1" element={<Docx1 />} />
                    <Route path="/Docx2" element={<Docx2 />} />
                    <Route path="/Docx3" element={<Docx3 />} />
                    <Route path="/CreatePDF" element={<CreatePDF />} />
                    <Route path="/Home_teachar" element={<Home_teachar />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/DocDetails" element={<DocDetails />} />
                    <Route
                        path="/DocDetailsStudents"
                        element={<DocDetailsStudents />}
                    />
                    <Route path="/HomeStudent" element={<HomeStudent />} />
                    <Route path="/HomeTeacher" element={<HomeTeacher />} />
                    <Route path="/CreatePDF2" element={<CreatePDF2 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
