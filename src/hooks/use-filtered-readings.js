import { isAfter, isBefore, endOfDay, format } from 'date-fns';

import useHyperColorsStateless from './use-hyper-colors-stateless';
import { useFilterContext } from '../store/flter-context';
import {
  MIN_START_DATE,
  C_PRIMARY,
  C_PRIMARY_LIGHT,
  C_GRAY_3,
  L_HIPO,
  L_OPTIM,
  L_NORMAL,
  L_INALT,
  L_GRAD_1,
  L_GRAD_2,
  L_GRAD_3,
  L_SIS_IZOLATA,
  L_SIS,
  L_DIA,
  L_PULSE,
  L_PULSE_PRESSURE,
  L_MEDIAN_PRESSURE,
  SIS_VALUES,
  DIA_VALUES,
  PULSE_VALUES,
  PULSE_PRESSURE_VALUES,
  MEDIAN_PRESSURE_VALUES,
  F_24H,
  F_BOTH,
  F_NIGHT,
  F_MORNING,
  F_AFTERNOON,
  F_EVENING,
  F_RIGHT,
  F_LEFT,
  S_HIPO,
  S_OPTIM,
  S_NORMAL,
  S_INALT,
  S_GRAD_1,
  S_GRAD_2,
  S_GRAD_3,
  S_SIS_IZOLATA
} from '../helpers/global-constants';

const today = new Date();

const useFilter = (readings, criteria) => {
  const { days, hours, arm } = criteria;

  let filteredReadings = readings.sort((a, b) => a.timestamp - b.timestamp);

  let dateStart;
  let dateEnd;
  switch (days) {
    case `6${MIN_START_DATE}`:
      dateStart = new Date(MIN_START_DATE);
      dateEnd = today;
      break;
    default:
      dateStart = new Date(days.slice(1, 11));
      dateEnd = endOfDay(new Date(days.slice(-10)));
  }

  if (days === `6${MIN_START_DATE}` && hours === F_24H && arm === F_BOTH) {
    return { filteredReadings };
  }

  let hourStart;
  let hourEnd;
  switch (hours) {
    case F_NIGHT:
      hourStart = 0;
      hourEnd = 5;
      break;
    case F_MORNING:
      hourStart = 5;
      hourEnd = 12;
      break;
    case F_AFTERNOON:
      hourStart = 12;
      hourEnd = 18;
      break;
    case F_EVENING:
      hourStart = 18;
      hourEnd = 24;
      break;
    default:
      hourStart = 0;
      hourEnd = 24;
  }

  let conditionValue;
  switch (arm) {
    case F_RIGHT:
      conditionValue = 'Stânga';
      break;
    case F_LEFT:
      conditionValue = 'Dreapta';
      break;
    default:
      conditionValue = '';
  }

  filteredReadings = readings.filter(
    (reading) =>
      isAfter(new Date(reading.timestamp), dateStart) &&
      isBefore(new Date(reading.timestamp), dateEnd) &&
      +reading.time.slice(0, 2) >= hourStart &&
      +reading.time.slice(0, 2) < hourEnd &&
      reading.arm !== conditionValue
  );

  return { filteredReadings };
};

const useFilteredReadings = (readings, criteriaStateless = '') => {
  const {
    criteria: criteriaStateful,
    changeDaysHandler,
    changeHoursHandler,
    changeArmHandler
  } = useFilterContext();

  const criteria = criteriaStateless ? criteriaStateless : criteriaStateful;

  const { filteredReadings } = useFilter(readings, criteria);
  const { getHyperColors } = useHyperColorsStateless();

  const totalSelected = filteredReadings.length;

  const getPercentage = (partialVal, totalVal) => {
    const percentage = (100 * partialVal) / totalVal;
    return percentage.toFixed(1);
  };

  const getFormatedData = () => {
    let curMonthData = [];
    let barData = [];
    let pieData = [
      { id: L_HIPO, value: 0 },
      { id: L_OPTIM, value: 0 },
      { id: L_NORMAL, value: 0 },
      { id: L_INALT, value: 0 },
      { id: L_GRAD_1, value: 0 },
      { id: L_GRAD_2, value: 0 },
      { id: L_GRAD_3, value: 0 },
      { id: L_SIS_IZOLATA, value: 0 }
    ];
    let lineSisData = [{ id: L_SIS, color: C_GRAY_3, data: [] }];
    let lineDiaData = [{ id: L_DIA, color: C_GRAY_3, data: [] }];
    let linePulseData = [{ id: L_PULSE, color: C_GRAY_3, data: [] }];
    let linePulsePressureData = [
      { id: L_PULSE_PRESSURE, color: C_GRAY_3, data: [] }
    ];
    let lineMedianPressureData = [
      { id: L_MEDIAN_PRESSURE, color: C_GRAY_3, data: [] }
    ];
    let scatterData = [
      { id: L_HIPO, data: [] },
      { id: L_OPTIM, data: [] },
      { id: L_NORMAL, data: [] },
      { id: L_INALT, data: [] },
      { id: L_GRAD_1, data: [] },
      { id: L_GRAD_2, data: [] },
      { id: L_GRAD_3, data: [] },
      { id: L_SIS_IZOLATA, data: [] }
    ];

    let hipoCount = 0;
    let optimCount = 0;
    let normalCount = 0;
    let inaltCount = 0;
    let grad1Count = 0;
    let grad2Count = 0;
    let grad3Count = 0;
    let sisIzolataCount = 0;

    filteredReadings.forEach((reading) => {
      const { hyperColor, sisColor, diaColor, sisColorCode, diaColorCode } =
        getHyperColors(reading.sis, reading.dia);

      curMonthData.push({
        day: format(new Date(reading.timestamp), 'd'),
        sis: reading.sis,
        dia: reading.dia,
        sisColor: sisColor,
        diaColor: diaColor,
        hyper: hyperColor
      });

      lineSisData[0].data.push({
        x: reading.date,
        y: reading.sis,
        color: sisColorCode
      });
      lineDiaData[0].data.push({
        x: reading.date,
        y: reading.dia,
        color: diaColorCode
      });
      const pulse = reading.pulse;
      linePulseData[0].data.push({
        x: reading.date,
        y: pulse,
        color: pulse > 59 && pulse < 101 ? C_PRIMARY : C_PRIMARY_LIGHT
      });
      const pulsePressure = reading.pulsePressure;
      linePulsePressureData[0].data.push({
        x: reading.date,
        y: pulsePressure,
        color:
          pulsePressure > 39 && pulsePressure < 61 ? C_PRIMARY : C_PRIMARY_LIGHT
      });
      const medianPressure = reading.medianPressure;
      lineMedianPressureData[0].data.push({
        x: reading.date,
        y: medianPressure,
        color:
          medianPressure > 69 && medianPressure < 101
            ? C_PRIMARY
            : C_PRIMARY_LIGHT
      });

      switch (hyperColor) {
        case S_HIPO:
          hipoCount++;
          scatterData[0].data.push({ x: reading.dia, y: reading.sis });
          break;
        case S_OPTIM:
          optimCount++;
          scatterData[1].data.push({ x: reading.dia, y: reading.sis });
          break;
        case S_NORMAL:
          normalCount++;
          scatterData[2].data.push({ x: reading.dia, y: reading.sis });
          break;
        case S_INALT:
          inaltCount++;
          scatterData[3].data.push({ x: reading.dia, y: reading.sis });
          break;
        case S_GRAD_1:
          grad1Count++;
          scatterData[4].data.push({ x: reading.dia, y: reading.sis });
          break;
        case S_GRAD_2:
          grad2Count++;
          scatterData[5].data.push({ x: reading.dia, y: reading.sis });
          break;
        case S_GRAD_3:
          grad3Count++;
          scatterData[6].data.push({ x: reading.dia, y: reading.sis });
          break;
        case S_SIS_IZOLATA:
          sisIzolataCount++;
          scatterData[7].data.push({ x: reading.dia, y: reading.sis });
          break;
        //no default
      }
    });

    if (hipoCount > 0) {
      barData.push({
        id: L_HIPO,
        [L_HIPO]: hipoCount
      });
      pieData[0].value = getPercentage(hipoCount, totalSelected);
    }
    if (optimCount > 0) {
      barData.push({
        id: L_OPTIM,
        [L_OPTIM]: optimCount
      });
      pieData[1].value = getPercentage(optimCount, totalSelected);
    }
    if (normalCount > 0) {
      barData.push({
        id: L_NORMAL,
        [L_NORMAL]: normalCount
      });
      pieData[2].value = getPercentage(normalCount, totalSelected);
    }
    if (inaltCount > 0) {
      barData.push({
        id: L_INALT,
        [L_INALT]: inaltCount
      });
      pieData[3].value = getPercentage(inaltCount, totalSelected);
    }
    if (grad1Count > 0) {
      barData.push({
        id: L_GRAD_1,
        [L_GRAD_1]: grad1Count
      });
      pieData[4].value = getPercentage(grad1Count, totalSelected);
    }
    if (grad2Count > 0) {
      barData.push({
        id: L_GRAD_2,
        [L_GRAD_2]: grad2Count
      });
      pieData[5].value = getPercentage(grad2Count, totalSelected);
    }
    if (grad3Count > 0) {
      barData.push({
        id: L_GRAD_3,
        [L_GRAD_3]: grad3Count
      });
      pieData[6].value = getPercentage(grad3Count, totalSelected);
    }
    if (sisIzolataCount > 0) {
      barData.push({
        id: L_SIS_IZOLATA,
        [L_SIS_IZOLATA]: sisIzolataCount
      });
      pieData[7].value = getPercentage(sisIzolataCount, totalSelected);
    }

    return {
      curMonthData,
      scatterData,
      barData,
      pieData,
      lineSisData,
      lineDiaData,
      linePulseData,
      linePulsePressureData,
      lineMedianPressureData
    };
  };

  const formatedData = getFormatedData();

  const getTimeRange = () => {
    const startDate = filteredReadings[0]?.date;
    const endDate = filteredReadings[filteredReadings.length - 1]?.date;
    return `${startDate} - ${endDate}`;
  };

  const timeRange = getTimeRange();

  const getMax = (a, b) => Math.max(a, b);
  const getMin = (a, b) => Math.min(a, b);

  const getMinMax = () => {
    const sisArr = Array.from(filteredReadings, (x) => x.sis);
    const sisMax = sisArr.reduce(getMax, 0);
    const sisMin = sisArr.reduce(getMin, 400);
    const diaArr = Array.from(filteredReadings, (x) => x.dia);
    const diaMax = diaArr.reduce(getMax, 0);
    const diaMin = diaArr.reduce(getMin, 400);
    const pulseArr = Array.from(filteredReadings, (x) => x.pulse);
    const pulseMax = pulseArr.reduce(getMax, 0);
    const pulseMin = pulseArr.reduce(getMin, 400);
    const pulsePressureArr = Array.from(
      filteredReadings,
      (x) => x.pulsePressure
    );
    const pulsePressureMax = pulsePressureArr.reduce(getMax, 0);
    const pulsePressureMin = pulsePressureArr.reduce(getMin, 400);
    const medianPressureArr = Array.from(
      filteredReadings,
      (x) => x.medianPressure
    );
    const medianPressureMax = medianPressureArr.reduce(getMax, 0);
    const medianPressureMin = medianPressureArr.reduce(getMin, 400);
    const weightArr = Array.from(filteredReadings, (x) => x.weight);
    const weightMax = weightArr.reduce(getMax, 0);
    const weightMin = weightArr.reduce(getMin, 400);
    return {
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
    };
  };

  const minMaxValues = getMinMax();

  const getTickValues = () => {
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
      medianPressureMax
    } = minMaxValues;
    let sisValues = SIS_VALUES.filter((x) => x > sisMin + 4 && x < sisMax - 4);
    sisValues.unshift(sisMin);
    sisValues.push(sisMax);
    let diaValues = DIA_VALUES.filter((x) => x > diaMin + 4 && x < diaMax - 4);
    diaValues.unshift(diaMin);
    diaValues.push(diaMax);
    let pulseValues = PULSE_VALUES.filter(
      (x) => x > pulseMin + 4 && x < pulseMax - 4
    );
    pulseValues.unshift(pulseMin);
    pulseValues.push(pulseMax);
    let pulsePressureValues = PULSE_PRESSURE_VALUES.filter(
      (x) => x > pulsePressureMin + 4 && x < pulsePressureMax - 4
    );
    pulsePressureValues.unshift(pulsePressureMin);
    pulsePressureValues.push(pulsePressureMax);
    let medianPressureValues = MEDIAN_PRESSURE_VALUES.filter(
      (x) => x > medianPressureMin + 4 && x < medianPressureMax - 4
    );
    medianPressureValues.unshift(medianPressureMin);
    medianPressureValues.push(medianPressureMax);
    return {
      sisValues,
      diaValues,
      pulseValues,
      pulsePressureValues,
      medianPressureValues
    };
  };

  const tickValues = getTickValues();

  const getMinMaxColors = () => {
    const { sisMin, sisMax, diaMin, diaMax } = minMaxValues;
    const { sisColor: sisMinColor, diaColor: diaMinColor } = getHyperColors(
      sisMin,
      diaMin
    );
    const { sisColor: sisMaxColor, diaColor: diaMaxColor } = getHyperColors(
      sisMax,
      diaMax
    );
    return { sisMinColor, diaMinColor, sisMaxColor, diaMaxColor };
  };

  const minMaxColors = getMinMaxColors();

  return {
    filteredReadings,
    totalSelected,
    formatedData,
    minMaxValues,
    minMaxColors,
    tickValues,
    timeRange,
    criteria,
    changeDaysHandler,
    changeHoursHandler,
    changeArmHandler
  };
};

export default useFilteredReadings;
