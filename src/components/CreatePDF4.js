import { jsPDF } from "jspdf";
import React, { useState, useEffect } from "react";
import { THSarabunNewNormal } from "../assets/font/THSarabunNew-normal";
import { THSarabunNewBold } from "../assets/font/THSarabunNew Bold-normal";
import Button from "react-bootstrap/Button";

const CreatePDF4 = ({ docData, sigLink }) => {
    const [data, setData] = useState(docData);
    const [sigUrl, setSigUrl] = useState(sigLink);

    useEffect(() => {
        setData(docData);
        setSigUrl(sigLink);
    }, [docData]);

    const handdlePDF = () => {
        const doc = new jsPDF();
        var img = new Image();
        var img1 = new Image();
        img.src = require("../assets/images/ตราครุฑ3cm.png");
        // img1.src = require("./check.png");
        img1.src = require("../assets/images/check.png");
        img.onload = () => {
            doc.addFileToVFS("THSarabunNewNormal.ttf", THSarabunNewNormal);
            doc.addFont(
                "THSarabunNewNormal.ttf",
                "THSarabunNewNormal",
                "normal"
            );
            doc.setFont("THSarabunNewNormal");

            doc.addFileToVFS("THSarabunNewBold.ttf", THSarabunNewBold);
            doc.addFont("THSarabunNewBold.ttf", "THSarabunNewBold", "normal");
            // doc.setFont("MyFont1");

            let width = doc.internal.pageSize.getWidth();
            //---------------------------> input name
            doc.text(data.name1, 52, 100, {
                align: "left",
            });
            doc.text(data.name2, 52, 107, {
                align: "left",
            });
            doc.text(data.name3, 52, 114, {
                align: "left",
            });
            //---------------------------> input pass
            doc.text(data.pass1, 114, 100, {
                align: "left",
            });
            doc.text(data.pass2, 114, 107, {
                align: "left",
            });
            doc.text(data.pass3, 114, 114, {
                align: "left",
            });
            //---------------------------> input number
            doc.text(data.number1, 160, 100, {
                align: "left",
            });
            doc.text(data.number2, 160, 107, {
                align: "left",
            });
            doc.text(data.number3, 160, 114, {
                align: "left",
            });
            //---------------------------> input Project
            doc.text(data.major, 35, 86, {
                align: "left",
            });
            doc.text(data.project, 73, 86, {
                align: "left",
            });
            doc.text(data.money, 92, 128, {
                align: "left",
            });
            doc.text(data.money1, 123, 128, {
                align: "left",
            });
            // doc.text(data.teacher2, 95, 144, {
            //     align: "left",
            // });
            //---------------------------> input Studens
            // doc.text(data.student1, 65, 180, {
            //     align: "left",
            // });
            // doc.text(data.student1, 65, 187, {
            //     align: "left",
            // });
            // doc.text(data.student2, 135, 180, {
            //     align: "left",
            // });
            // doc.text(data.student2, 135, 187, {
            //     align: "left",
            // });
            // doc.text(data.student3, 105, 194, {
            //     align: "left",
            // });
            // doc.text(data.student3, 105, 201, {
            //     align: "left",
            // });

            doc.addImage(img, "png", 32, 28, 20, 20);
            ////////////////////////////////////////
            // if (data.checkGroup1) {
            //     doc.addImage(img1, "png", 67, 54, 5, 5);
            // }
            // if (data.checkGroup2) {
            //     doc.addImage(img1, "png", 84, 54, 5, 5);
            // }
            // if (data.checkGroup3) {
            //     doc.addImage(img1, "png", 107, 54, 5, 5);
            // }
            // if (data.checkGroup4) {
            //     doc.addImage(img1, "png", 134, 54, 5, 5);
            // }
            // if (data.checkGroup5) {
            //     doc.addImage(img1, "png", 162, 54, 5, 5);
            // }

            ////////////////////////////////////////
            // if (data.radioGoup === "group1") {
            //     doc.addImage(img1, "png", 75, 90.5, 5, 5);
            // } else if (data.radioGroup === "group2") {
            //     doc.addImage(img1, "png", 95, 90.5, 5, 5);
            // } else if (data.radioGroup === "group3") {
            //     doc.addImage(img1, "png", 114, 90.5, 5, 5);
            // } else if (data.radioGroup === "group4") {
            //     doc.addImage(img1, "png", 134, 90.5, 5, 5);
            // }

            ////////////////////////////////////////
            // if (data.checkGroup6) {
            //     doc.addImage(img1, "png", 88.5, 118.5, 5, 5);
            // }

            doc.text("วศ.1015.3", 185, 10);
            doc.text("(เเบบ ป.4)", 186, 17);

            doc.setFontSize(36);
            doc.setFont("THSarabunNewBold");
            doc.text("บันทึกข้อความ", width / 2, 40, {
                align: "center",
            });
            doc.setFontSize(16);
            doc.text("ส่วนราชการ", 30, 52, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text(
                ".............................................................................................................................................",
                51,
                52,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewBold");
            doc.text("ที่", 30, 59, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text(
                ".........................................................วันที่...............................................................................................",
                33,
                59,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewBold");
            doc.text("เรื่อง ", 30, 66, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text(
                "........................................................................................................................................................",
                40,
                66,
                {
                    align: "left",
                }
            );
            doc.text("เรียน   คณะบดีคณะวิศวกรรมสาสตร์", 30, 73, {
                align: "left",
            });
            doc.text(
                "ด้วยคณะกรรมการสอบปริญญานิพนธ์ได้พิจารณาปริญญานิพนะ์ของนักศึกษาสาขาวิศวกรรม",
                50,
                80,
                {
                    align: "left",
                }
            );
            doc.text(
                "...................................เรื่อง.........................................................................................................................",
                30,
                87,
                {
                    align: "left",
                }
            );
            doc.text("โดยมีผู้จัดทำปริญญานิพนธ์ ดังนี้", 30, 94, {
                align: "left",
            });

            doc.text(
                "๑) (ชื่อ-สกุล)............................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                30,
                101,
                {
                    align: "left",
                }
            );

            doc.text(
                "๒) (ชื่อ-สกุล)............................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                30,
                108,
                {
                    align: "left",
                }
            );

            doc.text(
                "๓) (ชื่อ-สกุล)............................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                30,
                115,
                {
                    align: "left",
                }
            );
            doc.text("ทั้งนั้น  ", 50, 122, {
                align: "left",
            });
            doc.setFont("THSarabunNewBold");
            doc.text("ได้เเนบหลักฐานสำเนาหน้าอนุมัติหน้าภาษาไทย", 60, 122, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text("เเละขออนุมัติค่าใช้จ่ายเหมาจ่ายใน", 133, 122, {
                align: "left",
            });
            doc.text(
                "การจัดทำปริญญานิพนธ์ เป็นจำนวนเงิน..........................บาท(..............................................)ให้เเก้นักศึกษา",
                30,
                129,
                {
                    align: "left",
                }
            );

            doc.text("จึงเรียนมาเพื่อฌปรดพิจารณาอนุมัติ", 50, 136, {
                align: "left",
            });
            doc.text(
                "ลงชื่อ...........................................................",
                100,
                180,
                {
                    align: "left",
                }
            );

            doc.text(
                "(...........................................................)",
                105,
                187,
                {
                    align: "left",
                }
            );
            doc.text("อาจารยืที่ปรึกษาโครงงาน ฯ", 112, 194, {
                align: "left",
            });

            doc.text(
                "ลงชื่อ...........................................................",
                100,
                215,
                {
                    align: "left",
                }
            );

            doc.text(
                "(...........................................................)",
                105,
                222,
                {
                    align: "left",
                }
            );
            doc.text("อาจารยืที่ปรึกษาโครงงาน ฯ", 112, 229, {
                align: "left",
            });

            doc.text("คณะวิศวกรรมศาสตร์                โทร ๘๕๗๐", 55, 51);
            doc.text("อว ๐๖๐๑.๑๐/", 36, 58);
            doc.text(
                "ขออนุมัติค่าใช้จ่ายเหมาจ่ายในการจัดทำโครงงานวิศวกรรม",
                43,
                65
            );

            doc.save("a4.pdf");
        };
    };
    return (
        <div>
            <button onClick={handdlePDF} class="button1 button2">
                Download
            </button>
        </div>
    );
};

export default CreatePDF4;
