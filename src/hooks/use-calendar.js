import {
  startOfWeek,
  startOfDay,
  addDays
} from 'date-fns';

const useCalendar = (start) => {

  const generateMonth = () => {
    let date = startOfWeek(startOfDay(start), { weekStartsOn: 1 });

    return function () {
      const month = [...Array(42)].map((_, i) => addDays(date, i));
      date = addDays(month[41], 1);
      return month;
    };
  };

  return { generateMonth };
};

export default useCalendar;

/* 
- - - generic calendar alternative - - - 

import {
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  startOfDay,
  addDays
} from 'date-fns';

const useCalendar = (start) => {
  const generateWeek = (inputDate) => {
    let date = startOfWeek(startOfDay(inputDate), { weekStartsOn: 1 });

    return function () {
      const week = [...Array(7)].map((_, i) => addDays(date, i));
      date = addDays(week[6], 1);
      return week;
    };
  };

  const generateMonth = () => {
    let month = [];
    let date = startOfMonth(start);

    function lastDayOfRange(range) {
      return range[range.length - 1][6];
    }

    return function () {
      const weekGen = generateWeek(date);
      const endDate = startOfDay(endOfWeek(endOfMonth(date)));
      month.push(weekGen());

      while (lastDayOfRange(month) < endDate) {
        month.push(weekGen());
      }

      const range = month;
      month = [];
      date = addDays(lastDayOfRange(range), 1);

      return range;
    };
  };

  return { generateMonth };
};

export default useCalendar;

*/