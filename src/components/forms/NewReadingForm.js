import { useRef, useState, useEffect, useCallback } from 'react';
import { format, getTime, isAfter, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import styles from './NewReadingForm.module.css';
import PageHeader from '../../components/UI/PageHeader';
import HyperIndicator from '../../components/UI/HyperIndicator';
import Input from '../../components/UI/Input';
import Textarea from '../../components/UI/Textarea';
import Button from '../../components/UI/Button';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import useInput from '../../hooks/use-input';
import useHyperColorsStateful from '../../hooks/use-hyper-colors-stateful';
import useFetch from '../../hooks/http-req/use-fetch-generic';
import useQueryReadings from '../../hooks/http-req/use-query-readings';
import useFirebaseUrl from '../../hooks/use-firebase-url';
import { usePanelsContext } from '../../store/panels-context';
import { useModalContext } from '../../store/modal-context';
import {
  MIN_START_DATE,
  R_HISTORY,
  M_ERROR,
  US_DATE,
  S_SIS_IZOLATA
} from '../../helpers/global-constants';

const numberRegex = /^[1-3]?\d\d$/; // 2 or 3 digits < 400
const timeRegex = /^(?:[01]?\d|2[0-3]):[0-5]\d$/;
const dateRegex = /^(?:199\d|20\d\d).(?:0[1-9]|1[012]).(?:[012]\d|3[01])$/;

const numberValidation = (val) => numberRegex.test(val);
const timeValidation = (val) => timeRegex.test(val);
const dateValidation = (val) => {
  let flag = dateRegex.test(val);
  if (flag) flag = isAfter(new Date(), parseISO(val));
  return flag;
};

const NewReadingForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [armToggle, setArmToggle] = useState(true);
  const sistolicInputRef = useRef();
  const diastolicInputRef = useRef();
  const pulsInputRef = useRef();
  const weightInputRef = useRef();
  const dateInputRef = useRef();
  const timeInputRef = useRef();
  const commentInputRef = useRef();
  const { readingsUrl } = useFirebaseUrl();
  const { showModal, setModalData } = useModalContext();
  const navigate = useNavigate();
  const { windowWidth } = usePanelsContext();
  const { mostRecentWeight: userWeight, refetch } = useQueryReadings();
  
  const date = new Date();
  const today = format(date, US_DATE);
  const now = format(date, 'HH:mm');
  const seconds = format(date, 'ss');
  // alternative pure js:
  // const today =
  //   date.getFullYear() +
  //   '-' +
  //   ('0' + (date.getMonth() + 1)).slice(-2) +
  //   '-' +
  //   ('0' + date.getDate()).slice(-2);
  // const now =
  //   ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

  const {
    value: sistolicInputValue,
    isValid: sistolicIsValid,
    hasError: sistolicHasError,
    isInputBlank: sistolicIsInputBlank,
    changeInputHandler: sistolicChangeInputHandler,
    blurInputHandler: sistolicBlurInputHandler,
    resetInputHandler: sistolicResetInputHandler
  } = useInput('', numberValidation);
  const {
    value: diastolicInputValue,
    isValid: diastolicIsValid,
    hasError: diastolicHasError,
    isInputBlank: diastolicIsInputBlank,
    changeInputHandler: diastolicChangeInputHandler,
    blurInputHandler: diastolicBlurInputHandler,
    resetInputHandler: diastolicResetInputHandler
  } = useInput('', numberValidation);
  const {
    value: pulsInputValue,
    isValid: pulsIsValid,
    hasError: pulsHasError,
    changeInputHandler: pulsChangeInputHandler,
    blurInputHandler: pulsBlurInputHandler,
    resetInputHandler: pulsResetInputHandler
  } = useInput('', numberValidation);
  const {
    value: weightInputValue,
    isValid: weightIsValid,
    hasError: weightHasError,
    changeInputHandler: weightChangeInputHandler,
    blurInputHandler: weightBlurInputHandler,
    resetInputHandler: weightResetInputHandler
  } = useInput(userWeight, numberValidation);
  const {
    value: dateInputValue,
    isValid: dateIsValid,
    hasError: dateHasError,
    changeInputHandler: dateChangeInputHandler,
    blurInputHandler: dateBlurInputHandler,
    resetInputHandler: dateResetInputHandler
  } = useInput(today, dateValidation);
  const {
    value: timeInputValue,
    isValid: timeIsValid,
    hasError: timeHasError,
    changeInputHandler: timeChangeInputHandler,
    blurInputHandler: timeBlurInputHandler,
    resetInputHandler: timeResetInputHandler
  } = useInput(now, timeValidation);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        sistolicIsValid &&
          diastolicIsValid &&
          pulsIsValid &&
          weightIsValid &&
          dateIsValid &&
          timeIsValid
      );
    }, 900);
    return () => {
      clearTimeout(identifier);
    };
  }, [
    sistolicIsValid,
    diastolicIsValid,
    pulsIsValid,
    weightIsValid,
    dateIsValid,
    timeIsValid
  ]);

  const { sisColor, diaColor, hyperColor, titleText } = useHyperColorsStateful(
    sistolicInputValue,
    diastolicInputValue,
    sistolicIsInputBlank,
    diastolicIsInputBlank
  );

  const { isLoading, error, sendRequest } = useFetch();

  const armClickHandler = () => {
    setArmToggle((prevState) => !prevState);
  };

  const placeholderTextarea = `Orice modificări: medicație, sport, alimentație, somn, aritmie, simptome alte afecțiuni ...`;

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (formIsValid) {
        const timestamp = getTime(
          new Date(`${dateInputValue}T${timeInputValue}:${seconds}`)
        );
        const newReading = {
          sis: +sistolicInputValue,
          dia: +diastolicInputValue,
          puls: +pulsInputValue,
          weight: +weightInputValue,
          timestamp: timestamp,
          arm: armToggle ? 'Stânga' : 'Dreapta',
          comment:
            commentInputRef.current.value === ''
              ? null
              : commentInputRef.current.value
        };
        const requestConfig = {
          url: readingsUrl,
          method: 'POST',
          body: newReading,
          headers: { 'Content-Type': 'aplication/json' }
        };
        const applyDataFn = () => {
          sistolicResetInputHandler();
          diastolicResetInputHandler();
          pulsResetInputHandler();
          weightResetInputHandler();
          dateResetInputHandler();
          timeResetInputHandler();
          refetch();
          navigate(R_HISTORY, { replace: false });
        };
        sendRequest(requestConfig, applyDataFn);
      } else if (!sistolicIsValid) {
        sistolicInputRef.current.focus();
        return;
      } else if (!diastolicIsValid) {
        diastolicInputRef.current.focus();
        return;
      } else if (!pulsIsValid) {
        pulsInputRef.current.focus();
        return;
      } else if (!weightIsValid) {
        weightInputRef.current.focus();
        return;
      } else if (!dateIsValid) {
        dateInputRef.current.focus();
        return;
      } else {
        timeInputRef.current.focus();
        return;
      }
    },
    [
      formIsValid,
      sistolicIsValid,
      diastolicIsValid,
      pulsIsValid,
      weightIsValid,
      dateIsValid,
      dateInputValue,
      timeInputValue,
      seconds,
      sistolicInputValue,
      diastolicInputValue,
      pulsInputValue,
      weightInputValue,
      armToggle,
      readingsUrl,
      sendRequest,
      sistolicResetInputHandler,
      diastolicResetInputHandler,
      pulsResetInputHandler,
      weightResetInputHandler,
      dateResetInputHandler,
      timeResetInputHandler,
      refetch,
      navigate
    ]
  );

  useEffect(() => {
    if (error) {
      console.log(error);
      setModalData('Salvarea datelor eșuată! Încearcă din nou.');
      showModal(M_ERROR);
    }
  }, [error, setModalData, showModal]);

  return (
    <>
      <PageHeader
        title={titleText}
        titleColor={`c${hyperColor}`}
        hideLine={true}
      />
      <HyperIndicator
        isInputBlank={sistolicIsInputBlank || diastolicIsInputBlank}
        heartStyles={`heart${hyperColor}`}
        isSisIzolata={hyperColor === S_SIS_IZOLATA}
      />
      <form className={styles['reading-form']} onSubmit={submitHandler}>
        <Input
          htmlFor="sistolic"
          label={windowWidth > 352 ? 'Sistolică' : 'Sis.'}
          type="number"
          name="sistolic"
          id="sistolic"
          ref={sistolicInputRef}
          error={sistolicHasError}
          value={sistolicInputValue}
          onChange={sistolicChangeInputHandler}
          onBlur={sistolicBlurInputHandler}
          description="mmHG"
          minLength="2"
          maxLength="3"
          min="10"
          max="399"
          step="1"
          inputComponentStyles={styles['reading-input--component']}
          inputStyles={`${styles['reading-input--input']} ${styles['reading-input--bold']}`}
          colorStyles={`c${sisColor}`}
        />
        <Input
          htmlFor="diastolic"
          label={windowWidth > 352 ? 'Diastolică' : 'Dia.'}
          type="number"
          name="diastolic"
          id="diastolic"
          ref={diastolicInputRef}
          error={diastolicHasError}
          value={diastolicInputValue}
          onChange={diastolicChangeInputHandler}
          onBlur={diastolicBlurInputHandler}
          description="mmHG"
          minLength="2"
          maxLength="3"
          min="10"
          max="399"
          step="1"
          inputComponentStyles={styles['reading-input--component']}
          inputStyles={`${styles['reading-input--input']} ${styles['reading-input--bold']}`}
          colorStyles={`c${diaColor}`}
        />
        <Input
          htmlFor="puls"
          label="Puls"
          type="number"
          name="puls"
          id="puls"
          ref={pulsInputRef}
          error={pulsHasError}
          value={pulsInputValue}
          onChange={pulsChangeInputHandler}
          onBlur={pulsBlurInputHandler}
          description="BPM"
          minLength="2"
          maxLength="3"
          min="10"
          max="399"
          step="1"
          inputComponentStyles={styles['reading-input--component']}
          inputStyles={styles['reading-input--input']}
          colorStyles="c-default"
        />
        <Input
          htmlFor="weight"
          label={windowWidth > 352 ? 'Greutate' : 'Masă'}
          type="number"
          name="weight"
          id="weight"
          ref={weightInputRef}
          error={weightHasError}
          value={weightInputValue}
          onChange={weightChangeInputHandler}
          onBlur={weightBlurInputHandler}
          description="Kg"
          minLength="2"
          maxLength="3"
          min="10"
          max="399"
          step="1"
          inputComponentStyles={styles['reading-input--component']}
          inputStyles={styles['reading-input--input']}
          colorStyles="c-default"
        />
        <Input
          htmlFor="date"
          label={windowWidth > 352 ? 'Data' : 'Dată'}
          type="date"
          name="date"
          id="date"
          ref={dateInputRef}
          error={dateHasError}
          value={dateInputValue}
          onChange={dateChangeInputHandler}
          onBlur={dateBlurInputHandler}
          description={windowWidth > 352 ? 'Ziua.Luna.Anul' : 'Zi.Lu.An'}
          min={MIN_START_DATE}
          max={today}
          colorStyles="c-default"
        />
        <Input
          htmlFor="time"
          label={windowWidth > 352 ? 'Ora' : 'Oră'}
          type="time"
          name="time"
          id="time"
          ref={timeInputRef}
          error={timeHasError}
          value={timeInputValue}
          onChange={timeChangeInputHandler}
          onBlur={timeBlurInputHandler}
          description={windowWidth > 352 ? 'Ore:Minute' : 'H:Min.'}
          colorStyles="c-default"
        />
        <Input
          htmlFor="arm"
          label={windowWidth > 352 ? 'Brațul' : 'Braț'}
          type="button"
          name="arm"
          id="arm"
          value={armToggle ? 'Stâng' : 'Drept'}
          onClick={armClickHandler}
          description={windowWidth > 352 ? 'Stâng / Drept' : 'S. / D.'}
          inputComponentStyles={styles['reading-input--component']}
          inputStyles={styles['reading-input--toggle']}
          colorStyles="c-default"
        />
        <Textarea
          htmlFor="comments"
          label="Observații"
          name="comments"
          id="comments"
          ref={commentInputRef}
          rows="3"
          description="Opțional"
          colorStyles="c-default"
          placeholder={placeholderTextarea}
          inputComponentStyles={styles['reading-textarea']}
          labelStyles={styles['reading-textarea--label']}
          inputStyles={styles['reading-textarea--textarea']}
        />
        <Button type="submit" text="Salvează" />
      </form>
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default NewReadingForm;
