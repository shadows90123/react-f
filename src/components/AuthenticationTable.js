import HeaderBP from "../components/Student/Header";
import "./Table.css";

const AuthenticationTable = () => {
    return (
        <div>
            <Header />
            <div className="header-table  ">
                <div className="table-1 mb-2">
                    <div
                        className="text-white d-flex justify-content-center container p-2 m-2  rounded-top"
                        style={{
                            background: "#7e0202 ",
                        }}
                    >
                        {" "}
                        นักศึกษาโครงงาน 1
                    </div>
                    <div className="customers">
                        <table>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ชื่อโครงงาน</th>
                                    <th>ชื่อนักศึกษา</th>
                                    <th>อาจารย์ที่ปรึกษา</th>
                                    <th>ผ่าน</th>
                                    <th>ไม่ผ่าน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="header-table">
                <div className="table-1 mb-2">
                    <div
                        className="text-white d-flex justify-content-center container p-2 m-2  rounded-top"
                        style={{
                            background: "#7e0202 ",
                        }}
                    >
                        {" "}
                        นักศึกษาโครงงาน 2
                    </div>
                    <div className="customers">
                        <table>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ชื่อโครงงาน</th>
                                    <th>ชื่อนักศึกษา</th>
                                    <th>อาจารย์ที่ปรึกษา</th>
                                    <th>ผ่าน</th>
                                    <th>ไม่ผ่าน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="header-table">
                <div className="table-1 mb-2">
                    <div
                        className="text-white d-flex justify-content-center container p-2 m-2  rounded-top "
                        style={{
                            background: "#7e0202 ",
                        }}
                    >
                        {" "}
                        กรอกเอกสารป.3
                    </div>
                    <div className="customers ">
                        <table>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ชื่อโครงงาน</th>
                                    <th>ชื่อนักศึกษา</th>
                                    <th>อาจารย์ที่ปรึกษา</th>
                                    <th> ส่งเล่มครบ </th>
                                    <th> ส่งเล่มครบไม่ </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationTable;
