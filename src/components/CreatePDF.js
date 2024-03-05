import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { THSarabunNewNormal } from "../assets/font/THSarabunNew-normal";
import { THSarabunNewBold } from "../assets/font/THSarabunNew Bold-normal";

// import { useAuthState } from "react-firebase-hooks/auth";
import html2canvas from "html2canvas";

export default function CreatePDF({ docData, sigLink }) {
    // const [user, loading] = useAuthState(auth);
    const [data, setData] = useState(docData);
    const [sigUrl, setSigUrl] = useState(sigLink);

    useEffect(() => {
        setData(docData);
        setSigUrl(sigLink);
    }, [docData]);

    var getImageFromUrl = function (url, callback) {
        var img = new Image(),
            data,
            ret = {
                data: null,
                pending: true,
            };
        img.onError = function () {
            throw new Error('Cannot load image: "' + url + '"');
        };
        img.crossOrigin = "anonymous";
        img.onload = function () {
            var canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
            // canvas.width = img.width;
            // canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            // Grab the image as a jpeg encoded in base64, but only the data
            data = canvas
                .toDataURL("image/png")
                .slice("data:image/png;base64,".length);
            // Convert the data to binary form
            data = atob(data);
            document.body.removeChild(canvas);
            ret["data"] = data;
            ret["pending"] = false;
            console.log("data", data);
            if (typeof callback === "function") {
                callback(data);
            }
        };
        img.src = url;
        return ret;
    };

    const handdlePDF = () => {
        // if (data == null) {
        //     alert("ไม่พบข้อมูล!!!");
        //     return;
        // }
        const create = (imgData) => {
            const doc = new jsPDF();
            var img = new Image();
            var img1 = new Image();

            img.src = require("../assets/images/Ramkhamhaeng.png");
            img1.src = require("../assets/images/check.png");
            // var img2 = new Image();
            // img2.src = sigUrl;

            img.onload = () => {
                doc.addFileToVFS("THSarabunNewNormal.ttf", THSarabunNewNormal);
                doc.addFont(
                    "THSarabunNewNormal.ttf",
                    "THSarabunNewNormal",
                    "normal"
                );
                doc.setFont("THSarabunNewNormal");

                doc.addFileToVFS("THSarabunNewBold.ttf", THSarabunNewBold);
                doc.addFont(
                    "THSarabunNewBold.ttf",
                    "THSarabunNewBold",
                    "normal"
                );
                // doc.setFont("MyFont1");

                let width = doc.internal.pageSize.getWidth();

                // ลายเซนอาจารย์
                doc.addImage(imgData, "JPEG", 55, 210, 50, 20);
                doc.addImage(imgData, "JPEG", 55, 218, 50, 20);

                // doc.addImage(img2, "png", 1, 1, 25, 25);
                //---------------------------> input name
                doc.text(data.name1, 62, 74, {
                    align: "left",
                });
                doc.text(data.name2, 62, 81, {
                    align: "left",
                });
                doc.text(data.name3, 62, 88, {
                    align: "left",
                });
                //---------------------------> input pass
                doc.text(data.pass1, 127, 74, {
                    align: "left",
                });
                doc.text(data.pass2, 127, 81, {
                    align: "left",
                });
                doc.text(data.pass3, 127, 88, {
                    align: "left",
                });
                //---------------------------> input number
                doc.text(data.number1, 175, 74, {
                    align: "left",
                });
                doc.text(data.number2, 175, 81, {
                    align: "left",
                });
                doc.text(data.number3, 175, 88, {
                    align: "left",
                });
                //---------------------------> input Project
                doc.text(data.project, 70, 102, {
                    align: "left",
                });
                doc.text(data.teacher1, 95, 137, {
                    align: "left",
                });
                doc.text(data.teacher2, 95, 144, {
                    align: "left",
                });
                //---------------------------> input Studens
                doc.text(data.student1, 65, 180, {
                    align: "left",
                });
                doc.text(data.student1, 65, 187, {
                    align: "left",
                });
                doc.text(data.student2, 135, 180, {
                    align: "left",
                });
                doc.text(data.student2, 135, 187, {
                    align: "left",
                });
                doc.text(data.student3, 105, 194, {
                    align: "left",
                });
                doc.text(data.student3, 105, 201, {
                    align: "left",
                });

                doc.addImage(img, "png", 95, 10, 25, 25);
                ////////////////////////////////////////
                if (data.checkGroup1) {
                    doc.addImage(img1, "png", 67, 54, 5, 5);
                }
                if (data.checkGroup2) {
                    doc.addImage(img1, "png", 84, 54, 5, 5);
                }
                if (data.checkGroup3) {
                    doc.addImage(img1, "png", 107, 54, 5, 5);
                }
                if (data.checkGroup4) {
                    doc.addImage(img1, "png", 134, 54, 5, 5);
                }
                if (data.checkGroup5) {
                    doc.addImage(img1, "png", 162, 54, 5, 5);
                }

                ////////////////////////////////////////
                if (data.radioGroup === "group1") {
                    doc.addImage(img1, "png", 75, 90.5, 5, 5);
                } else if (data.radioGroup === "group2") {
                    doc.addImage(img1, "png", 95, 90.5, 5, 5);
                } else if (data.radioGroup === "group3") {
                    doc.addImage(img1, "png", 114, 90.5, 5, 5);
                } else if (data.radioGroup === "group4") {
                    doc.addImage(img1, "png", 134, 90.5, 5, 5);
                }

                ////////////////////////////////////////
                if (data.checkGroup6) {
                    doc.addImage(img1, "png", 88.5, 118.5, 5, 5);
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
                doc.text(
                    "คณะวิศวกรรมศาสตร์ มหาวิทยาลัยรามคำเเหง",
                    width / 2,
                    52,
                    {
                        align: "center",
                    }
                );
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
                doc.text(
                    "(ว/ด/ป....................................)",
                    90,
                    230,
                    {
                        align: "right",
                    }
                );

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
                doc.text(
                    "(ว/ด/ป....................................)",
                    160,
                    230,
                    {
                        align: "right",
                    }
                );
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
                doc.text(
                    "ได้ตรวจสอบข้อมูลข้างต้นถูกต้องเรียบร้อยเเล้ว",
                    97,
                    272,
                    {
                        align: "right",
                    }
                );
                doc.text(
                    "ลงชื่อ......................................",
                    83,
                    279,
                    {
                        align: "right",
                    }
                );
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
                doc.text(
                    "ว/ด/ป.......................................",
                    165,
                    286,
                    {
                        align: "right",
                    }
                );

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

                doc.save("a4.pdf");
            };
        };

        getImageFromUrl(sigUrl, create);
    };

    return (
        <>
            <button onClick={handdlePDF} class="button1 button2">
                Download
            </button>
        </>
    );
}
