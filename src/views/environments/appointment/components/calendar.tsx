import { capitalizeFirstLetter } from '@/app/utils';
import { Button } from '@/views/components/ui/button';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';

import { useState } from 'react';

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeDate, setActiveDate] = useState<Date>(new Date());

  const getHeader = () => {
    return (
      <div className="">
        <div className="flex items-center justify-between">
          <h3 className="text-xl">
            {capitalizeFirstLetter(format(activeDate, 'MMMM yyyy'))}
          </h3>

          <Button
            variant="outline"
            onClick={() => {
              setSelectedDate(new Date());
              setActiveDate(new Date());
            }}>
            Hoje
          </Button>

          <div className="flex gap-2">
            <CaretLeft
              className="w-5 h-5 p-2 cursor-pointer hover:bg-gray-200 hover:rounded-sm"
              onClick={() => setActiveDate(subMonths(activeDate, 1))}
            />
            <CaretRight
              className="w-5 h-5 p-2 cursor-pointer hover:bg-gray-200 hover:rounded-sm"
              onClick={() => setActiveDate(addMonths(activeDate, 1))}
            />
          </div>
        </div>
      </div>
    );
  };

  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate);
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(
        <div
          className="text-gray-500 m-auto cursor-default text-center"
          key={day}>
          {capitalizeFirstLetter(format(addDays(weekStartDate, day), 'EEEEEE'))}
        </div>,
      );
    }
    return <div className="grid grid-cols-7">{weekDays}</div>;
  };

  const generateDatesForCurrentWeek = (
    date: Date,
    selectedDate: Date,
    activeDate: Date,
  ) => {
    let currentDate = date;
    const week = [];
    for (let day = 0; day < 7; day++) {
      const cloneDate = currentDate;
      week.push(
        <div
          key={currentDate.toString()}
          className={`w-8 h-8 cursor-pointer flex justify-center items-center m-auto rounded-sm ${
            isSameMonth(currentDate, activeDate) ? '' : 'text-gray-500'
          } ${
            isSameDay(currentDate, selectedDate) ? 'bg-blue-700 text-white' : ''
          }
          ${isSameDay(currentDate, new Date()) ? 'bg-gray-200' : ''}`}
          onClick={() => {
            setSelectedDate(cloneDate);
          }}>
          {format(currentDate, 'd')}
        </div>,
      );
      currentDate = addDays(currentDate, 1);
    }
    return <>{week}</>;
  };

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);

    let currentDate = startDate;

    const allWeeks = [];

    while (currentDate <= endDate) {
      allWeeks.push(
        <div className="grid grid-cols-7">
          {generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)}
        </div>,
      );
      currentDate = addDays(currentDate, 7);
    }

    return <div>{allWeeks}</div>;
  };

  return (
    <div className="flex flex-col justify-between gap-4">
      <div>
        {getHeader()}
        {getWeekDaysNames()}
        {getDates()}
      </div>
    </div>
  );
}
