import { jsPDF } from "jspdf";
import { THSarabunNewNormal } from "../assets/font/THSarabunNew-normal";
import { THSarabunNewBold } from "../assets/font/THSarabunNew Bold-normal";

import React, { useState, useEffect } from "react";

const CreatePDF3 = ({ docData, sigLink }) => {
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
        const create = (imgData) => {
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

                //---------------------------> input name
                doc.text(data.name1, 48, 74, {
                    align: "left",
                });
                doc.text(data.name2, 48, 81, {
                    align: "left",
                });
                doc.text(data.name3, 48, 88, {
                    align: "left",
                });
                //---------------------------> input pass
                doc.text(data.pass1, 109, 74, {
                    align: "left",
                });
                doc.text(data.pass2, 109, 81, {
                    align: "left",
                });
                doc.text(data.pass3, 109, 88, {
                    align: "left",
                });
                //---------------------------> input number
                doc.text(data.number1, 152, 74, {
                    align: "left",
                });
                doc.text(data.number2, 152, 81, {
                    align: "left",
                });
                doc.text(data.number3, 152, 88, {
                    align: "left",
                });
                //---------------------------> input Project
                doc.text(data.project, 55, 95, {
                    align: "left",
                });
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
                if (data.checkGroup1) {
                    doc.addImage(img1, "png", 62, 54, 5, 5);
                }
                if (data.checkGroup2) {
                    doc.addImage(img1, "png", 80, 54, 5, 5);
                }
                if (data.checkGroup3) {
                    doc.addImage(img1, "png", 107, 54, 5, 5);
                }
                if (data.checkGroup4) {
                    doc.addImage(img1, "png", 137, 54, 5, 5);
                }
                if (data.checkGroup5) {
                    doc.addImage(img1, "png", 168, 54, 5, 5);
                }

                ////////////////////////////////////////
                if (data.radioGroup === "group1") {
                    doc.addImage(img1, "png", 54, 63, 5, 5);
                } else if (data.radioGroup === "group2") {
                    doc.addImage(img1, "png", 82.5, 63, 5, 5);
                } else if (data.radioGroup === "group3") {
                    doc.addImage(img1, "png", 112, 63, 5, 5);
                } else if (data.radioGroup === "group4") {
                    doc.addImage(img1, "png", 139.5, 63, 5, 5);
                }

                ////////////////////////////////////////
                // if (data.checkGroup6) {
                //     doc.addImage(img1, "png", 88.5, 118.5, 5, 5);
                // }

                ///////////////////////////////////////

                ////////////////////////////////////////

                doc.setFont("THSarabunNewBold");
                doc.text("(แบบ ป.3)", 185, 10);
                doc.setFont("THSarabunNewNormal");
                doc.setFontSize(20);
                doc.setFont("THSarabunNewBold");
                doc.text(
                    "แบบตรวจปริญญานิพนธ์ โครงงานวิศวกรรมฯ 2",
                    width / 2,
                    45,
                    {
                        align: "center",
                    }
                );
                doc.text(
                    "คณะวิศวกรรมศาสตร์ มหาวิทยาลัยรามคําแหง",
                    width / 2,
                    52,
                    {
                        align: "center",
                    }
                );
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

                doc.text(
                    "ว/ด/ป ............/............./...........",
                    75,
                    117,
                    {
                        align: "left",
                    }
                );
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
                doc.text(
                    "รูปแบบบทที่ 1 หัวข้อบท /หัวข้อรองของเนื้อหา",
                    27,
                    177,
                    {
                        align: "left",
                    }
                );
                doc.text("การเว้นระยะขอบกระดาษ บน ล่าง ซ้าย ขวา", 95, 177, {
                    align: "left",
                });
                doc.text(
                    "รูปแบบบทที่ 2 หัวข้อบท /หัวข้อรองของเนื้อหา",
                    27,
                    184,
                    {
                        align: "left",
                    }
                );
                doc.text("หนังสือขออนุญาตเปิดเผยข้อมูลหน่วยงาน", 95, 184, {
                    align: "left",
                });
                doc.text(
                    "รูปแบบบทที่ 3 หัวข้อบท /หัวข้อรองของเนื้อหา",
                    27,
                    191,
                    {
                        align: "left",
                    }
                );
                doc.text(
                    "อื่น ๆ .......................................",
                    95,
                    191,
                    {
                        align: "left",
                    }
                );
                doc.text(
                    "รูปแบบบทที่ 4 หัวข้อบท /หัวข้อรองของเนื้อหา",
                    27,
                    198,
                    {
                        align: "left",
                    }
                );
                doc.text(
                    "รูปแบบบทที่ 5 หัวข้อบท /หัวข้อรองของเนื้อหา",
                    27,
                    205,
                    {
                        align: "left",
                    }
                );
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
                doc.text(
                    ".............../............../..............",
                    30,
                    261,
                    {
                        align: "left",
                    }
                );

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

                doc.save("a4.pdf");
            };
        };

        getImageFromUrl(sigUrl, create);
    };
    return (
        <div>
            <div>
                <button onClick={handdlePDF} class="button1 button2">
                    Download
                </button>
            </div>
        </div>
    );
};

export default CreatePDF3;

//
