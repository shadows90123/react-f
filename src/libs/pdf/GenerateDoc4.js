import { jsPDF } from "jspdf";
import { THSarabunNewNormal } from "../../assets/font/THSarabunNew-normal";
import { THSarabunNewBold } from "../../assets/font/THSarabunNew Bold-normal";

export default function GenerateDoc({ imgData, data, fileName }) {
    const doc = new jsPDF();
    const universityImage = new Image();
    const checkImage = new Image();

    universityImage.src = require("../../assets/images/Ramkhamhaeng.png");
    checkImage.src = require("../../assets/images/check.png");

    universityImage.onload = () => {
        checkImage.onload = () => {
            doc.addFileToVFS("THSarabunNewNormal.ttf", THSarabunNewNormal);
            doc.addFont(
                "THSarabunNewNormal.ttf",
                "THSarabunNewNormal",
                "normal"
            );
            doc.setFont("THSarabunNewNormal");
            doc.addFileToVFS("THSarabunNewBold.ttf", THSarabunNewBold);
            doc.addFont("THSarabunNewBold.ttf", "THSarabunNewBold", "normal");

            let width = doc.internal.pageSize.getWidth();

            // ลายเซนอาจารย์
            if (imgData !== null) {
                doc.addImage(imgData, "JPEG", 120, 174, 50, 20);
                doc.addImage(imgData, "JPEG", 120, 181, 50, 20);
            }

            if (data["fullName1"]) {
                doc.text(data["fullName1"], 52, 100, {
                    align: "left",
                });
            }
            if (data["fullName2"]) {
                doc.text(data["fullName2"], 52, 107, {
                    align: "left",
                });
            }
            if (data["fullName3"]) {
                doc.text(data["fullName3"], 52, 114, {
                    align: "left",
                });
            }

            if (data["studentId1"]) {
                doc.text(data["studentId1"], 114, 100, {
                    align: "left",
                });
            }
            if (data["studentId2"]) {
                doc.text(data["studentId2"], 114, 107, {
                    align: "left",
                });
            }
            if (data["studentId3"]) {
                doc.text(data["studentId3"], 114, 114, {
                    align: "left",
                });
            }

            if (data["tel1"]) {
                doc.text(data["tel1"], 160, 100, {
                    align: "left",
                });
            }
            if (data["tel2"]) {
                doc.text(data["tel2"], 160, 107, {
                    align: "left",
                });
            }
            if (data["tel3"]) {
                doc.text(data["tel3"], 160, 114, {
                    align: "left",
                });
            }

            if (data["projectName"]) {
                doc.text(data["projectName"], 73, 86, {
                    align: "left",
                });
            }

            if (data["major"]) {
                doc.text(data["major"], 35, 86, {
                    align: "left",
                });
            }
            if (data["money"]) {
                doc.text(data["money"], 92, 128, {
                    align: "left",
                });
            }
            if (data["moneyText"]) {
                doc.text(data["moneyText"], 123, 128, {
                    align: "left",
                });
            }

            doc.addImage(universityImage, "png", 32, 28, 20, 20);

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

            doc.save(`${fileName}.pdf`);
        };
    };
}
