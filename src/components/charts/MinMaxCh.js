import cardStyles from './Charts.module.css';
import styles from './MinMaxCh.module.css';
import Card from '../UI/Card';
import ChartLabel from './ChartLabel';
import {
  L_SIS,
  L_DIA,
  L_PULSE,
  L_PULSE_PRESSURE,
  L_MEDIAN_PRESSURE,
  L_WEIGHT
} from '../../helpers/global-constants';

const MinMaxItem = (props) => {
  const { min, max, label, minColor, maxColor } = props;

  const minArrowColor = minColor ? `border${minColor}` : '';
  const maxArrowColor = maxColor ? `border${maxColor}` : '';

  const minTextColor = minColor ? `c${minColor} bold` : '';
  const maxTextColor = maxColor ? `c${maxColor} bold` : '';

  const boldText = maxColor ? `bold` : '';

  return (
    <div className={styles['min-max--container']}>
      <div className={styles['min-max--number-cnt']}>
        <p className={`${styles['min-max--number']} ${minTextColor}`}>{min}</p>
      </div>

      <div className={styles['min-max--arrow-cnt']}>
        <div
          className={`${styles['min-max--arrow-head']} ${styles['min-max--arrow-left']} ${minArrowColor}`}
        ></div>
        <div
          className={`${styles['min-max--arrow-bar']} ${minArrowColor}`}
        ></div>
      </div>

      <p className={`${styles['min-max--label']} ${boldText}`}>{label}</p>

      <div className={styles['min-max--arrow-cnt']}>
        <div
          className={`${styles['min-max--arrow-bar']} ${maxArrowColor}`}
        ></div>
        <div
          className={`${styles['min-max--arrow-head']} ${styles['min-max--arrow-right']} ${maxArrowColor}`}
        ></div>
      </div>

      <div className={styles['min-max--number-cnt']}>
        <p className={`${styles['min-max--number']} ${maxTextColor}`}>{max}</p>
      </div>
    </div>
  );
};

const MinMaxCh = (props) => {
  const { minMaxValues, minMaxColors, labelText, isWindowWidth } = props;
  const {
    sisMin,
    sisMax,
    diaMin,
    diaMax,
    pulseMin,
    pulseMax,
    pulsePressureMin,
    pulsePressureMax,
    medianPressureMin,
    medianPressureMax,
    weightMin,
    weightMax
  } = minMaxValues;
  const { sisMinColor, diaMinColor, sisMaxColor, diaMaxColor } = minMaxColors;

  return (
    <Card
      className={`${cardStyles['ch-card']} ${
        isWindowWidth
          ? cardStyles['short-ch-card']
          : cardStyles['shortest-ch-card']
      }`}
    >
      <ChartLabel labelText={labelText} />
      <MinMaxItem
        min={sisMin}
        max={sisMax}
        label={isWindowWidth ? L_SIS : 'Sis.'}
        minColor={sisMinColor}
        maxColor={sisMaxColor}
      />
      <MinMaxItem
        min={diaMin}
        max={diaMax}
        label={isWindowWidth ? L_DIA : 'Dia.'}
        minColor={diaMinColor}
        maxColor={diaMaxColor}
      />
      <MinMaxItem min={pulseMin} max={pulseMax} label={L_PULSE} />
      <MinMaxItem
        min={pulsePressureMin}
        max={pulsePressureMax}
        label={isWindowWidth ? L_PULSE_PRESSURE : 'PP'}
      />
      <MinMaxItem
        min={medianPressureMin}
        max={medianPressureMax}
        label={isWindowWidth ? L_MEDIAN_PRESSURE : 'PAM'}
      />
      <MinMaxItem
        min={weightMin}
        max={weightMax}
        label={isWindowWidth ? L_WEIGHT : 'Kg.'}
      />
      <div className={styles['min-max--x-axis']}></div>
      <div>
        <p className={styles['min-max--x-axis-left']}>Minime</p>
        <p className={styles['min-max--x-axis-right']}>Maxime</p>
      </div>
    </Card>
  );
};

export default MinMaxCh;
