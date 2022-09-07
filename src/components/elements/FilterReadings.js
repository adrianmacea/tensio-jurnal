import { format, subDays } from 'date-fns';
import { MdDateRange as DateIco } from 'react-icons/md';
import { MdAccessTime as TimeIco } from 'react-icons/md';
import { MdOutlineFrontHand as ArmIco } from 'react-icons/md';
import { MdOutlineDoubleArrow as ArrowsIco } from 'react-icons/md';

import styles from './FilterReadings.module.css';
import Card from '../UI/Card';
import RadioButton from '../UI/RadioButton';
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

const Filters = (props) => {
  const { criteria, onChangeDays, onChangeHours, onChangeArm } = props;
  const { days, hours, arm } = criteria;
  const { windowWidth } = usePanelsContext();
  const isWindowWidth = windowWidth > 720;

  return (
    <div className={styles['filter--container-all']}>

      <div className={styles['filter--container-set']}>
        <div className={styles['filter--title-ico-container']}>
          <DateIco className={styles['filter--ico']} />
          <h5 className={styles['filter--title']}>Zile</h5>
        </div>
            <RadioButton
              name={F_DAYS}
              value={`1${sub30Days}:${today}`}
              onChange={onChangeDays}
              checked={days === `1${sub30Days}:${today}`}
              text={isWindowWidth ? "30 zile" : "30"}
            />
            <RadioButton
              name={F_DAYS}
              value={`2${sub60Days}:${today}`}
              onChange={onChangeDays}
              checked={days === `2${sub60Days}:${today}`}
              text={isWindowWidth ? "60 zile" : "60"}
            />
            <RadioButton
              name={F_DAYS}
              value={`3${sub90Days}:${today}`}
              onChange={onChangeDays}
              checked={days === `3${sub90Days}:${today}`}
              text={isWindowWidth ? "90 zile" : "90"}
            />
            <RadioButton
              name={F_DAYS}
              value={`4${sub180Days}:${today}`}
              onChange={onChangeDays}
              checked={days === `4${sub180Days}:${today}`}
              text={isWindowWidth ? "180 zile" : "180"}
            />
            <RadioButton
              name={F_DAYS}
              value={`6${MIN_START_DATE}`}
              onChange={onChangeDays}
              checked={days === `6${MIN_START_DATE}`}
              text={isWindowWidth ? "Toate" : "Tot"}
            />
      </div>

      <div className={styles['filter--container-set']}>
        <div className={styles['filter--title-ico-container']}>
          <TimeIco className={styles['filter--ico']} />
          <h5 className={styles['filter--title']}>Ore</h5>
        </div>
        <RadioButton
          name={F_HOURS}
          value={F_MORNING}
          onChange={onChangeHours}
          checked={hours === F_MORNING}
          text={isWindowWidth ? "Dimineața" : "05-12"} 
        />
        <RadioButton
          name={F_HOURS}
          value={F_AFTERNOON}
          onChange={onChangeHours}
          checked={hours === F_AFTERNOON}
          text={isWindowWidth ? "Prânz" : "12-18"} 
        />
        <RadioButton
          name={F_HOURS}
          value={F_EVENING}
          onChange={onChangeHours}
          checked={hours === F_EVENING}
          text={isWindowWidth ? "Seara" : "18-24"}
        />
        <RadioButton
          name={F_HOURS}
          value={F_NIGHT}
          onChange={onChangeHours}
          checked={hours === F_NIGHT}
          text={isWindowWidth ? "Noaptea" : "00-05"}
        />
        <RadioButton
          name={F_HOURS}
          value={F_24H}
          onChange={onChangeHours}
          checked={hours === F_24H}
          text={isWindowWidth ? "Toate" : "Tot"}
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
          text={isWindowWidth ? "Dreapta" : "Dr."}
        />
        <RadioButton
          name={F_ARM}
          value={F_LEFT}
          onChange={onChangeArm}
          checked={arm === F_LEFT}
          text={isWindowWidth ? "Stânga" : "St."}
        />
        <RadioButton
          name={F_ARM}
          value={F_BOTH}
          onChange={onChangeArm}
          checked={arm === F_BOTH}
          text={isWindowWidth ? "Ambele" : "Tot"}
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
