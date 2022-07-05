import { useRef, useState } from 'react';
import { format, subDays, isAfter, parseISO } from 'date-fns';
import { MdDateRange as DateIco } from 'react-icons/md';
import { MdAccessTime as TimeIco } from 'react-icons/md';
import { MdOutlineFrontHand as ArmIco } from 'react-icons/md';
import { MdOutlineDoubleArrow as ArrowsIco } from 'react-icons/md';

import styles from './FilterReadings.module.css';
import Card from '../UI/Card';
import RadioButton from '../UI/RadioButton';
import useInput from '../../hooks/use-input';
import { usePanelsContext } from '../../store/panels-context';
import { useFilterContext } from '../../store/flter-context';
import {
  F_24H,
  F_AFTERNOON,
  F_ARM,
  F_BOTH,
  F_DAYS,
  F_EVENING,
  F_HOURS,
  F_LEFT,
  F_MORNING,
  F_NIGHT,
  F_RIGHT,
  MIN_START_DATE,
  US_DATE
} from '../../helpers/global-constants';

const date = new Date();
const today = format(date, US_DATE);
const sub30Days = format(subDays(date, 30), US_DATE);
const sub60Days = format(subDays(date, 60), US_DATE);
const sub90Days = format(subDays(date, 90), US_DATE);
const sub180Days = format(subDays(date, 180), US_DATE);
const sub360Days = format(subDays(date, 360), US_DATE);

const dateRegex = new RegExp(
  '^(?:199\\d|20\\d\\d).(?:0[1-9]|1[012]).(?:[012]\\d|3[01])$'
);
const dateValidation = (val) => {
  let flag = dateRegex.test(val);
  if (flag) flag = isAfter(date, parseISO(val));
  return flag;
};

const Filters = (props) => {
  const { criteria, onChangeDays, onChangeHours, onChangeArm } = props;
  const { days, hours, arm } = criteria;
  const [notChronological, setNotChronological] = useState(false);
  const [defalutDateStart, setDefaultDateStart] = useState(MIN_START_DATE);
  const dateStartInputRef = useRef();
  const dateEndInputRef = useRef();
  const {
    value: dateStartInputValue,
    hasError: dateStartHasError,
    changeInputHandler: dateStartChangeInputHandler,
    blurInputHandler: dateStartBlurInputHandler
  } = useInput(defalutDateStart, dateValidation);
  const {
    value: dateEndInputValue,
    hasError: dateEndHasError,
    changeInputHandler: dateEndChangeInputHandler,
    blurInputHandler: dateEndBlurInputHandler
  } = useInput(today, dateValidation);

  const datesRadioBtnClickHandler = () => {
    if (
      dateRegex.test(dateStartInputValue) &&
      dateRegex.test(dateEndInputValue)
    )
      setNotChronological(
        isAfter(parseISO(dateStartInputValue), parseISO(dateEndInputValue))
      );
  };
  const datesRadioBtnBlurHandler = () => {
    setNotChronological(false);
  };
  const defalutDateStartHandler = (event) => {
    setDefaultDateStart(event.target.value.slice(1, 11));
  };

  return (
    <div className={styles['filter--container-all']}>
      <div className={styles['filter--container-set']}>
        <div className={styles['filter--title-ico-container']}>
          <DateIco className={styles['filter--ico']} />
          <h5 className={styles['filter--title']}>Perioada calendaristică</h5>
        </div>
        <div className={styles['filter--container-days-big']}>
          <div className={styles['filter--container-days-small']}>
            <RadioButton
              name={F_DAYS}
              value={`1${sub30Days}:${today}`}
              onChange={onChangeDays}
              checked={days === `1${sub30Days}:${today}`}
              text="30 zile"
              onClick={defalutDateStartHandler}
            />
            <RadioButton
              name={F_DAYS}
              value={`2${sub60Days}:${today}`}
              onChange={onChangeDays}
              checked={days === `2${sub60Days}:${today}`}
              text="60 zile"
              onClick={defalutDateStartHandler}
            />
            <RadioButton
              name={F_DAYS}
              value={`3${sub90Days}:${today}`}
              onChange={onChangeDays}
              checked={days === `3${sub90Days}:${today}`}
              text="90 zile"
              onClick={defalutDateStartHandler}
            />
          </div>
          <div className={styles['filter--container-days-small']}>
            <RadioButton
              name={F_DAYS}
              value={`4${sub180Days}:${today}`}
              onChange={onChangeDays}
              checked={days === `4${sub180Days}:${today}`}
              text="180 zile"
              onClick={defalutDateStartHandler}
            />
            <RadioButton
              name={F_DAYS}
              value={`5${sub360Days}:${today}`}
              onChange={onChangeDays}
              checked={days === `5${sub360Days}:${today}`}
              text="360 zile"
              onClick={defalutDateStartHandler}
            />
            <RadioButton
              name={F_DAYS}
              value={`6${MIN_START_DATE}`}
              onChange={onChangeDays}
              checked={days === `6${MIN_START_DATE}`}
              text="Toate"
              onClick={defalutDateStartHandler}
            />
          </div>
        </div>
        <RadioButton
          name={F_DAYS}
          className={styles['radio-for-date-input']}
          value={`7${dateStartInputValue}:${dateEndInputValue}`}
          onChange={onChangeDays}
          checked={days === `7${dateStartInputValue}:${dateEndInputValue}`}
          onClick={datesRadioBtnClickHandler}
          onBlur={datesRadioBtnBlurHandler}
        >
          <div className={styles['filter--container-days-small']}>
            <div>
              <input
                className={`${styles['filter--date-input']} ${
                  dateStartHasError === true || notChronological
                    ? styles.invalid
                    : ''
                }`}
                name={F_DAYS}
                type="date"
                ref={dateStartInputRef}
                value={
                  dateStartInputValue === MIN_START_DATE
                    ? defalutDateStart
                    : dateStartInputValue
                }
                onChange={dateStartChangeInputHandler}
                onBlur={dateStartBlurInputHandler}
                min={MIN_START_DATE}
                max={dateEndInputValue}
              />
              <span> - </span>
            </div>
            <input
              className={`${styles['filter--date-input']} ${
                dateEndHasError === true || notChronological
                  ? styles.invalid
                  : ''
              }`}
              name={F_DAYS}
              type="date"
              ref={dateEndInputRef}
              value={dateEndInputValue}
              onChange={dateEndChangeInputHandler}
              onBlur={dateEndBlurInputHandler}
              min={dateStartInputValue}
              max={today}
            />
            {notChronological && (
              <h5 className={styles['filter--alert-message']}>
                Alege cronologic
              </h5>
            )}
          </div>
        </RadioButton>
      </div>

      <div className={styles['filter--container-set']}>
        <div className={styles['filter--title-ico-container']}>
          <TimeIco className={styles['filter--ico']} />
          <h5 className={styles['filter--title']}>Perioada zilei</h5>
        </div>
        <RadioButton
          name={F_HOURS}
          value={F_MORNING}
          onChange={onChangeHours}
          checked={hours === F_MORNING}
          text="Dimineața"
        />
        <RadioButton
          name={F_HOURS}
          value={F_AFTERNOON}
          onChange={onChangeHours}
          checked={hours === F_AFTERNOON}
          text="Prânz"
        />
        <RadioButton
          name={F_HOURS}
          value={F_EVENING}
          onChange={onChangeHours}
          checked={hours === F_EVENING}
          text="Seara"
        />
        <RadioButton
          name={F_HOURS}
          value={F_NIGHT}
          onChange={onChangeHours}
          checked={hours === F_NIGHT}
          text="Noaptea"
        />
        <RadioButton
          name={F_HOURS}
          value={F_24H}
          onChange={onChangeHours}
          checked={hours === F_24H}
          text="Toate"
        />
      </div>

      <div className={styles['filter--container-set']}>
        <div className={styles['filter--title-ico-container']}>
          <ArmIco className={styles['filter--ico']} />
          <h5 className={styles['filter--title']}>Mâna</h5>
        </div>
        <RadioButton
          name={F_ARM}
          value={F_RIGHT}
          onChange={onChangeArm}
          checked={arm === F_RIGHT}
          text="Dreapta"
        />
        <RadioButton
          name={F_ARM}
          value={F_LEFT}
          onChange={onChangeArm}
          checked={arm === F_LEFT}
          text="Stânga"
        />
        <RadioButton
          name={F_ARM}
          value={F_BOTH}
          onChange={onChangeArm}
          checked={arm === F_BOTH}
          text="Ambele"
        />
      </div>
    </div>
  );
};

const FilterBottom = (props) => {
  const {
    totalSelected,
    timeRange,
    isFilterOpen,
    expandFilterHandler,
    threshold
  } = props;
  const { windowWidth } = usePanelsContext();
  const isWindowWidth = windowWidth > 720;

  return (
    <div
      className={`${styles['filter--bottom']} ${
        isFilterOpen ? '' : styles['filter--is-closed']
      }`}
    >
      <div
        onClick={expandFilterHandler}
        className={styles['filter--arrows-div']}
      >
        <ArrowsIco className={isFilterOpen ? 'rotate270' : 'rotate90'} />
        <p className={styles['filter--arrows-text']}>
          {isFilterOpen ? 'Închide filtrele' : 'Deschide filtrele'}
        </p>
      </div>

      <p className={styles['filter--text-bottom']}>
        Înregistrări selectate:{' '}
        <span
          className={`${styles['filter--total-number']} ${
            totalSelected < threshold ? styles['filter--alert-message'] : ''
          }`}
        >
          {totalSelected}
        </span>{' '}
      </p>

      {totalSelected >= threshold && (
        <p className={styles['filter--text-bottom']}>
          {isWindowWidth ? 'Perioada: ' : 'Per.: '}
          <span className={styles['filter--time-range']}>{timeRange}</span>
        </p>
      )}
    </div>
  );
};

const FilterReadings = (props) => {
  const {
    criteria,
    onChangeDays,
    onChangeHours,
    onChangeArm,
    totalSelected,
    timeRange,
    threshold
  } = props;
  const { isFilterOpen, expandFilterHandler } = useFilterContext();

  return (
    <Card className={styles['filter--card']}>
      {isFilterOpen && (
        <Filters
          criteria={criteria}
          onChangeDays={onChangeDays}
          onChangeHours={onChangeHours}
          onChangeArm={onChangeArm}
        />
      )}
      <FilterBottom
        totalSelected={totalSelected}
        timeRange={timeRange}
        isFilterOpen={isFilterOpen}
        expandFilterHandler={expandFilterHandler}
        threshold={threshold}
      />
    </Card>
  );
};

export default FilterReadings;
