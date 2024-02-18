import React, { useEffect } from "react";
import Header from "./components/Header";
import "./Docx1.css";
import { MDBInput } from "mdbreact";
import { MDBCheckbox } from "mdb-react-ui-kit";
import { MDBRadio } from "mdb-react-ui-kit";
import { useState } from "react";
import Docx4 from "./Docx4";
import Button from "react-bootstrap/Button";
import { db } from "./components/Firebase";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";

import { auth } from "./components/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Docx1 = () => {
    const [user, loading, error] = useAuthState(auth);
    console.log(user?.uid);

    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [name3, setName3] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [pass3, setPass3] = useState("");
    const [number1, setNumber1] = useState("");
    const [number2, setNumber2] = useState("");
    const [number3, setNumber3] = useState("");
    const [project, setProject] = useState("");
    const [teacher1, setTeacher1] = useState("");
    const [teacher2, setTeacher2] = useState("");
    const [studen1, setStuden1] = useState("");
    const [studen2, setStuden2] = useState("");
    const [studen3, setStuden3] = useState("");
    const [checkGoup1, setCheckGoup1] = useState(false);
    const [checkGoup2, setCheckGoup2] = useState(false);
    const [checkGoup3, setCheckGoup3] = useState(false);
    const [checkGoup4, setCheckGoup4] = useState(false);
    const [checkGoup5, setCheckGoup5] = useState(false);
    const [checkGoup6, setCheckGoup6] = useState(false);
    const [radioGoup, setRadioGoup] = useState("");

    //-------------------------------> name
    const onNameChange1 = (e) => {
        setName1(e.target.value);
    };
    const onNameChange2 = (e) => {
        setName2(e.target.value);
    };
    const onNameChange3 = (e) => {
        setName3(e.target.value);
    };
    //-------------------------------> PassStuden
    const onPassChange1 = (e) => {
        setPass1(e.target.value);
    };
    const onPassChange2 = (e) => {
        setPass2(e.target.value);
    };
    const onPassChange3 = (e) => {
        setPass3(e.target.value);
    };
    //-------------------------------> number
    const onNumberChanger1 = (e) => {
        setNumber1(e.target.value);
    };
    const onNumberChanger2 = (e) => {
        setNumber2(e.target.value);
    };
    const onNumberChanger3 = (e) => {
        setNumber3(e.target.value);
    };
    //-------------------------------> project
    const onProjectChange = (e) => {
        setProject(e.target.value);
    };
    //-------------------------------> teacher
    const onTeacherChange1 = (e) => {
        setTeacher1(e.target.value);
    };
    const onTeacherChange2 = (e) => {
        setTeacher2(e.target.value);
    };
    //-------------------------------> studens
    const onStudenChange1 = (e) => {
        setStuden1(e.target.value);
    };
    const onStudenChange2 = (e) => {
        setStuden2(e.target.value);
    };
    const onStudenChange3 = (e) => {
        setStuden3(e.target.value);
    };
    //-------------------------------> CheckGoup1
    const onCheckGoupChange1 = () => {
        setCheckGoup1(!checkGoup1);
    };
    const onCheckGoupChange2 = () => {
        setCheckGoup2(!checkGoup2);
    };
    const onCheckGoupChange3 = () => {
        setCheckGoup3(!checkGoup3);
    };
    const onCheckGoupChange4 = () => {
        setCheckGoup4(!checkGoup4);
    };
    const onCheckGoupChange5 = () => {
        setCheckGoup5(!checkGoup5);
    };
    const onCheckGoupChange6 = () => {
        setCheckGoup6(!checkGoup6);
    };
    //-------------------------------> RadioGoup
    const onRadioGoupChange = (e) => {
        setRadioGoup(e.target.value);
    };
    const onSave = async () => {
        alert("Save");

        // await addDoc(collection(db, `document_1/${auth.currentUser?.uid}`), {
        //     name1: name1,
        //     name2: name2,
        //     name3: name3,
        // });

        await setDoc(doc(db, "document_1", auth.currentUser?.uid), {
            name1,
            name2,
            name3,
            pass1,
            pass2,
            pass3,
            number1,
            number2,
            number3,
            project,
            teacher1,
            teacher2,
            studen1,
            studen2,
            studen3,
            checkGoup1,
            checkGoup2,
            checkGoup3,
            checkGoup4,
            checkGoup5,
            checkGoup6,
            radioGoup,
        });
    };
    return (
        <div>
            <Header />
            <div className="from">
                <div className="frame">
                    <div className="title"> กรอกเอกสาร ป.1</div>
                    <div className="formcheck">
                        <MDBCheckbox
                            name="flexCheck"
                            value={checkGoup1}
                            onChange={onCheckGoupChange1}
                            id="flexCheckDefault"
                            label="&nbsp;โยธา"
                        />
                        <MDBCheckbox
                            name="flexCheck"
                            value={checkGoup2}
                            onChange={onCheckGoupChange2}
                            id="flexCheckDefault"
                            label="&nbsp;อุสาหการ"
                        />
                        <MDBCheckbox
                            name="flexCheck"
                            value={checkGoup3}
                            onChange={onCheckGoupChange3}
                            id="flexCheckDefault"
                            label="&nbsp;สิ่งเเวดล้อม"
                        />
                        <MDBCheckbox
                            name="flexCheck"
                            value={checkGoup4}
                            onChange={onCheckGoupChange4}
                            id="flexCheckDefault"
                            label="&nbsp;คอมพิวเตอร์"
                        />
                        <MDBCheckbox
                            name="flexCheck"
                            value={checkGoup5}
                            onChange={onCheckGoupChange5}
                            id="flexCheckDefault"
                            label="&nbsp;พลังงาน"
                        />
                    </div>
                    <div className="input">
                        <label>1. ชื่อ-สกุล&nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            id="name1"
                            name="name1"
                            value={name1}
                            onChange={onNameChange1}
                        />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            id="pass1"
                            name="pass1"
                            value={pass1}
                            onChange={onPassChange1}
                        />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput
                            background
                            id="number1"
                            name="number1"
                            type="text"
                            value={number1}
                            onChange={onNumberChanger1}
                        />
                        &nbsp;
                    </div>
                    <div className="input">
                        <label>2. ชื่อ-สกุล&nbsp;</label>
                        <MDBInput
                            background
                            id="name2"
                            type="text"
                            value={name2}
                            onChange={onNameChange2}
                        />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput
                            background
                            id="pass2"
                            type="text"
                            value={pass2}
                            onChange={onPassChange2}
                        />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput
                            background
                            id="number2"
                            type="text"
                            value={number2}
                            onChange={onNumberChanger2}
                        />
                        &nbsp;
                    </div>
                    <div className="input">
                        <label>3. ชื่อ-สกุล&nbsp;</label>
                        <MDBInput
                            background
                            id="name3"
                            type="text"
                            value={name3}
                            onChange={onNameChange3}
                        />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput
                            background
                            id="pass3"
                            type="text"
                            value={pass3}
                            onChange={onPassChange3}
                        />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput
                            background
                            id="number3"
                            type="text"
                            value={number3}
                            onChange={onNumberChanger3}
                        />
                        &nbsp;
                    </div>

                    <div className="changeradio">
                        <label>4. ลงทะเบียนเรียน </label>
                        <MDBRadio
                            name="inlineRadio"
                            id="inlineRadio1"
                            value="group1"
                            label="กลุ่ม 1"
                            onChange={onRadioGoupChange}
                            inline
                        />
                        <MDBRadio
                            name="inlineRadio"
                            id="inlineRadio1"
                            value="group2"
                            label="กลุ่ม 2"
                            onChange={onRadioGoupChange}
                            inline
                        />
                        <MDBRadio
                            name="inlineRadio"
                            id="inlineRadio1"
                            value="group3"
                            label="กลุ่ม 3"
                            onChange={onRadioGoupChange}
                            inline
                        />
                        <MDBRadio
                            name="inlineRadio"
                            id="inlineRadio1"
                            value="group4"
                            label="กลุ่ม อื่นๆ................................................."
                            onChange={onRadioGoupChange}
                            inline
                        />
                        &nbsp;&nbsp;<label>Email-อาจารย์ที่ปรึกษา</label>{" "}
                        &nbsp;&nbsp;
                        <MDBInput background type="text3" id="Email" />
                    </div>

                    <div className="input">
                        <label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.
                            เสนอหัวข้อโครงงาน&nbsp;
                        </label>
                        <MDBInput
                            background
                            id="project"
                            type="text1"
                            value={project}
                            onChange={onProjectChange}
                        />
                        &nbsp; &nbsp;
                    </div>
                    <div className="input">
                        <label>&nbsp;6. อาจารย์ที่ปรึกษา</label>
                        <MDBCheckbox
                            name="teacher"
                            value={checkGoup6}
                            onChange={onCheckGoupChange6}
                            label="เเต่งตั้ง"
                            inline
                        />
                        <label>อาจารย์ที่ปรึกษา(หลัก)</label>
                        <MDBInput
                            background
                            type="text2"
                            id="teacher1"
                            value={teacher1}
                            onChange={onTeacherChange1}
                        />

                        <label>อาจารย์ที่ปรึกษา(ร่วม)</label>
                        <MDBInput
                            background
                            id="teacher2"
                            type="text2"
                            value={teacher2}
                            onChange={onTeacherChange2}
                        />
                    </div>
                    <label>
                        &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;7.
                        รับรองการเสนอหัวข้อโคงงานฯ
                        เเละการเเต่งตั้งอาจารย์ที่ปรึกษา
                    </label>
                    <div className="input">
                        <label>1. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            background
                            id="studen1"
                            type="text"
                            value={studen1}
                            onChange={onStudenChange1}
                        />
                        &nbsp;
                        <label>2. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            background
                            id="studen2"
                            type="text"
                            value={studen2}
                            onChange={onStudenChange2}
                        />
                        &nbsp;
                        <label>3. ลงชื่อนักศึกษา</label>
                        <MDBInput
                            background
                            id="studen3"
                            type="text"
                            value={studen3}
                            onChange={onStudenChange3}
                        />
                        &nbsp;
                    </div>
                    <div className="button">
                        {/* <Docx4
                            data={{
                                name1,
                                name2,
                                name3,
                                pass1,
                                pass2,
                                pass3,
                                number1,
                                number2,
                                number3,
                                project,
                                teacher1,
                                teacher2,
                                studen1,
                                studen2,
                                studen3,
                                checkGoup1,
                                checkGoup2,
                                checkGoup3,
                                checkGoup4,
                                checkGoup5,
                                checkGoup6,
                                radioGoup,
                            }}
                        /> */}
                        <div>
                            <Button
                                variant="success"
                                className="button-1"
                                onClick={onSave}
                            >
                                Save
                            </Button>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Docx1;
