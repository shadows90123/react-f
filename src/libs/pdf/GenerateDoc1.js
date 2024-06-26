import { jsPDF } from "jspdf";
import { THSarabunNewNormal } from "../../assets/font/THSarabunNew-normal";
import { THSarabunNewBold } from "../../assets/font/THSarabunNew Bold-normal";

export default function createPDF({ imgData, data, fileName }) {
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
                doc.addImage(imgData, "JPEG", 63, 210, 50, 20);
                doc.addImage(imgData, "JPEG", 63, 218, 50, 20);
            }

            //---------------------------> input name
            if (data["fullName1"]) {
                doc.text(data["fullName1"], 62, 74, {
                    align: "left",
                });
            }
            if (data["fullName2"]) {
                doc.text(data["fullName2"], 62, 81, {
                    align: "left",
                });
            }
            if (data["fullName3"]) {
                doc.text(data["fullName3"], 62, 88, {
                    align: "left",
                });
            }

            //---------------------------> input pass
            if (data["studentId1"]) {
                doc.text(data["studentId1"], 127, 74, {
                    align: "left",
                });
            }
            if (data["studentId2"]) {
                doc.text(data["studentId2"], 127, 81, {
                    align: "left",
                });
            }
            if (data["studentId3"]) {
                doc.text(data["studentId3"], 127, 88, {
                    align: "left",
                });
            }

            //---------------------------> input number
            if (data["tel1"]) {
                doc.text(data["tel1"], 175, 74, {
                    align: "left",
                });
            }
            if (data["tel2"]) {
                doc.text(data["tel2"], 175, 81, {
                    align: "left",
                });
            }
            if (data["tel3"]) {
                doc.text(data["tel3"], 175, 88, {
                    align: "left",
                });
            }

            //---------------------------> input Project
            if (data["projectName"]) {
                doc.text(data["projectName"], 70, 102, {
                    align: "left",
                });
            }
            if (data["teacherMain"]) {
                doc.text(data["teacherMain"], 95, 137, {
                    align: "left",
                });
            }
            if (data["teacherCo"]) {
                doc.text(data["teacherCo"], 95, 144, {
                    align: "left",
                });
            }

            //---------------------------> input Studens
            if (data["studentSign1"]) {
                doc.text(data["studentSign1"], 65, 180, {
                    align: "left",
                });
            }
            if (data["studentSign1"]) {
                doc.text(data["studentSign1"], 65, 187, {
                    align: "left",
                });
            }
            if (data["studentSign2"]) {
                doc.text(data["studentSign2"], 135, 180, {
                    align: "left",
                });
            }
            if (data["studentSign2"]) {
                doc.text(data["studentSign2"], 135, 187, {
                    align: "left",
                });
            }
            if (data["studentSign3"]) {
                doc.text(data["studentSign3"], 105, 194, {
                    align: "left",
                });
            }
            if (data["studentSign3"]) {
                doc.text(data["studentSign3"], 105, 201, {
                    align: "left",
                });
            }

            doc.addImage(universityImage, "png", 95, 10, 25, 25);
            ////////////////////////////////////////
            if (data["major1"]) {
                doc.addImage(checkImage, "png", 67, 54, 5, 5);
            }
            if (data["major2"]) {
                doc.addImage(checkImage, "png", 84, 54, 5, 5);
            }
            if (data["major3"]) {
                doc.addImage(checkImage, "png", 107, 54, 5, 5);
            }
            if (data["major4"]) {
                doc.addImage(checkImage, "png", 134, 54, 5, 5);
            }
            if (data["major5"]) {
                doc.addImage(checkImage, "png", 162, 54, 5, 5);
            }

            ////////////////////////////////////////
            if (data["group"] === "group1") {
                doc.addImage(checkImage, "png", 75, 90.5, 5, 5);
            } else if (data["group"] === "group2") {
                doc.addImage(checkImage, "png", 95, 90.5, 5, 5);
            } else if (data["group"] === "group3") {
                doc.addImage(checkImage, "png", 114, 90.5, 5, 5);
            } else if (data["group"] === "group4") {
                doc.addImage(checkImage, "png", 134, 90.5, 5, 5);
            }

            ////////////////////////////////////////
            if (data["appoint"]) {
                doc.addImage(checkImage, "png", 88.5, 118.5, 5, 5);
            }

            doc.setFont("THSarabunNewBold");
            doc.text("(แบบ ป.1)", 185, 10);
            doc.setFont("THSarabunNewNormal");

            doc.setFont("THSarabunNewBold");
            doc.text(
                "คำร้องขอเเต่งตั้งเสนอหัวข้อโครงงาน / เเต่งตั้งอาจารย์ที่ปรึกษา",
                width / 2,
                45,
                { align: "center" }
            );
            doc.text("คณะวิศวกรรมศาสตร์ มหาวิทยาลัยรามคำเเหง", width / 2, 52, {
                align: "center",
            });
            doc.text(
                "1. สาขาวิชาวิศวกรรม" +
                    "       โยธา       อุสาหการ       สิ่งเเวดล้อม       คอมพิวเตอร์       พลังงาน",
                width / 2,
                59,
                {
                    align: "center",
                }
            );
            doc.text("2. รายชื่อนักศึกษาจัดทำโครงงานฯ", 82.5, 66, {
                align: "right",
            });
            doc.setFont("THSarabunNewNormal");

            doc.text(
                "2.1 (ชื่อ-สกุล)......................................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                35,
                75,
                {
                    align: "left",
                }
            );

            doc.text(
                "2.2 (ชื่อ-สกุล)......................................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                35,
                82,
                {
                    align: "left",
                }
            );

            doc.text(
                "2.3 (ชื่อ-สกุล)......................................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                35,
                89,
                {
                    align: "left",
                }
            );
            doc.text(
                "ลงทะเบียนเรียน       กลุ่ม 1        กลุ่ม 2        กลุ่ม 3        อื่นๆกลุ่ม...............................................",
                48,
                96,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewBold");
            doc.text(
                "3. เสนอหัวข้อโครงงาน.......................................................................................................................................",
                196,
                103,
                {
                    align: "right",
                }
            );
            doc.text(
                "............................................................................................................................................................................",
                196,
                110,
                {
                    align: "right",
                }
            );

            doc.text("4. อาจารย์ที่ปรึกษา", 60, 117, {
                align: "right",
            });
            doc.setFont("THSarabunNewBold");
            doc.text("4.1 มีความประสงค์              เเต่งตั้ง", 48, 124, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text("ชื่อ-สกุลอาจารย์ พร้อมระบุตำเเหน่งวิชาการ", 48, 131, {
                align: "left",
            });
            doc.text(
                "อาจารย์ที่ปรึกษา(หลัก)...........................................................................................",
                58,
                138,
                {
                    align: "left",
                }
            );
            doc.text(
                "อาจารย์ที่ปรึกษา(ร่วม)............................................................................................",
                58,
                145,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewBold");
            doc.text(
                "4.2 มีความประสงค์ (ถ้ามี)          เปลี่ยนแปลง อาจารย์ที่ปรึกษาเป็น",
                48,
                153,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewNormal");
            doc.text(
                "อาจารย์ที่ปรึกษา(หลัก)...........................................................................................",
                58,
                160,
                {
                    align: "left",
                }
            );
            doc.text(
                "อาจารย์ที่ปรึกษา(ร่วม)............................................................................................",
                58,
                167,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewBold");
            doc.text(
                "5. รับรองการเสนอหัวข้อโคงงานฯ เเละการเเต่งตั้งอาจารย์ที่ปรึกษา",
                131,
                174,
                {
                    align: "right",
                }
            );
            doc.setFont("THSarabunNewNormal");
            doc.text(
                "ลงชื่อนักศึกษา...................................................",
                40,
                181,
                {
                    align: "left",
                }
            );
            doc.text(
                "(...................................................)",
                60,
                188,
                {
                    align: "left",
                }
            );
            doc.text(
                "ลงชื่อนักศึกษา...................................................",
                110,
                181,
                {
                    align: "left",
                }
            );
            doc.text(
                "(...................................................)",
                130,
                188,
                {
                    align: "left",
                }
            );
            doc.text(
                "ลงชื่อนักศึกษา...................................................",
                80,
                195,
                {
                    align: "left",
                }
            );
            doc.text(
                "(...................................................)",
                100,
                202,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewBold");
            doc.text(
                "6. สำหรับอาจารย์ที่ปรึกษา (รับรองรองการเป็นที่ปรึกษา)",
                117,
                209,
                {
                    align: "right",
                }
            );
            doc.setFont("THSarabunNewNormal");
            doc.text(
                "ลงชื่อ......................................อาจารย์ที่ปรึกษา",
                110,
                216,
                {
                    align: "right",
                }
            );
            doc.text("(......................................)", 90, 223, {
                align: "right",
            });
            doc.text("(ว/ด/ป....................................)", 90, 230, {
                align: "right",
            });

            doc.text(
                "ลงชื่อ......................................อาจารย์ที่ปรึกษา",
                180,
                216,
                {
                    align: "right",
                }
            );
            doc.text("(......................................)", 160, 223, {
                align: "right",
            });
            doc.text("(ว/ด/ป....................................)", 160, 230, {
                align: "right",
            });
            doc.setFontSize(10);
            doc.text(
                "**ให้นักศึกษากรอกข้อมูลเอกสาร ข้อ 1-5 ให้เรียบร้อย เเละให้อาจารย์ที่ปรึกษาลงนามข้อ 6 พร้อมส่งธุรการสาขาวิชา เพื่อดำเนินการขอสอบต่อไป**",
                width / 2,
                237,

                {
                    align: "center",
                }
            );
            doc.setFont("THSarabunNewBold");
            doc.setFontSize(18);
            doc.text("7. สำหรับเจ้าหน้าที่", 64, 252, {
                align: "right",
            });
            doc.text("8. สำหรับประธานสาขาฯ", 155, 252, {
                align: "right",
            });
            doc.setFont("THSarabunNewNormal");
            doc.setFontSize(14);
            doc.text("เรียน ประธานสาขาฯ", 62, 265, {
                align: "right",
            });
            doc.text("ได้ตรวจสอบข้อมูลข้างต้นถูกต้องเรียบร้อยเเล้ว", 97, 272, {
                align: "right",
            });
            doc.text("ลงชื่อ......................................", 83, 279, {
                align: "right",
            });
            doc.text("ว/ด/ป.............................", 79, 286, {
                align: "right",
            });
            doc.text("รับทราบ", 135, 265, {
                align: "right",
            });
            doc.text(
                "ลงชื่อ................................................",
                165,
                272,
                {
                    align: "right",
                }
            );
            doc.text(
                "(................................................)",
                165,
                279,
                {
                    align: "right",
                }
            );
            doc.text("ว/ด/ป.......................................", 165, 286, {
                align: "right",
            });

            doc.line(30, 238, 175, 238);
            doc.rect(30, 260, 70, 30);
            doc.rect(110, 260, 70, 30);
            doc.rect(67, 55, 4, 4);
            doc.rect(84, 55, 4, 4);
            doc.rect(107, 55, 4, 4);
            doc.rect(134, 55, 4, 4);
            doc.rect(162, 55, 4, 4);
            doc.circle(76, 94, 2, "D");
            doc.circle(96, 94, 2, "D");
            doc.circle(115, 94, 2, "D");
            doc.circle(135, 94, 2, "D");
            doc.circle(90, 122, 2, "D");
            doc.circle(95, 151, 2, "D");

            doc.save(`${fileName}.pdf`);
        };
    };
}
