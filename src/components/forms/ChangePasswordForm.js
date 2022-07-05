import { useEffect, useCallback, useState, useRef } from 'react';
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
import { useAuthContext } from '../../store/auth-context';
import { useModalContext } from '../../store/modal-context';
import {
  B_CANCEL,
  S_DEFAULT,
  R_PROFILE,
  M_ERROR
} from '../../helpers/global-constants';

const passwordRegex = /^(?!.*?\s).{8,30}$/; // min 8 char, max 30 char, non white space
const password2Regex = /^(?!.*?\s).{8,30}$/; // min 8 char, max 30 char, non white space

const passwordValidation = (val) => passwordRegex.test(val);
const password2Validation = (val) => password2Regex.test(val);

const ChangePasswordForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const passwordInputRef = useRef();
  const password2InputRef = useRef();
  const { changeUserDataUrl } = useFirebaseUrl();
  const { login, token } = useAuthContext();
  const { showModal, setModalData } = useModalContext();
  const navigate = useNavigate();

  const {
    value: passwordInputValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    changeInputHandler: passwordChangeInputHandler,
    blurInputHandler: passwordBlurInputHandler
  } = useInput('', passwordValidation);
  const {
    value: password2InputValue,
    isValid: password2IsValid,
    hasError: password2HasError,
    changeInputHandler: password2ChangeInputHandler,
    blurInputHandler: password2BlurInputHandler
  } = useInput('', password2Validation);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(passwordIsValid && password2IsValid);
    }, 900);
    return () => {
      clearTimeout(identifier);
    };
  }, [password2IsValid, passwordIsValid]);

  const { isLoading, error, sendRequest } = useFetch();

  useEffect(() => {
    if (passwordInputValue === password2InputValue) setPasswordMatch(true);
  }, [password2InputValue, passwordInputValue]);

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();

      if (formIsValid && passwordMatch) {
        const requestConfig = {
          url: changeUserDataUrl,
          method: 'POST',
          body: {
            idToken: token,
            password: passwordInputValue,
            returnSecureToken: true
          },
          headers: { 'Content-Type': 'aplication/json' }
        };
        const applyDataFn = (responseData) => {
          const expirationTime = new Date(
            new Date().getTime() + +responseData.expiresIn * 1000
          );
          login(
            responseData.idToken,
            expirationTime.toISOString(),
            responseData.localId
          );
          navigate(R_PROFILE, { replace: true });
        };
        sendRequest(requestConfig, applyDataFn);
      } else if (!passwordIsValid) {
        passwordInputRef.current.focus();
        return;
      } else if (!password2IsValid) {
        password2InputRef.current.focus();
        return;
      }
    },
    [
      formIsValid,
      passwordMatch,
      passwordIsValid,
      password2IsValid,
      changeUserDataUrl,
      token,
      passwordInputValue,
      sendRequest,
      login,
      navigate
    ]
  );

  useEffect(() => {
    if (error) {
      console.log(error);
      setModalData('Modificarea parolei eșuată! Încearcă din nou.');
      showModal(M_ERROR);
    }
  }, [error, setModalData, showModal]);

  const cancelBtnHandler = () => {
    navigate(R_PROFILE, { replace: true });
  };

  return (
    <>
      <PageHeader title="Modificare parolă" shortLine={true} />
      <form onSubmit={submitHandler}>
        <Input
          htmlFor="password"
          label="Parola nouă:"
          type="password"
          name="password"
          id="password"
          ref={passwordInputRef}
          error={passwordHasError}
          value={passwordInputValue}
          onChange={passwordChangeInputHandler}
          onBlur={passwordBlurInputHandler}
          minLength="8"
          maxLength="30"
          inputComponentStyles={styles['profile-input--component']}
          labelStyles={styles['profile-input--label']}
          inputStyles={styles['profile-input--input']}
          colorStyles={`c${S_DEFAULT}`}
        />
        <Input
          htmlFor="password2"
          label="Rescrie parola:"
          type="password"
          name="password2"
          id="password2"
          ref={password2InputRef}
          error={password2HasError}
          value={password2InputValue}
          onChange={password2ChangeInputHandler}
          onBlur={password2BlurInputHandler}
          minLength={passwordInputValue.length}
          maxLength={passwordInputValue.length}
          inputComponentStyles={styles['profile-input--component']}
          labelStyles={styles['profile-input--label']}
          inputStyles={styles['profile-input--input']}
          colorStyles={`c${S_DEFAULT}`}
        />
        <Button text="Anulează" styles={B_CANCEL} onClick={cancelBtnHandler} />
        <Button type="submit" text="Modifică" />
      </form>
      {isLoading && <LoadingSpinner />}
      <Line shortLine={true} />
    </>
  );
};

export default ChangePasswordForm;
