import { useState, useEffect } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerWithPassword } from "../libs/Firebase";

const Roles = {
    student: "นักศึกษา",
    teacher: "อาจารย์",
    president: "ประธาน",
    admin: "ผู้ดูแลระบบ",
};

const validationForm = (form) => {
    let isValid = true;
    _.keys(form).map((key) => {
        if (form[key] === "") {
            isValid = false;
        }
    });

    return isValid;
};

const SignUp = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({});

    const onChange = (e) => {
        const { name, value, type } = e.target;

        setForm((prev) => {
            return {
                ...prev,
                [name]: type === "checkbox" ? !form[name] : value,
            };
        });
    };

    const onLogin = () => {
        navigate(`/login`);
    };

    const onSignUp = async (e) => {
        e.preventDefault();

        if (!validationForm(form)) {
            toast.error("เกิดข้อผิดพลาด: กรอกข้อมูลให้ครบ");
            return;
        }

        const isRegister = await registerWithPassword(form);

        if (isRegister) {
            toast.success("สมัครสำเร็จ");
            navigate("/");
        } else {
            toast.error("เกิดข้อผิดพลาด: สมัครไม่สำเร็จ");
        }
    };

    useEffect(() => {
        setForm({ role: "student" });
    }, []);

    return (
        <div className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
                        <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-5">
                                        <h3>สร้างบัญชี</h3>
                                    </div>
                                </div>
                            </div>
                            <form action="#!">
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="col-12">
                                        <label
                                            for="name"
                                            className="form-label"
                                        >
                                            ชื่อ-สกุล{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={onChange}
                                            value={form["name"] ?? ""}
                                            name="name"
                                            id="name"
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label for="tel" className="form-label">
                                            เบอร์โทรติดต่อ{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={onChange}
                                            value={form["tel"] ?? ""}
                                            name="tel"
                                            id="tel"
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label
                                            for="email"
                                            className="form-label"
                                        >
                                            อีเมล{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            onChange={onChange}
                                            value={form["email"] ?? ""}
                                            name="email"
                                            id="email"
                                            placeholder="name@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label
                                            for="password"
                                            className="form-label"
                                        >
                                            รหัสผ่าน{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            onChange={onChange}
                                            value={form["password"] ?? ""}
                                            name="password"
                                            id="password"
                                            required
                                        />
                                    </div>

                                    {/* <div className="col-12">
                                        <label
                                            for="password"
                                            className="form-label"
                                        >
                                            บทบาท{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            name="role"
                                            onChange={onChange}
                                        >
                                            {_.keys(Roles).map((key) => {
                                                return (
                                                    <option
                                                        key={key}
                                                        value={key}
                                                        selected={
                                                            form["role"] === key
                                                        }
                                                    >
                                                        {Roles[key]}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div> */}

                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button
                                                className="btn btn-lg btn-primary"
                                                type="submit"
                                                onClick={onSignUp}
                                            >
                                                สร้างบัญชี
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col-12">
                                    <hr className="mt-5 mb-4 border-secondary-subtle" />
                                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                                        <a
                                            href="#"
                                            className="link-secondary text-decoration-none"
                                            onClick={onLogin}
                                        >
                                            เข้าสู่ระบบ
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
