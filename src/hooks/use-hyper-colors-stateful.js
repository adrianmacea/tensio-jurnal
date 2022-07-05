import { useEffect, useState, useReducer } from 'react';

import {
  S_HIPO,
  S_OPTIM,
  S_NORMAL,
  S_INALT,
  S_GRAD_1,
  S_GRAD_2,
  S_GRAD_3,
  S_SIS_IZOLATA,
  S_PRIMARY,
  S_DEFAULT
} from '../helpers/global-constants';

const initialHyperState = {
  hyperColor: S_PRIMARY,
  titleText: 'Citire nouă'
};

const hyperStateReducer = (state, action) => {
  switch (action.type) {
    case 'HIPO':
      return {
        hyperColor: S_HIPO,
        titleText: 'Hipotensiune arterială'
      };
    case 'OPTIM':
      return {
        hyperColor: S_OPTIM,
        titleText: 'Tensiune optimă'
      };
    case 'NORMAL':
      return {
        hyperColor: S_NORMAL,
        titleText: 'Tensiune normală'
      };
    case 'INALT':
      return {
        hyperColor: S_INALT,
        titleText: 'Tensiune normal înaltă'
      };
    case 'GRAD1':
      return {
        hyperColor: S_GRAD_1,
        titleText: 'Hipertensiune grad 1'
      };
    case 'GRAD2':
      return {
        hyperColor: S_GRAD_2,
        titleText: 'Hipertensiune grad 2'
      };
    case 'GRAD3':
      return {
        hyperColor: S_GRAD_3,
        titleText: 'Hipertensiune grad 3'
      };
    case 'SISIZOLATA':
      return {
        hyperColor: S_SIS_IZOLATA,
        titleText: 'Hipertensiune sistolică izolată'
      };
    case 'RESET':
      return initialHyperState;
    //no default
  }
  return initialHyperState;
};

const useHyperColorsStateful = (
  sisVal,
  diaVal,
  isSisInputBlank = false,
  isDiaInputBlank = false
) => {
  const [sisColor, setSisColor] = useState(S_DEFAULT);
  const [diaColor, setDiaColor] = useState(S_DEFAULT);
  const [state, dispatch] = useReducer(hyperStateReducer, initialHyperState);

  useEffect(() => {
    if (sisVal < 90) {
      setSisColor(S_HIPO);
    } else if (sisVal < 120) {
      setSisColor(S_OPTIM);
    } else if (sisVal < 130) {
      setSisColor(S_NORMAL);
    } else if (sisVal < 140) {
      setSisColor(S_INALT);
    } else if (sisVal < 160) {
      setSisColor(S_GRAD_1);
    } else if (sisVal < 180) {
      setSisColor(S_GRAD_2);
    } else {
      setSisColor(S_GRAD_3);
    }

    if (diaVal < 60) {
      setDiaColor(S_HIPO);
    } else if (diaVal < 80) {
      setDiaColor(S_OPTIM);
    } else if (diaVal < 85) {
      setDiaColor(S_NORMAL);
    } else if (diaVal < 90) {
      setDiaColor(S_INALT);
    } else if (diaVal < 100) {
      setDiaColor(S_GRAD_1);
    } else if (diaVal < 110) {
      setDiaColor(S_GRAD_2);
    } else {
      setDiaColor(S_GRAD_3);
    }

    if (!isSisInputBlank && !isDiaInputBlank) {
      if ((sisVal >= 10 && sisVal < 90) || (diaVal >= 10 && diaVal < 60))
        dispatch({ type: 'HIPO' });
      if ((sisVal >= 90 && sisVal < 120) || (diaVal >= 60 && diaVal < 80))
        dispatch({ type: 'OPTIM' });
      if ((sisVal >= 120 && sisVal < 130) || (diaVal >= 80 && diaVal < 85))
        dispatch({ type: 'NORMAL' });
      if ((sisVal >= 130 && sisVal < 140) || (diaVal >= 85 && diaVal < 90))
        dispatch({ type: 'INALT' });
      if ((sisVal >= 140 && sisVal < 160) || (diaVal >= 90 && diaVal < 100))
        dispatch({ type: 'GRAD1' });
      if ((sisVal >= 160 && sisVal < 180) || (diaVal >= 100 && diaVal < 110))
        dispatch({ type: 'GRAD2' });
      if (sisVal >= 180 || diaVal >= 110) dispatch({ type: 'GRAD3' });
      if (sisVal >= 140 && diaVal >= 25 && diaVal < 90)
        dispatch({ type: 'SISIZOLATA' });
    }

    if (isSisInputBlank || isDiaInputBlank) dispatch({ type: 'RESET' });
  }, [sisVal, diaVal, isSisInputBlank, isDiaInputBlank]);

  return {
    sisColor,
    diaColor,
    hyperColor: state.hyperColor,
    titleText: state.titleText
  };
};

export default useHyperColorsStateful;
