import React from "react";
import { Form, Col } from "react-bootstrap";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const DateAndTimePicker = ({ selectedDateTime, onChange }) => {
    const handleDateTimeChange = (value) => {
        onChange(value);
    };

    return (
        <Form.Group as={Col} controlId="datetimepicker">
            <Form.Label>เลือกวันที่และเวลา</Form.Label>
            <Datetime
                value={selectedDateTime}
                onChange={handleDateTimeChange}
                inputProps={{ className: "form-control" }}
                dateFormat="YYYY-MM-DD"
                timeFormat="HH:mm:ss"
                closeOnSelect
            />
        </Form.Group>
    );
};

export default DateAndTimePicker;
