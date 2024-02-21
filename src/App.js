import "./App.css";
import Login from "./pages/Login";
import Docx1 from "./Docx1";
import Docx2 from "./Docx2";
import Docx3 from "./Docx3";
import Docx4 from "./Docx4";
import CreatePDF from "./components/CreatePDF";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import DocDetails from "./pages/DocDetails";
import DocDetailsStudents from "./pages/DocDetailsStudents";
import DocDetailsStudents2 from "./pages/DocDetailsStudents2";
import DocDetailsStudents3 from "./pages/DocDetailsStudents3";
import DocDetailsStudents4 from "./pages/DocDetailsStudents4";
import HomeStudent from "./pages/HomeStudent";
import HomeTeacher from "./pages/HomeTeacher";
import CreatePDF2 from "./components/CreatePDF2";
import CreatePDF3 from "./components/CreatePDF3";
import CreatePDF4 from "./components/CreatePDF4";
import HomeTeacher2 from "./pages/HomeTeacher2";
import HomeTeacher3 from "./pages/HomeTeacher3";
import HomeTeacher4 from "./pages/HomeTeacher4";
import DocDetails2 from "./pages/DocDetails2";
import DocDetails3 from "./pages/DocDetails3";
import DocDetails4 from "./pages/DocDetails4";
import HomeT from "./pages/HomeT";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Docx1" element={<Docx1 />} />
                    <Route path="/Docx2" element={<Docx2 />} />
                    <Route path="/Docx3" element={<Docx3 />} />
                    <Route path="/CreatePDF" element={<CreatePDF />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/DocDetails" element={<DocDetails />} />
                    <Route path="/DocDetails2" element={<DocDetails2 />} />
                    <Route path="/DocDetails3" element={<DocDetails3 />} />
                    <Route path="/DocDetails4" element={<DocDetails4 />} />
                    <Route
                        path="/DocDetailsStudents"
                        element={<DocDetailsStudents />}
                    />
                    <Route
                        path="/DocDetailsStudents1"
                        element={<DocDetailsStudents2 />}
                    />
                    <Route
                        path="/DocDetailsStudents3"
                        element={<DocDetailsStudents3 />}
                    />
                    <Route
                        path="/DocDetailsStudents4"
                        element={<DocDetailsStudents4 />}
                    />
                    <Route path="/HomeStudent" element={<HomeStudent />} />
                    <Route path="/HomeTeacher" element={<HomeTeacher />} />
                    <Route path="/HomeTeacher2" element={<HomeTeacher2 />} />
                    <Route path="/HomeTeacher3" element={<HomeTeacher3 />} />
                    <Route path="/HomeTeacher4" element={<HomeTeacher4 />} />
                    <Route path="/CreatePDF2" element={<CreatePDF2 />} />
                    <Route path="/CreatePDF3" element={<CreatePDF3 />} />
                    <Route path="/CreatePDF4" element={<CreatePDF4 />} />
                    <Route path="/Docx4" element={<Docx4 />} />
                    <Route path="/HomeT" element={<HomeT />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
