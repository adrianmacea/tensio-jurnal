import { format, isSameMonth } from 'date-fns';

import styles from './CalendarItem.module.css';
import Card from '../UI/Card';
import useCalendar from '../../hooks/use-calendar';
import useCalendarReadings from '../../hooks/use-calendar-readings';

const DAYS_SHORT = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const MONTH_NAMES = [
  'Ianuarie',
  'Februarie',
  'Martie',
  'Aprilie',
  'Mai',
  'Iunie',
  'Iulie',
  'August',
  'Septembrie',
  'Octombrie',
  'Noiembrie',
  'Decembrie'
];

const CalendarItem = ({ month }) => {
  const startDate = new Date(month);
  const { generateMonth } = useCalendar(startDate);
  const monthGenerator = generateMonth()();
  const { calendarReadings } = useCalendarReadings();

  const monthTitle = `${MONTH_NAMES[month.slice(6) - 1]} ${month.slice(0, 4)}`;

  const coloredDays = calendarReadings[month];

  return (
    <Card className={styles['cal-item--card']}>
      <div className={styles['cal-item--title']}>
        <p className={styles['cal-item--title-name']}>{monthTitle}</p>
        <div className={styles['cal-item--title-line']}></div>
      </div>
      <div className={styles['cal-item--grid']}>
        {DAYS_SHORT.map((day, i) => (
          <div key={i} className={styles['cal-item--day-name']}>
            {day}
          </div>
        ))}
        {monthGenerator.map((date, i) => (
          <div key={i} className={styles['cal-item--date']}>
            {isSameMonth(startDate, date) && coloredDays[format(date, 'd')] && (
              <div
                className={`${styles['cal-item--small-circle']} bg${
                  coloredDays[format(date, 'd')]
                }`}
              ></div>
            )}

            <div
              className={`${styles['cal-item--date-circle']} border${
                coloredDays[format(date, 'd')]
              } ${
                !isSameMonth(startDate, date)
                  ? styles['cal-item--date-grey']
                  : ''
              }`}
            >
              {format(date, 'd')}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CalendarItem;
