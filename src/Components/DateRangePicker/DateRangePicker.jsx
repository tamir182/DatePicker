import React, { useState, useEffect } from "react";
import { DatePickerComponent } from "../DatePicker/DatePicker.jsx";
import "./DateRangePicker.css";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);

  useEffect(
    () => {
      updateDateDivClassNames();

      if ((startDate && endDate ) && (startDate !== endDate)) {
        console.log(`Start date: ${startDate}, end date: ${endDate}`);
      }
    },
    [startDate, endDate]
  );

  const handleDateChange = (event, isStart) => {
    let dateDiv = event.currentTarget;

    // Update state
    let date = new Date(dateDiv.getAttribute("data-key"));
    if (isStart) {
      setStartDate(date);
      if (endDate < date) {
        setEndDate(date);
      }
    } else {
      if (date < startDate) {
        setStartDate(date);
      }
      setEndDate(date);
    }

    // Update UI
    updateDateDivClassNames();

    return true;
  };

  const updateDateDivClassNames = () => {
    const dateDivs = document.querySelectorAll(".day");
    const startKey = new Date(startDate).getTime();
    const endKey = new Date(endDate).getTime();

    dateDivs.forEach((div) => {
      const divKey = new Date(div.getAttribute("data-key")).getTime();
      if (
        (divKey === startKey && div.classList.contains("start")) ||
        (divKey === endKey && div.classList.contains("end"))
      ) {
        div.classList.add("active");
      } else {
        div.classList.remove("active");
      }

      if (divKey < startKey) {
        div.classList.add("empty");
      } else {
        div.classList.remove("empty");
      }
    });
  };

  return (
    <div className="wrap">
      <div className="wrapper">
        <DatePickerComponent
          onChange={(event) => handleDateChange(event, false)}
          endDate={endDate}
          setEndDate={setEndDate}
          prefix="end"
          title="תאריך חזרה"
        />
        <div className="vertical-line" />

        <DatePickerComponent
          onChange={(event) => handleDateChange(event, true)}
          startDate={startDate}
          setStartDate={setStartDate}
          prefix="start"
          title="תאריך יציאה"
        />
        <div className="info">תאריכי חזרה ויציאה אפשריים</div>
        {/* <div className="info2">אפשרית טיסת צ׳רטר בתאריכים אלו</div> */}
      </div>
    </div>
  );
};

export default DateRangePicker;
