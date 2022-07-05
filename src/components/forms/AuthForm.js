import { useEffect, useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './AuthForm.module.css';
import Button from '../UI/Button';
import LoadingSpinner from '../UI/LoadingSpinner';
import Input from '../../components/UI/Input';
import useInput from '../../hooks/use-input';
import useFetch from '../../hooks/http-req/use-fetch-generic';
import { useAuthContext } from '../../store/auth-context';
import { useModalContext } from '../../store/modal-context';
import { M_ERROR, S_DEFAULT } from '../../helpers/global-constants';

const emailRegex = /^[\w]+[\w.]*[\w]+@[\w]{2,}[\w.]*\.[\w]{2,}$/;
const passwordRegex = /^(?!.*?\s).{8,30}$/; // min 8 char, max 30 char, non white space

const passwordValidation = (val) => passwordRegex.test(val);
const emailValidation = (val) => emailRegex.test(val);

const AuthForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const { login } = useAuthContext();
  const { showModal, setModalData } = useModalContext();
  const navigate = useNavigate();

  const {
    value: emailInputValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    changeInputHandler: emailChangeInputHandler,
    blurInputHandler: emailBlurInputHandler,
    resetInputHandler: emailResetInputHandler
  } = useInput('', emailValidation);
  const {
    value: passwordInputValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    changeInputHandler: passwordChangeInputHandler,
    blurInputHandler: passwordBlurInputHandler,
    resetInputHandler: passwordResetInputHandler
  } = useInput('', passwordValidation);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 900);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const { isLoading, error, sendRequest } = useFetch();

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (formIsValid) {
        const requestConfig = {
          url: props.signInMode.url,
          method: 'POST',
          body: {
            email: emailInputValue,
            password: passwordInputValue,
            returnSecureToken: true
          },
          headers: { 'Content-Type': 'aplication/json' }
        };
        const applyDataFn = (responseData) => {
          emailResetInputHandler();
          const expirationTime = new Date(
            new Date().getTime() + +responseData.expiresIn * 1000
          );
          login(
            responseData.idToken,
            expirationTime.toISOString(),
            responseData.localId
          );
          // choose where to navigate after logIn/signIn:
          navigate('/', { replace: true }); //delete this line if you enable the lines below
          // if (props.signInMode.isSignIn) navigate('/', { replace: true });
          // else navigate(R_PROFILE, { replace: true });
        };
        sendRequest(requestConfig, applyDataFn);
      } else if (!emailIsValid) {
        emailInputRef.current.focus();
        return;
      } else {
        passwordInputRef.current.focus();
        return;
      }
      passwordResetInputHandler();
    },
    [
      formIsValid,
      emailIsValid,
      passwordResetInputHandler,
      props.signInMode.url,
      emailInputValue,
      passwordInputValue,
      sendRequest,
      emailResetInputHandler,
      login,
      navigate
    ]
  );

  useEffect(() => {
    if (error) {
      console.log(error);
      switch (error) {
        case 'INVALID_PASSWORD':
          setModalData('Parolă greșită!');
          break;
        case 'EMAIL_NOT_FOUND':
          setModalData('Nu am găsit nici un cont asociat acestui email.');
          break;
        case 'USER_DISABLED':
          setModalData('Cont dezactivat de către administratori.');
          break;
        case 'EMAIL_EXISTS':
          setModalData('Există deja un cont asociat acestui email.');
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
          setModalData(
            'Cont blocat temporar din cauza prea multor încercări eșuate. Poți să îl deblochezi prin resetarea parolei, sau poți să încerci mai rârziu.'
          );
          break;
        default:
          setModalData('Solicitare eșuată! Încearcă din nou.');
          break;
      }
      showModal(M_ERROR);
    }
  }, [error, setModalData, showModal]);

  return (
    <>
      <form onSubmit={submitHandler}>
        <Input
          htmlFor="email"
          label="E-mail"
          type="email"
          name="email"
          id="email"
          ref={emailInputRef}
          error={emailHasError}
          value={emailInputValue}
          onChange={emailChangeInputHandler}
          onBlur={emailBlurInputHandler}
          minLength="7"
          maxLength="254"
          inputComponentStyles={styles['auth-input--component']}
          labelStyles={styles['auth-input--label']}
          inputStyles={styles['auth-input--input']}
          colorStyles={`c${S_DEFAULT}`}
        />
        <Input
          htmlFor="password"
          label="Parolă"
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
          inputComponentStyles={styles['auth-input--component']}
          labelStyles={styles['auth-input--label']}
          inputStyles={styles['auth-input--input']}
          colorStyles={`c${S_DEFAULT}`}
        />
        <Button type="submit" text={props.signInMode.buttonText} />
      </form>

      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default AuthForm;
