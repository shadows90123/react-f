import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import Skeleton from "react-loading-skeleton";
import { auth, loginWithPassword, GetDocument } from "../libs/Firebase";
import { useUserData } from "../hooks/useUserData";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [userData] = useUserData();

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

    const onForgotPass = () => {};

    const onRegister = () => {
        navigate(`/register`);
    };

    const onLogin = async (e) => {
        e.preventDefault();
        const success = await loginWithPassword(form?.email, form?.password);

        if (success) {
            if (!_.isEmpty(user)) {
                const userRef = await GetDocument("users", user?.uid);
                navigate(`/${userRef.role}`);
            }
        } else {
            toast.error(`เกิดข้อผิดพลาด : เข้าสู่ระบบไม่สำเร็จ`);
        }
    };

    useEffect(() => {
        if (!_.isEmpty(userData)) {
            navigate(`/${userData.role}`);
        }
    }, [userData]);

    if (loading) {
        return <Skeleton />;
    }

    return (
        <div className="bg-light py-3 py-md-5">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
                        <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-5">
                                        <h3>เข้าสู่ระบบ</h3>
                                    </div>
                                </div>
                            </div>
                            <form action="#!">
                                <div className="row gy-3 gy-md-4 overflow-hidden">
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

                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button
                                                className="btn btn-lg btn-primary"
                                                type="submit"
                                                onClick={onLogin}
                                            >
                                                เข้าสู่ระบบ
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
                                            onClick={onRegister}
                                        >
                                            สร้างบัญชีใหม่
                                        </a>
                                        <a
                                            href="#"
                                            className="link-secondary text-decoration-none"
                                            onClick={onForgotPass}
                                        >
                                            ลืมรหัสผ่าน
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

export default Login;
