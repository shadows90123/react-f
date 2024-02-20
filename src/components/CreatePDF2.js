import { jsPDF } from "jspdf";
import { THSarabunNewNormal } from "../assets/font/THSarabunNew-normal";
import { THSarabunNewBold } from "../assets/font/THSarabunNew Bold-normal";
import Button from "react-bootstrap/Button";

const CreatePDF2 = () => {
    const handdlePDF = () => {
        const doc = new jsPDF();
        var img = new Image();
        var img1 = new Image();
        img.src = require("../assets/images/Ramkhamhaeng.png");
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
            // doc.text(data.name1, 62, 74, {
            //     align: "left",
            // });
            // doc.text(data.name2, 62, 81, {
            //     align: "left",
            // });
            // doc.text(data.name3, 62, 88, {
            //     align: "left",
            // });
            //---------------------------> input pass
            // doc.text(data.pass1, 127, 74, {
            //     align: "left",
            // });
            // doc.text(data.pass2, 127, 81, {
            //     align: "left",
            // });
            // doc.text(data.pass3, 127, 88, {
            //     align: "left",
            // });
            //---------------------------> input number
            // doc.text(data.number1, 175, 74, {
            //     align: "left",
            // });
            // doc.text(data.number2, 175, 81, {
            //     align: "left",
            // });
            // doc.text(data.number3, 175, 88, {
            //     align: "left",
            // });
            //---------------------------> input Project
            // doc.text(data.project, 70, 102, {
            //     align: "left",
            // });
            // doc.text(data.teacher1, 95, 137, {
            //     align: "left",
            // });
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

            doc.addImage(img, "png", 95, 10, 25, 25);
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
                "2.1 (ชื่อ-สกุล)......................................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                23,
                103,
                {
                    align: "left",
                }
            );

            doc.text(
                "2.2 (ชื่อ-สกุล)......................................................" +
                    "รหัสประจำตัว.............................." +
                    "เบอร์โทรติดต่อ......................",
                23,
                110,
                {
                    align: "left",
                }
            );

            doc.text(
                "2.3 (ชื่อ-สกุล)......................................................" +
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

            doc.save("a4.pdf");
        };
    };
    return (
        <div>
            <Button variant="success" className="button-1" onClick={handdlePDF}>
                Save
            </Button>
        </div>
    );
};

export default CreatePDF2;