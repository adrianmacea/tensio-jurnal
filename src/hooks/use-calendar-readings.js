import { format } from 'date-fns';

import useQueryReadings from './http-req/use-query-readings';
import useHyperColorsStateless from './use-hyper-colors-stateless';

const useCalendarReadings = (optional = '') => {
  const { readings } = useQueryReadings();
  const { getHyperColors } = useHyperColorsStateless();

  const readingsInput = optional ? optional : readings;

  const obj = {};

  /*
    template for starting nested object: 
    {
    'month1': { 'day1': { sis: x, dia: y },
                'day2': { sis: x, dia: y } },
    'month2': { 'day1': { sis: x, dia: y },
                'day2': { sis: x, dia: y } }
    }
  */

  readingsInput.forEach((reading) => {
    const date = new Date(reading.timestamp);
    const month = format(date, 'yyyy, M');
    const day = format(date, 'd');

    if (!obj[month]) {
      obj[month] = {};
      obj[month][day] = { sis: reading.sis, dia: reading.dia };
    } else if (!obj[month][day]) {
      obj[month][day] = { sis: reading.sis, dia: reading.dia };
    } else {
      obj[month][day] = {
        sis:
          reading.sis > obj[month][day].sis ? reading.sis : obj[month][day].sis,
        dia:
          reading.dia > obj[month][day].dia ? reading.dia : obj[month][day].dia
      };
    }
  });

  /*
    template for final nested object (case !optional): 
    {
    'month1': { 'day1': color,
                'day2': color },
    'month2': { 'day1': color,
                'day2': color }
    }
  */

  for (const [month, daysCol] of Object.entries(obj)) {
    for (const [day, sisDiaObj] of Object.entries(daysCol)) {
      const { sisColor, diaColor, hyperColor } = getHyperColors(
        sisDiaObj.sis,
        sisDiaObj.dia
      );
      if (optional) {
        obj[month][day] = {
          sisColor: sisColor,
          diaColor: diaColor,
          sisVal: sisDiaObj.sis,
          diaVal: sisDiaObj.dia
        };
      } else {
        obj[month][day] = hyperColor;
      }
    }
  }

  return { calendarReadings: obj };
};

export default useCalendarReadings;
