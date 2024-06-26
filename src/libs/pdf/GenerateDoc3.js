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
                doc.addImage(imgData, "JPEG", 88, 104, 50, 20);
            }

            if (data["fullName1"]) {
                doc.text(data["fullName1"], 48, 74, {
                    align: "left",
                });
            }
            if (data["fullName2"]) {
                doc.text(data["fullName2"], 48, 81, {
                    align: "left",
                });
            }
            if (data["fullName3"]) {
                doc.text(data["fullName3"], 48, 88, {
                    align: "left",
                });
            }

            if (data["studentId1"]) {
                doc.text(data["studentId1"], 109, 74, {
                    align: "left",
                });
            }
            if (data["studentId2"]) {
                doc.text(data["studentId2"], 109, 81, {
                    align: "left",
                });
            }
            if (data["studentId3"]) {
                doc.text(data["studentId3"], 109, 88, {
                    align: "left",
                });
            }

            if (data["tel1"]) {
                doc.text(data["tel1"], 152, 74, {
                    align: "left",
                });
            }
            if (data["tel2"]) {
                doc.text(data["tel2"], 152, 81, {
                    align: "left",
                });
            }
            if (data["tel3"]) {
                doc.text(data["tel3"], 152, 88, {
                    align: "left",
                });
            }

            if (data["projectName"]) {
                doc.text(data["projectName"], 55, 95, {
                    align: "left",
                });
            }

            doc.addImage(universityImage, "png", 95, 10, 25, 25);

            if (data["major1"]) {
                doc.addImage(checkImage, "png", 62, 54, 5, 5);
            }
            if (data["major2"]) {
                doc.addImage(checkImage, "png", 80, 54, 5, 5);
            }
            if (data["major3"]) {
                doc.addImage(checkImage, "png", 107, 54, 5, 5);
            }
            if (data["major4"]) {
                doc.addImage(checkImage, "png", 137, 54, 5, 5);
            }
            if (data["major5"]) {
                doc.addImage(checkImage, "png", 168, 54, 5, 5);
            }

            if (data["group"] === "group1") {
                doc.addImage(checkImage, "png", 54, 63, 5, 5);
            } else if (data["group"] === "group2") {
                doc.addImage(checkImage, "png", 82.5, 63, 5, 5);
            } else if (data["group"] === "group3") {
                doc.addImage(checkImage, "png", 112, 63, 5, 5);
            } else if (data["group"] === "group4") {
                doc.addImage(checkImage, "png", 139.5, 63, 5, 5);
            }

            doc.setFont("THSarabunNewBold");
            doc.text("(แบบ ป.3)", 185, 10);
            doc.setFont("THSarabunNewNormal");
            doc.setFontSize(20);
            doc.setFont("THSarabunNewBold");
            doc.text("แบบตรวจปริญญานิพนธ์ โครงงานวิศวกรรมฯ 2", width / 2, 45, {
                align: "center",
            });
            doc.text("คณะวิศวกรรมศาสตร์ มหาวิทยาลัยรามคําแหง", width / 2, 52, {
                align: "center",
            });
            doc.setFontSize(18);
            doc.text(
                "1. สาขาวิชาวิศวกรรม" +
                    "       โยธา       อุสาหการ       สิ่งเเวดล้อม       คอมพิวเตอร์       พลังงาน",
                width / 2,
                59,
                {
                    align: "center",
                }
            );
            doc.text(
                "2. ชื่อ-สกุล            กลุ่ม 1            กลุ่ม 2            กลุ่ม 3            อื่นๆ กลุ่ม.................",
                23,
                68,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewNormal");
            doc.setFontSize(14);
            doc.text(
                "1. (ชื่อ-สกุล)......................................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                30,
                75,
                {
                    align: "left",
                }
            );

            doc.text(
                "2. (ชื่อ-สกุล)......................................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                30,
                82,
                {
                    align: "left",
                }
            );

            doc.text(
                "3. (ชื่อ-สกุล)......................................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                30,
                89,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewBold");
            doc.text(
                "หัวข้อปริญญานิพนธ์..................................................................................................................................",
                23,
                96,
                {
                    align: "left",
                }
            );

            doc.text(
                "ตรวจสอบเนื้อหาวิชาการเรียบร้อยเเล้ว อนุญาตให้ตรวจรูปเล่มได้",
                70,
                103,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewNormal");

            doc.text(
                "ลงชื่อ....................................อาจารย์ที่ปรึกษา",
                75,
                110,
                {
                    align: "left",
                }
            );

            doc.text("ว/ด/ป ............/............./...........", 75, 117, {
                align: "left",
            });
            doc.setFontSize(20);
            doc.setFont("THSarabunNewBold");
            doc.text("3. สำหรับเจ้าหน้าที่งานบริการการศึกษา", 23, 128, {
                align: "left",
            });

            doc.setFontSize(14);
            doc.text("รายการที่ตรวจสอบและต้องแก้ไขให้ถูกต้อง", 23, 135, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text("รูปแบบปกนอก/ปกใน", 27, 142, {
                align: "left",
            });
            doc.text("ภาคผนวก", 95, 142, {
                align: "left",
            });
            doc.text("หน้าอนุมัติภาษาไทย/อังกฤษ", 27, 149, {
                align: "left",
            });
            doc.text("บรรณานุกรม", 95, 149, {
                align: "left",
            });
            doc.text("บทคัดย่อภาษาไทย/อังกฤษ", 27, 156, {
                align: "left",
            });
            doc.text("ประวัติผู้เขียน", 95, 156, {
                align: "left",
            });

            doc.text("กิตติกรรมประกาศ", 27, 163, {
                align: "left",
            });
            doc.text("การย่อหน้า / เว้นบรรทัด", 95, 163, {
                align: "left",
            });
            doc.text("สารบัญตาราง / รูป / กราฟ", 27, 170, {
                align: "left",
            });
            doc.text("การวางลำดับและการพิมพ์หัวข้อ", 95, 170, {
                align: "left",
            });
            doc.text("รูปแบบบทที่ 1 หัวข้อบท /หัวข้อรองของเนื้อหา", 27, 177, {
                align: "left",
            });
            doc.text("การเว้นระยะขอบกระดาษ บน ล่าง ซ้าย ขวา", 95, 177, {
                align: "left",
            });
            doc.text("รูปแบบบทที่ 2 หัวข้อบท /หัวข้อรองของเนื้อหา", 27, 184, {
                align: "left",
            });
            doc.text("หนังสือขออนุญาตเปิดเผยข้อมูลหน่วยงาน", 95, 184, {
                align: "left",
            });
            doc.text("รูปแบบบทที่ 3 หัวข้อบท /หัวข้อรองของเนื้อหา", 27, 191, {
                align: "left",
            });
            doc.text(
                "อื่น ๆ .......................................",
                95,
                191,
                {
                    align: "left",
                }
            );
            doc.text("รูปแบบบทที่ 4 หัวข้อบท /หัวข้อรองของเนื้อหา", 27, 198, {
                align: "left",
            });
            doc.text("รูปแบบบทที่ 5 หัวข้อบท /หัวข้อรองของเนื้อหา", 27, 205, {
                align: "left",
            });
            doc.setFont("THSarabunNewBold");
            doc.text("หมายเหตุ", 23, 212, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text(
                "นักศึกษาต้องส่งรูปเล่มฉบับสมบูรณ์(ปกแข็ง) ภายใน 15 วันนับจากวันสอบปลายภาควันสุดท้าย",
                29,
                217,
                {
                    align: "left",
                }
            );
            doc.text(
                "ของภาคเรียนนั้น ๆ หากพ้นกำหนดนักศึกษาต้องลงทะเบียนภาคถัดไป",
                29,
                222,
                {
                    align: "left",
                }
            );
            doc.setFont("THSarabunNewBold");
            doc.text("ตรวจสอบครั้งที่ 1", 160, 133, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text("เเก้ไข (ตามที่ระบุ)", 165, 139, {
                align: "left",
            });
            doc.text("เข้ารูปเล่มได้", 165, 144, {
                align: "left",
            });
            doc.text("ลงนาม.........................", 160, 149, {
                align: "left",
            });
            doc.text("........./........./.......", 165, 154, {
                align: "left",
            });
            doc.setFont("THSarabunNewBold");
            doc.text("ตรวจสอบครั้งที่ 2", 160, 160, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text("เเก้ไข (ตามที่ระบุ)", 165, 166, {
                align: "left",
            });
            doc.text("เข้ารูปเล่มได้", 165, 172, {
                align: "left",
            });
            doc.text("ลงนาม.........................", 160, 178, {
                align: "left",
            });
            doc.text("........./........./.......", 165, 184, {
                align: "left",
            });
            doc.setFont("THSarabunNewBold");
            doc.text("ตรวจสอบครั้งที่ 3", 160, 190, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text("เเก้ไข (ตามที่ระบุ)", 165, 196, {
                align: "left",
            });
            doc.text("เข้ารูปเล่มได้", 165, 202, {
                align: "left",
            });
            doc.text("ลงนาม.........................", 160, 208, {
                align: "left",
            });

            doc.text("........./........./.......", 165, 214, {
                align: "left",
            });
            doc.setFont("THSarabunNewBold");
            doc.text("เรียน ประธานกรรมการสอบปริญญานิพนธ์", 27, 233, {
                align: "left",
            });
            doc.text("เห็นควรพิจารณาให้เข้ารูปเล่มได้", 34, 239, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text(
                "ลงนาม...........................................",
                27,
                255,
                {
                    align: "left",
                }
            );
            doc.text(".............../............../..............", 30, 261, {
                align: "left",
            });

            doc.setFont("THSarabunNewBold");
            doc.text("เรียน ประธานกรรมการสอบปริญญานิพนธ์", 105, 233, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text(
                "ลงนาม...........................................(ประธานกรรมการสอบปริญญานิพนธ์)",
                105,
                255,
                {
                    align: "left",
                }
            );
            doc.text(
                ".............../............../..............",
                108,
                261,
                {
                    align: "left",
                }
            );

            doc.setFont("THSarabunNewBold");
            doc.text("หมายเหตุ", 23, 274, {
                align: "left",
            });
            doc.setFont("THSarabunNewNormal");
            doc.text(
                "1.กรณีที่ประธานกรรมการสอบฯ อนุญาตให้เข้าเล่มได้ให้นักศึกษาปริ้นท์เล่มโครงงานฉบับสมบรูณ์ด้วยกระดาษ A4 คุณภาพ",
                37,
                274,
                {
                    align: "left",
                }
            );
            doc.text(
                "80 แกรม จำนวน 1 เล่ม เพื่อติดต่อเข้าเล่มปกเเข็งที่งานสวัสดิการคณะฯ ต่อไป",
                39.5,
                280,
                {
                    align: "left",
                }
            );
            doc.text(
                "2. กรณีเข้าเล่มปกเเข็งเรียบร้อยเเล้ว ให้นักศึกษาส่งเล่มปกแข้ง จำนวน 2 เล่ม พร้อมแผ่น CD บันทึกข้อมูล จำนวน 2 แผ่น",
                37,
                286,
                {
                    align: "left",
                }
            );
            doc.text("ที่ธรุการสาขาวิชา", 39.5, 292, {
                align: "left",
            });

            doc.rect(62, 55, 4, 4);
            doc.rect(80, 55, 4, 4);
            doc.rect(107, 55, 4, 4);
            doc.rect(137, 55, 4, 4);
            doc.rect(168, 55, 4, 4);
            doc.rect(158, 127, 40, 89);
            doc.rect(20, 229, 80, 35);
            doc.rect(100, 229, 100, 35);

            doc.circle(55, 66, 2, "D");
            doc.circle(84, 66, 2, "D");
            doc.circle(113, 66, 2, "D");
            doc.circle(141, 66, 2, "D");

            doc.circle(24, 141, 2, "D");
            doc.circle(24, 148, 2, "D");
            doc.circle(24, 155, 2, "D");
            doc.circle(24, 162, 2, "D");
            doc.circle(24, 169, 2, "D");
            doc.circle(24, 176, 2, "D");
            doc.circle(24, 183, 2, "D");
            doc.circle(24, 190, 2, "D");
            doc.circle(24, 197, 2, "D");
            doc.circle(24, 204, 2, "D");

            doc.circle(92, 141, 2, "D");
            doc.circle(92, 148, 2, "D");
            doc.circle(92, 155, 2, "D");
            doc.circle(92, 162, 2, "D");
            doc.circle(92, 169, 2, "D");
            doc.circle(92, 176, 2, "D");
            doc.circle(92, 183, 2, "D");
            doc.circle(92, 190, 2, "D");

            doc.circle(162, 138, 2, "D");
            doc.circle(162, 143, 2, "D");

            doc.circle(162, 165, 2, "D");
            doc.circle(162, 171, 2, "D");

            doc.circle(162, 194, 2, "D");
            doc.circle(162, 201, 2, "D");

            doc.setLineWidth(0.5);
            doc.line(20, 121, 200, 121);
            doc.line(20, 226, 200, 226);
            doc.line(20, 267, 200, 267);

            doc.save(`${fileName}.pdf`);
        };
    };
}
