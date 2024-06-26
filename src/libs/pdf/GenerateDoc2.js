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
                doc.addImage(imgData, "JPEG", 95, 144, 50, 20);
                doc.addImage(imgData, "JPEG", 95, 151, 50, 20);
            }

            if (data["term"]) {
                doc.text(data["term"], 95, 51, {
                    align: "left",
                });
            }

            if (data["year"]) {
                doc.text(data["year"], 125, 51, {
                    align: "left",
                });
            }

            if (data["fullName1"]) {
                doc.text(data["fullName1"], 42, 102, {
                    align: "left",
                });
            }

            if (data["fullName2"]) {
                doc.text(data["fullName2"], 42, 109, {
                    align: "left",
                });
            }

            if (data["fullName3"]) {
                doc.text(data["fullName3"], 42, 116, {
                    align: "left",
                });
            }

            if (data["studentId1"]) {
                doc.text(data["studentId1"], 101, 102, {
                    align: "left",
                });
            }
            if (data["studentId2"]) {
                doc.text(data["studentId2"], 101, 109, {
                    align: "left",
                });
            }
            if (data["studentId3"]) {
                doc.text(data["studentId3"], 101, 116, {
                    align: "left",
                });
            }

            if (data["tel1"]) {
                doc.text(data["tel1"], 144, 102, {
                    align: "left",
                });
            }
            if (data["tel2"]) {
                doc.text(data["tel2"], 144, 109, {
                    align: "left",
                });
            }
            if (data["tel3"]) {
                doc.text(data["tel3"], 144, 116, {
                    align: "left",
                });
            }

            if (data["projectName"]) {
                doc.text(data["projectName"], 65, 81, {
                    align: "left",
                });
            }

            if (data["studentSign"]) {
                doc.text(data["studentSign"], 80, 134, {
                    align: "left",
                });
            }
            if (data["studentSign"]) {
                doc.text(data["studentSign"], 80, 141, {
                    align: "left",
                });
            }

            doc.addImage(universityImage, "png", 95, 10, 25, 25);

            if (data["major1"]) {
                doc.addImage(checkImage, "png", 61, 54, 5, 5);
            }
            if (data["major2"]) {
                doc.addImage(checkImage, "png", 79, 54, 5, 5);
            }
            if (data["major3"]) {
                doc.addImage(checkImage, "png", 106, 54, 5, 5);
            }
            if (data["major4"]) {
                doc.addImage(checkImage, "png", 135, 54, 5, 5);
            }
            if (data["major5"]) {
                doc.addImage(checkImage, "png", 167, 54, 5, 5);
            }

            if (data["project"] === "1") {
                doc.addImage(checkImage, "png", 96, 70, 5, 5);
            }
            if (data["project"] === "2") {
                doc.addImage(checkImage, "png", 129, 70, 5, 5);
            }

            if (data["purpose"] === "progress") {
                doc.addImage(checkImage, "png", 85, 119, 5, 5);
            }
            if (data["purpose"] === "final") {
                doc.addImage(checkImage, "png", 114, 119, 5, 5);
            }

            doc.setFont("THSarabunNewBold");
            doc.text("(แบบ ป.2)", 185, 10);
            doc.setFont("THSarabunNewNormal");
            doc.setFontSize(20);
            doc.setFont("THSarabunNewBold");
            doc.text("แบบขอยื่นสอบโครงงานวิสวกรรม", width / 2, 45, {
                align: "center",
            });

            doc.setFontSize(18);
            doc.text(
                "ภาคเรียนที่.......ปีการศึกษา...............",
                width / 2,
                52,
                {
                    align: "center",
                }
            );
            doc.text(
                "สาขาวิชาวิศวกรรม" +
                    "       โยธา       อุสาหการ       สิ่งเเวดล้อม       คอมพิวเตอร์       พลังงาน",
                width / 2,
                59,
                {
                    align: "center",
                }
            );
            doc.setFont("THSarabunNewNormal");
            doc.setFontSize(14);
            doc.text("เรียน ประธานสาขาวิชา / อาจารย์ผู้ได้รับมอบหมาย", 23, 68, {
                align: "left",
            });
            doc.text(
                "บัดนี้ ได้ดำเนินการจัดทำโครงงานวิศวกรรม               (โครงงานฯ 1)               (โครงงานฯ 2)",
                30,
                75,
                {
                    align: "left",
                }
            );
            doc.text(
                "3. เสนอหัวข้อโครงงาน..................................................................................................................................",
                30,
                82,
                {
                    align: "left",
                }
            );
            doc.text(
                ".......................................................................................................................................................................",
                30,
                89,
                {
                    align: "left",
                }
            );
            doc.text("โดยมีรายชื่อ นักศึกษาโครงงาน ดังนี้", 23, 96, {
                align: "left",
            });
            doc.text(
                "1. (ชื่อ-สกุล)......................................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                23,
                103,
                {
                    align: "left",
                }
            );

            doc.text(
                "2. (ชื่อ-สกุล)......................................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                23,
                110,
                {
                    align: "left",
                }
            );

            doc.text(
                "3. (ชื่อ-สกุล)......................................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                23,
                117,
                {
                    align: "left",
                }
            );
            doc.text(
                "จึงเรียนมาเพื่อยื่นความประสงค์ขอสอบ          ความก้าวหน้า          ปริญญานิพนธ์ขั้นสุดท้าย",
                30,
                124,
                {
                    align: "left",
                }
            );
            doc.text(
                "ลงชื่อ.............................................................นักศึกษา",
                70,
                135,
                {
                    align: "left",
                }
            );
            doc.text(
                "(.............................................................)",
                75,
                142,
                {
                    align: "left",
                }
            );
            doc.text(
                "ลงชื่อ.............................................................(อาจารย์ที่ปรึกษา)",
                70,
                149,
                {
                    align: "left",
                }
            );
            doc.text(
                "(.............................................................)",
                75,
                156,
                {
                    align: "left",
                }
            );
            doc.text(
                "(ว/ด/ป.............................................................)",
                70,
                163,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewBold");
            doc.text("สรุปผลการสอบ", 27, 217, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text(
                "ความก้าวหน้า                              ผ่าน       ไม่ผ่าน เนื่องจาก................................................",
                27,
                224,
                {
                    align: "left",
                }
            );
            doc.text(
                "ปริญญานิพนธ์ขั้นสุดท้าย                 ผ่าน       ไม่ผ่าน เนื่องจาก................................................",
                27,
                231,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewBold");
            doc.text("สําหรับเจ้าหน้าที่สาขาวิชาฯ", 22, 180, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text("ได้ตรวจสอบข้อมูลข้างต้นถูกต้องเเล้ว", 22, 187, {
                align: "left",
            });
            doc.text("ลงชื่อ....................................", 22, 194, {
                align: "left",
            });
            doc.text("ว/ด/ป....................................", 24, 200, {
                align: "left",
            });
            doc.setFont("THSarabunNewBold");
            doc.text(
                "สําหรับประธานสาขาวิชาฯ / อาจารย์ผู้ได้รับมอบหมาย",
                115,
                180,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewNormal");
            doc.text("อนุญาตให้นักศึกษาสอบ", 119, 187, {
                align: "left",
            });
            doc.text("ลงชื่อ....................................", 126, 194, {
                align: "left",
            });
            doc.text("ว/ด/ป....................................", 129, 200, {
                align: "left",
            });
            doc.text(
                "ลงชื่อ.................................... ประธานสาขาวิชาฯ/อาจารย์ได้รับมอบหมาย",
                80,
                238,
                {
                    align: "left",
                }
            );
            doc.text("ว/ด/ป....................................", 80, 245, {
                align: "left",
            });
            doc.setFont("THSarabunNewBold");
            doc.text("หมายเหตุ ", 21, 255, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text(
                "ทั้งนี้ขั้นตอนการส่งบทเนื้อหาในการนำเสนอสอบ ให้นักศึกษาติดตามประกาศปฏิทินการสอบโครงงานน ของเเต่ละสาขาอีกครั้ง",
                35,
                255,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewBold");
            doc.text("โครงงาน 1 ", 21, 262, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.setFont("THSarabunNewBold");
            doc.text("1. สอบความก้าวหน้าโครงงานฯ ", 21, 269, {
                align: "left",
            });
            doc.setFont("THSarabunNewBold");
            doc.text("2. สอบปริญญานิพนธ์ขั้นตอนทุดท้าย ", 21, 274, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text(
                "*นักศึกษากรอก ป.2 พร้อมเนื้อบทที่ 1 ในการนำเสนอต่อกรรมการสอบ",
                70,
                269,
                {
                    align: "left",
                }
            );
            doc.text(
                "*นักศึกษากรอก ป.2 พร้อมเนื้อบทที่ 1,2 เเละ 3 ในการนำเสนอต่อกรรมการสอบ",
                70,
                274,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewBold");
            doc.text("โครงงาน 2 ", 21, 281, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.setFont("THSarabunNewBold");
            doc.text("1. สอบความก้าวหน้าโครงงานฯ ", 21, 286, {
                align: "left",
            });
            doc.setFont("THSarabunNewBold");
            doc.text("2. สอบปริญญานิพนธ์ขั้นตอนทุดท้าย ", 21, 291, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text(
                "*นักศึกษากรอก ป.2 พร้อมเนื้อบทที่ 1,2, เเละ 3 ในการนำเสนอต่อกรรมการสอบ",
                70,
                286,
                {
                    align: "left",
                }
            );
            doc.text(
                "*นักศึกษากรอก ป.2 พร้อมเนื้อบทที่ 1,2,3,4 เเละ 5 ในการนำเสนอต่อกรรมการสอบ",
                70,
                291,
                {
                    align: "left",
                }
            );

            doc.line(20, 170, 200, 170);
            doc.line(20, 210, 200, 210);

            doc.rect(20, 175, 90, 30);
            doc.rect(110, 175, 90, 30);

            doc.rect(61, 55, 4, 4);
            doc.rect(79, 55, 4, 4);
            doc.rect(106, 55, 4, 4);
            doc.rect(135, 55, 4, 4);
            doc.rect(167, 55, 4, 4);
            doc.rect(96, 71.5, 4, 4);
            doc.rect(129, 71.5, 4, 4);
            doc.rect(85, 120, 4, 4);
            doc.rect(114, 120, 4, 4);
            doc.rect(72, 220, 4, 4);
            doc.rect(72, 227, 4, 4);
            doc.rect(85, 220, 4, 4);
            doc.rect(85, 227, 4, 4);
            doc.rect(20, 250, 177, 43);

            doc.setLineDash([1, 1, 1, 1], 1);
            doc.setLineWidth(0.5);
            doc.line(23, 62, 190, 62);

            doc.save(`${fileName}.pdf`);
        };
    };
}
