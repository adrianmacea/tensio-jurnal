import { useState } from 'react';
import { startOfMonth, format, endOfMonth } from 'date-fns';
import { MdSentimentVerySatisfied as Smile0 } from 'react-icons/md';
import { MdSentimentSatisfiedAlt as Smile1 } from 'react-icons/md';
import { MdSentimentSatisfied as Smile2 } from 'react-icons/md';
import { MdSentimentNeutral as Smile3 } from 'react-icons/md';
import { MdSentimentDissatisfied as Smile4 } from 'react-icons/md';
import { MdSentimentVeryDissatisfied as Smile5 } from 'react-icons/md';

import styles from './CurrentMonth.module.css';
import Card from '../UI/Card';
import PageHeader from '../UI/PageHeader';
import Line from '../UI/Line';
import InfoBox from '../UI/InfoBox';
import useFilteredReadings from '../../hooks/use-filtered-readings';
import useCalendarReadings from '../../hooks/use-calendar-readings';
import {
  S_NORMAL,
  S_INALT,
  S_GRAD_1,
  S_GRAD_2,
  S_GRAD_3,
  S_GREY_2,
  S_LIGHT,
  US_DATE,
  F_24H,
  F_BOTH
} from '../../helpers/global-constants';

const InfoBoxContent = (props) => {
  const { sisColor, diaColor, sisVal, diaVal } = props.colorsData;
  return (
    <>
      <div className={styles['month--info-container']}>
        <div className={`bg${sisColor}`}></div>
        <p>Sys: {sisVal}</p>
      </div>
      <div className={styles['month--info-container']}>
        <div className={`bg${diaColor}`}></div>
        <p>Dia: {diaVal}</p>
      </div>
    </>
  );
};

const CalendarDay = (props) => {
  const { date, colorsData } = props;
  const [infoBox, setInfoBox] = useState('');

  const bgSisColor =
    typeof colorsData === 'object'
      ? `bg${colorsData.sisColor}`
      : `bg${colorsData}`;
  const bgDiaColor =
    typeof colorsData === 'object'
      ? `bg${colorsData.diaColor}`
      : `bg${colorsData}`;
  const dayStyles =
    typeof colorsData === 'object'
      ? `${styles['month--day-colored']}`
      : `${styles['month--day-grey']}`;

  const mouseEnterHandler = () => {
    if (typeof colorsData === 'object')
      setInfoBox(
        <InfoBox children={<InfoBoxContent colorsData={colorsData} />} />
      );
  };
  const mouseLeaveHandler = () => {
    setInfoBox('');
  };

  return (
    <div
      className={styles['month--day-container']}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {infoBox && infoBox}
      <div className={`${styles['month--sis-dia']}`}>
        <div className={`${styles['month--sis']} ${bgSisColor}`}></div>
        <div className={`${styles['month--dia']} ${bgDiaColor}`}></div>
      </div>
      <p className={dayStyles}>{date}</p>
    </div>
  );
};

const CurrentMonth = (props) => {
  const { readings } = props;
  const now = new Date();
  const todayNumber = format(now, 'd');
  const today = format(now, US_DATE);
  const monthStart = format(startOfMonth(now), US_DATE);
  const monthEnd = format(endOfMonth(now), 'dd');
  const criteriaMonth = {
    days: `7${monthStart}:${today}`,
    hours: F_24H,
    arm: F_BOTH
  };
  const { filteredReadings } = useFilteredReadings(readings, criteriaMonth);
  const { calendarReadings } = useCalendarReadings(filteredReadings);
  const monthReadings = Object.values(calendarReadings);
  let monthData = [];
  let countCompleted = 0;
  for (let i = 1; i <= monthEnd; i++) {
    if (monthReadings[0] && monthReadings[0][i]) {
      countCompleted++;
      monthData[i - 1] = monthReadings[0][i];
    } else {
      monthData[i - 1] = i <= todayNumber ? S_GREY_2 : S_LIGHT;
    }
  }

  const percentage = ((100 * countCompleted) / todayNumber).toFixed(1);
  let color = '';
  let message = '';
  let ico = '';

  switch (true) {
    case percentage > 0 && percentage < 20:
      color = `c${S_GRAD_3}`;
      message = 'Cu un mic efort poți să crești frecvența citirilor!';
      ico = <Smile5 className={`${styles['month--ico']} ${color}`} />;
      break;
    case percentage >= 20 && percentage < 45:
      color = `c${S_GRAD_2}`;
      message = 'Cu siguranță poți să depășești acest procent!';
      ico = <Smile4 className={`${styles['month--ico']} ${color}`} />;
      break;
    case percentage >= 45 && percentage < 65:
      color = `c${S_GRAD_1}`;
      message = 'Frecvența citirilor medie. Se poate și mai bine!';
      ico = <Smile3 className={`${styles['month--ico']} ${color}`} />;
      break;
    case percentage >= 65 && percentage < 80:
      color = `c${S_INALT}`;
      message = 'Ești foarte aproape de îmbunatațirea procentului!';
      ico = <Smile2 className={`${styles['month--ico']} ${color}`} />;
      break;
    case percentage >= 80 && percentage < 96:
      color = `c${S_NORMAL}`;
      message = 'Frecvența citirilor bună! Ține-o tot așa!';
      ico = <Smile1 className={`${styles['month--ico']} ${color}`} />;
      break;
    case percentage >= 96:
      color = `c${S_NORMAL}`;
      message = 'Impresionant! Menține frecvența citirilor!';
      ico = <Smile0 className={`${styles['month--ico']} ${color}`} />;
      break;
    //no default
  }

  const smallText = 'Procent calculat de la începutul lunii până azi inclusiv.';

  return (
    <Card className={styles['month--card']}>
      <PageHeader title="Înregistrările din luna curentă" />
      <div className={styles['month--container']}>
        {monthData.map((colorsData, i) => (
          <CalendarDay key={i} date={i + 1} colorsData={colorsData} />
        ))}
      </div>
      <Line closer={true} />
      <div className={styles['month--bottom-container']}>
        {ico}
        <div className={`left ${styles['month--text-container']}`}>
          <p className="bold">
            Grad de completare: <span className={color}>{percentage}%</span>
          </p>
          <p>{message}</p>
          <p className={styles['month--small-text']}>{smallText}</p>
        </div>
      </div>
    </Card>
  );
};

export default CurrentMonth;
