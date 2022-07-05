import {
  S_HIPO,
  S_OPTIM,
  S_NORMAL,
  S_INALT,
  S_GRAD_1,
  S_GRAD_2,
  S_GRAD_3,
  S_SIS_IZOLATA,
  S_DEFAULT,
  C_HIPO,
  C_OPTIM,
  C_NORMAL,
  C_INALT,
  C_GRAD_1,
  C_GRAD_2,
  C_GRAD_3
} from '../helpers/global-constants';

const useHyperColorsStateless = () => {
  let sisColor = `c${S_DEFAULT}`;
  let diaColor = `c${S_DEFAULT}`;
  let hyperColor = '';
  let sisColorCode = '';
  let diaColorCode = '';

  const getHyperColors = (sisVal, diaVal) => {
    if (sisVal < 90) {
      sisColor = S_HIPO;
      sisColorCode = C_HIPO;
    } else if (sisVal < 120) {
      sisColor = S_OPTIM;
      sisColorCode = C_OPTIM;
    } else if (sisVal < 130) {
      sisColor = S_NORMAL;
      sisColorCode = C_NORMAL;
    } else if (sisVal < 140) {
      sisColor = S_INALT;
      sisColorCode = C_INALT;
    } else if (sisVal < 160) {
      sisColor = S_GRAD_1;
      sisColorCode = C_GRAD_1;
    } else if (sisVal < 180) {
      sisColor = S_GRAD_2;
      sisColorCode = C_GRAD_2;
    } else {
      sisColor = S_GRAD_3;
      sisColorCode = C_GRAD_3;
    }

    if (diaVal < 60) {
      diaColor = S_HIPO;
      diaColorCode = C_HIPO;
    } else if (diaVal < 80) {
      diaColor = S_OPTIM;
      diaColorCode = C_OPTIM;
    } else if (diaVal < 85) {
      diaColor = S_NORMAL;
      diaColorCode = C_NORMAL;
    } else if (diaVal < 90) {
      diaColor = S_INALT;
      diaColorCode = C_INALT;
    } else if (diaVal < 100) {
      diaColor = S_GRAD_1;
      diaColorCode = C_GRAD_1;
    } else if (diaVal < 110) {
      diaColor = S_GRAD_2;
      diaColorCode = C_GRAD_2;
    } else {
      diaColor = S_GRAD_3;
      diaColorCode = C_GRAD_3;
    }

    if ((sisVal >= 10 && sisVal < 90) || (diaVal >= 10 && diaVal < 60)) {
      hyperColor = S_HIPO;
    }
    if ((sisVal >= 90 && sisVal < 120) || (diaVal >= 60 && diaVal < 80)) {
      hyperColor = S_OPTIM;
    }
    if ((sisVal >= 120 && sisVal < 130) || (diaVal >= 80 && diaVal < 85)) {
      hyperColor = S_NORMAL;
    }
    if ((sisVal >= 130 && sisVal < 140) || (diaVal >= 85 && diaVal < 90)) {
      hyperColor = S_INALT;
    }
    if ((sisVal >= 140 && sisVal < 160) || (diaVal >= 90 && diaVal < 100)) {
      hyperColor = S_GRAD_1;
    }
    if ((sisVal >= 160 && sisVal < 180) || (diaVal >= 100 && diaVal < 110)) {
      hyperColor = S_GRAD_2;
    }
    if (sisVal >= 180 || diaVal >= 110) {
      hyperColor = S_GRAD_3;
    }
    if (sisVal >= 140 && diaVal >= 25 && diaVal < 90) {
      hyperColor = S_SIS_IZOLATA;
    }

    return {
      sisColor,
      diaColor,
      sisColorCode,
      diaColorCode,
      hyperColor
    };
  };

  return { getHyperColors };
};

export default useHyperColorsStateless;
