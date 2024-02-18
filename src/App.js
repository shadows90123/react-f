import "./App.css";
import Login from "./Login";
import Docx1 from "./Docx1";
import Docx2 from "./Docx2";
import Docx3 from "./Docx3";
import Home_teachar from "./Home_teachar";
import Home_studen from "./Home_studen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Docx4 from "./Docx4";
import SignUp from "./SignUp";

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
                    <Route path="/Docx4" element={<Docx4 />} />
                    <Route path="/Home_teachar" element={<Home_teachar />} />
                    <Route path="/SignUp" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
