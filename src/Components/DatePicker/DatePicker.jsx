import React, { useState } from "react";
import "./DatePicker.css";

function DatePicker({onChange, selectedDate, setSelectedDate, title, prefix}) {

  const [date, setDate] = useState(new Date());
  
  const daysOfWeek = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

  const months = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];

  //Show only the next 12 months.
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const futureMonths = [...Array(12).keys()].map((i) => ({
    month: (currentMonth + i) % 12,
    year: currentYear + Math.floor((currentMonth + i) / 12),
  }));

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const weeks = [];
  let week = [];

  // Fill empty days of previous month.

  for (let i = 0; i < startingDayOfWeek; i++) {
    const emptyDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      0 - (startingDayOfWeek - i)
    );
    const classNameNew = "day empty " + prefix;
    week.push(
      <div key={`empty-${i}`} className={classNameNew}>
        <div className="empty-number">{emptyDate.getDate()}</div>
      </div>
    );
  }

  // Fill days of current month.

  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
    let dayClasses = prefix + " day";
    if (
      currentDate < new Date() ||
      currentDate.getMonth() !== date.getMonth()
    ) {
      dayClasses += " empty";
    }
    week.push(
      <div onClick={onChange} key={currentDate.toISOString()} data-key={currentDate.toISOString()} className={dayClasses}>
        {i}
      </div>
    );
    if (week.length === 7 || i === daysInMonth) {
      if (i === daysInMonth && week.length < 7) {
        for (let j = week.length; j < 7; j++) {
          week.push(<div key={`empty-${j}`} data-key={currentDate.toISOString()} className="day empty" />);
        }
      }
      weeks.push(
        <div key={weeks.length} className="week">
          {week}
        </div>
      );
      week = [];
    }
  }

  const handleMonthAndYearChange = (event) => {
    const [selectedMonth, selectedYear] = event.target.value.split("-");
    setDate(new Date(selectedYear, selectedMonth, date.getDate()));
  };

  return (
    <div className="calendar">
      <div className="header">
        <div
          className="previous-month"
          onClick={() =>
            setDate(
              new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
            )
          }
        >
          &lt;
        </div>
        <div className="current-month">
          <div className="calendar-name">{title}</div>

          <select
            className="select-month"
            value={`${date.getMonth()}-${date.getFullYear()}`}
            onChange={handleMonthAndYearChange}
          >
            {futureMonths.map(({ month, year }) => (
              <option key={`${month}-${year}`} value={`${month}-${year}`}>
                {months[month]} {year}
              </option>
            ))}
          </select>
        </div>
        <div
          className="next-month"
          onClick={() =>
            setDate(
              new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
            )
          }
        >
          &gt;
        </div>
      </div>
      <div className="body">
        <div className="days-of-week">
          {daysOfWeek.map((day) => (
            <div key={day} className="day-of-week">
              {day}
            </div>
          ))}
        </div>
        {weeks}
      </div>
    </div>
  );
}

const DatePickerComponent = ({ onChange, startDate, setStartDate, title, prefix }) => {
  return (
    <DatePicker
      onChange={onChange}
      selectedDate={startDate}
      setSelectedDate={setStartDate}
      title={title}
      prefix={prefix}
    />
  );
};

export {DatePickerComponent};
 