import { MDBInput } from "mdbreact";
import { MDBCheckbox, MDBRadio } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import HeaderStudent from "../../components/Student/Header";
import "./Docx1.css";

const Docx3 = () => {
    return (
        <div>
            <HeaderStudent />
            <div className="from">
                <div className="frame-1">
                    <div className="title"> กรอกเอกสาร ป.3</div>
                    <div className="formcheck">
                        <MDBCheckbox
                            name="checkGroup1"
                            // value={formData.checkGroup1}
                            // onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;โยธา"
                        />
                        <MDBCheckbox
                            name="checkGroup2"
                            // value={formData.checkGroup2}
                            // onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;อุสาหการ"
                        />
                        <MDBCheckbox
                            name="checkGroup3"
                            // value={formData.checkGroup3}
                            // onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;สิ่งเเวดล้อม"
                        />
                        <MDBCheckbox
                            name="checkGroup4"
                            // value={formData.checkGroup4}
                            // onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;คอมพิวเตอร์"
                        />
                        <MDBCheckbox
                            name="checkGroup5"
                            // value={formData.checkGroup5}
                            // onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;พลังงาน"
                        />
                    </div>

                    <div className="changeradio-1">
                        <label>1. ลงทะเบียนเรียน </label>
                        <MDBRadio
                            name="radioGroup"
                            value="group1"
                            label="กลุ่ม 1"
                            // onChange={onFormDataChange}
                            inline
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group2"
                            label="กลุ่ม 2"
                            // onChange={onFormDataChange}
                            inline
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group3"
                            label="กลุ่ม 3"
                            // onChange={onFormDataChange}
                            inline
                        />
                        <MDBRadio
                            name="radioGroup"
                            value="group4"
                            label="กลุ่ม อื่นๆ................................................."
                            // onChange={onFormDataChange}
                            inline
                        />
                    </div>
                    <div className="input">
                        <label>2. ชื่อ-สกุล&nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            id="name1"
                            name="name1"
                            // value={formData.name1}
                            // onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            id="pass1"
                            name="pass1"
                            // value={formData.pass1}
                            // onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput
                            background
                            id="number1"
                            name="number1"
                            type="text"
                            // value={formData.number1}
                            // onChange={onFormDataChange}
                        />
                        &nbsp;
                    </div>
                    <div className="input">
                        <label>3. ชื่อ-สกุล&nbsp;</label>
                        <MDBInput
                            name="name2"
                            id="name2"
                            type="text"
                            // value={formData.name2}
                            // onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput
                            name="pass2"
                            id="pass2"
                            type="text"
                            // value={formData.pass2}
                            // onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput
                            name="number2"
                            id="number2"
                            type="text"
                            // value={formData.number2}
                            // onChange={onFormDataChange}
                        />
                        &nbsp;
                    </div>
                    <div className="input">
                        <label>4. ชื่อ-สกุล&nbsp;</label>
                        <MDBInput
                            name="name3"
                            id="name3"
                            type="text"
                            // value={formData.name3}
                            // onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>รหัสนักศึกษา&nbsp;</label>
                        <MDBInput
                            name="pass3"
                            id="pass3"
                            type="text"
                            // value={formData.pass3}
                            // onChange={onFormDataChange}
                        />
                        &nbsp;
                        <label>เบอร์โทรติดต่อ&nbsp;</label>
                        <MDBInput
                            name="number3"
                            id="number3"
                            type="text"
                            // value={formData.number3}
                            // onChange={onFormDataChange}
                        />
                        &nbsp;
                    </div>

                    <div className="input">
                        <label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.
                            เสนอหัวข้อโครงงาน&nbsp;
                        </label>
                        <MDBInput
                            name="project"
                            id="project"
                            type="text1"
                            // value={formData.project}
                            // onChange={onFormDataChange}
                        />
                        &nbsp; &nbsp;
                    </div>

                    <div className="button">
                        <div>
                            <Button
                                variant="success"
                                className="button-2"
                                // onClick={onSave}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Docx3;
