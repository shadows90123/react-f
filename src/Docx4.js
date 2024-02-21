import { MDBInput } from "mdbreact";
import Button from "react-bootstrap/Button";
import HeaderStudent from "./components/HeaderStudent";

const Docx4 = () => {
    return (
        <div>
            <HeaderStudent />
            <div className="from">
                <div className="frame-3">
                    <div className="title"> กรอกเอกสาร ป.4</div>
                    <div className="input">
                        <label>1. ชื่อ-สกุล&nbsp;</label>
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
                        <label>2. ชื่อ-สกุล&nbsp;</label>
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
                        <label>3. ชื่อ-สกุล&nbsp;</label>
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
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.
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
                        <label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.สาขาวิชา
                        </label>
                        <MDBInput
                            name="fieldofstudy"
                            id="fieldofstudy"
                            type="text"
                            // value={formData.project}
                            // onChange={onFormDataChange}
                        />
                        &nbsp; &nbsp;
                        <label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.จำนวนเงิน
                        </label>
                        <MDBInput
                            name="money"
                            id="money"
                            type="text"
                            // value={formData.project}
                            // onChange={onFormDataChange}
                        />
                        <label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7.จำนวนเงินภาษาไทย
                        </label>
                        <MDBInput
                            name="money1"
                            id="money1"
                            type="text"
                            // value={formData.project}
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

export default Docx4;
