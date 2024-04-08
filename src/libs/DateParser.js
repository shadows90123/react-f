import dayjs from "dayjs";
import "dayjs/locale/th";

export const getDateLocale = (date) => {
    if (date) {
        return dayjs(date)
            .locale("th")
            .add(543, "year")
            .format("DD MMMM YYYY เวลา HH:mm");
    }

    return "ไม่มีข้อมูล";
};
