import HeaderStudent from "../../components/Student/Header";
import { MDBInput } from "mdbreact";
import { MDBCheckbox, MDBRadio } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";

const Docx2 = () => {
    return (
        <div>
            <HeaderStudent />
            <div className="from">
                <div className="frame-2">
                    <div className="title"> กรอกเอกสาร ป.2</div>
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

                    <div className="formcheck-1">
                        <label>1.บัดนี้ ได้ดำเนินการจัดทำโครงงานวิศวกรรม</label>
                        &nbsp;&nbsp;&nbsp;
                        <MDBCheckbox
                            name="checkGroup7"
                            // value={formData.checkGroup7}
                            // onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;&nbsp;โครงงานฯ 1"
                        />
                        &nbsp;&nbsp;&nbsp;
                        <MDBCheckbox
                            name="checkGroup8"
                            // value={formData.checkGroup8}
                            // onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;&nbsp;โครงงานฯ 2"
                        />
                        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <label>2.มีความประสงค์ขอสอบ</label>
                        &nbsp;&nbsp;&nbsp;
                        <MDBCheckbox
                            name="checkGroup13"
                            // value={formData.checkGroup13}
                            // onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;&nbsp;ความก้าวหน้า"
                        />
                        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <MDBCheckbox
                            name="checkGroup13"
                            // value={formData.checkGroup13}
                            // onChange={onFormDataChange}
                            id="flexCheckDefault"
                            label="&nbsp;&nbsp;ปริญญานิพนธ์ขั้นทุดท้าย"
                        />
                        &nbsp;&nbsp;&nbsp;
                    </div>
                    <div className="input">
                        <label>3. ชื่อ-สกุล&nbsp;</label>
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
                        <label>4. ชื่อ-สกุล&nbsp;</label>
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
                        <label>5. ชื่อ-สกุล&nbsp;</label>
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
                    <div className="input">
                        <label>7.ลงชื่อนักศึกษา</label>
                        <MDBInput
                            name="student1"
                            id="student1"
                            type="text"
                            // value={formData.student1}
                            // onChange={onFormDataChange}
                        />
                        &nbsp;<label>ภาคเรียนที่ &nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            id="sec"
                            name="sec"
                            // value={formData.name1}
                            // onChange={onFormDataChange}
                        />
                        &nbsp;<label>ปีการศึกษา &nbsp;</label>
                        <MDBInput
                            background
                            type="text"
                            id="year"
                            name="year"
                            // value={formData.name1}
                            // onChange={onFormDataChange}
                        />
                    </div>
                    <div className="button">
                        <div>
                            <Button
                                variant="success"
                                className="button-1"
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

export default Docx2;
