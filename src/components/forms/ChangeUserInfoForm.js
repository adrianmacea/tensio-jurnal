import { useRef, useState, useEffect, useCallback } from 'react';
import { getTime } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import styles from './ProfileForm.module.css';
import PageHeader from '../UI/PageHeader';
import Line from '../UI/Line';
import Input from '../UI/Input';
import Button from '../UI/Button';
import LoadingSpinner from '../UI/LoadingSpinner';
import useInput from '../../hooks/use-input';
import useFetch from '../../hooks/http-req/use-fetch-generic';
import useFirebaseUrl from '../../hooks/use-firebase-url';
import useQueryUserInfo from '../../hooks/http-req/use-query-user-info';
import { useModalContext } from '../../store/modal-context';
import {
  B_CANCEL,
  S_DEFAULT,
  R_PROFILE,
  M_ERROR
} from '../../helpers/global-constants';

const nameRegex = /^[A-Za-z0-9 ._-]{2,70}$/; // intre 2 si 70 caractere din paranteza dreapta
const birthRegex =
  /^(?:19[2-9]\d|20[01]\d).(?:0[1-9]|1[012]).(?:[012]\d|3[01])$/; // range: 1920 - 2019

const nameValidation = (val) => nameRegex.test(val.trim());
const birthValidation = (val) => birthRegex.test(val);

const ChangeUserInfoForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const nameInputRef = useRef();
  const birthInputRef = useRef();
  const { userInfoUrl } = useFirebaseUrl();
  const { showModal, setModalData } = useModalContext();
  const navigate = useNavigate();
  const {
    name: curName,
    birthInputFormat: curBirth,
    refetch
  } = useQueryUserInfo();

  const {
    value: nameInputValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    changeInputHandler: nameChangeInputHandler,
    blurInputHandler: nameBlurInputHandler
  } = useInput(curName, nameValidation);
  const {
    value: birthInputValue,
    isValid: birthIsValid,
    hasError: birthHasError,
    changeInputHandler: birthChangeInputHandler,
    blurInputHandler: birthBlurInputHandler
  } = useInput(curBirth, birthValidation);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(nameIsValid && birthIsValid);
    }, 900);
    return () => {
      clearTimeout(identifier);
    };
  }, [nameIsValid, birthIsValid]);

  const { isLoading, error, sendRequest } = useFetch();

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (formIsValid) {
        const timestamp = getTime(new Date(`${birthInputValue}`));
        const newProfile = {
          name: nameInputValue.trim(),
          birthStamp: timestamp
        };
        const requestConfig = {
          url: userInfoUrl,
          method: 'PUT',
          body: newProfile,
          headers: { 'Content-Type': 'aplication/json' }
        };
        const applyDataFn = () => {
          refetch();
          navigate(R_PROFILE, { replace: true });
        };
        sendRequest(requestConfig, applyDataFn);
      } else if (!nameIsValid) {
        nameInputRef.current.focus();
        return;
      } else if (!birthIsValid) {
        birthInputRef.current.focus();
        return;
      }
    },
    [
      formIsValid,
      nameIsValid,
      birthIsValid,
      birthInputValue,
      nameInputValue,
      userInfoUrl,
      sendRequest,
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

  const cancelBtnHandler = () => {
    navigate(R_PROFILE, { replace: true });
  };
  
  const submitBtnText = curName || curBirth ? 'Modifică' : 'Adaugă';

  return (
    <>
      <PageHeader title="Completarea profilului" shortLine={true} />
      <form onSubmit={submitHandler}>
        <Input
          htmlFor="name"
          label="Nume Prenume:"
          type="text"
          name="name"
          id="name"
          ref={nameInputRef}
          error={nameHasError}
          value={nameInputValue}
          onChange={nameChangeInputHandler}
          onBlur={nameBlurInputHandler}
          minLength="2"
          maxLength="70"
          inputComponentStyles={styles['profile-input--component']}
          labelStyles={styles['profile-input--label']}
          inputStyles={styles['profile-input--input']}
          colorStyles={`c${S_DEFAULT}`}
        />
        <Input
          htmlFor="birth"
          label="Data nașterii:"
          type="date"
          name="birth"
          id="birth"
          ref={birthInputRef}
          error={birthHasError}
          value={birthInputValue}
          onChange={birthChangeInputHandler}
          onBlur={birthBlurInputHandler}
          min="1920-01-01"
          max="2019-01-01"
          inputComponentStyles={styles['profile-input--component']}
          labelStyles={styles['profile-input--label']}
          inputStyles={styles['profile-input--input']}
          colorStyles={`c${S_DEFAULT}`}
        />
        <Button text="Anulează" styles={B_CANCEL} onClick={cancelBtnHandler} />
        <Button type="submit" text={submitBtnText} />
      </form>
      {isLoading && <LoadingSpinner />}
      <Line shortLine={true} />
    </>
  );
};

export default ChangeUserInfoForm;
