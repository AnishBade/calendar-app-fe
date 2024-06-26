// components/Calendar.js
import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "../util/calendar";
import cn from "../util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Modal from './Modal';
import EventList from './EventList';
import HolidayList from './HolidayList';

export default function Calendar({ isAuthenticated }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [countryCode, setCountryCode] = useState('US');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = (date) => {
    setSelectDate(date);
    setIsModalOpen(true);
  };

  const handleCountryChange = (event) => {
    setCountryCode(event.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto h-screen items-center">
      <div className="w-96 h-96">
        <div className="flex justify-between items-center">
          <h1 className="select-none font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-10 items-center">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <select onChange={handleCountryChange} value={countryCode} className="mb-4">
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
          <option value="IN">India</option>
          {/* Add more countries as needed */}
        </select>
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <h1
              key={index}
              className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
            >
              {day}
            </h1>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => (
              <div
                key={index}
                className="p-2 text-center h-14 grid place-content-center text-sm border-t"
              >
                <h1
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-blue-600 text-white" : "",
                    selectDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                      ? "bg-black text-white"
                      : "",
                    "h-10 w-10 square-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                  )}
                  onClick={() => handleDateClick(date)}
                >
                  {date.date()}
                </h1>
              </div>
            )
          )}
        </div>
      </div>
      <div className="h-96 w-96 sm:px-5">
        <EventList />
      </div>
      <div className="h-96 w-96 sm:px-5">
        <HolidayList countryCode={countryCode} month={today.month()} year={today.year()} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectDate}
      />
    </div>
  );
}
