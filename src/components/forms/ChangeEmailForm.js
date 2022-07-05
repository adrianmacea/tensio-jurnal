import { useEffect, useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ProfileForm.module.css';
import PageHeader from '../UI/PageHeader';
import Line from '../UI/Line';
import Input from '../UI/Input';
import Button from '../UI/Button';
import useInput from '../../hooks/use-input';
import { useModalContext } from '../../store/modal-context';
import {
  B_CANCEL,
  S_DEFAULT,
  R_PROFILE,
  M_EMAIL_CHANGE
} from '../../helpers/global-constants';

const emailRegex = /^[\w]+[\w.]*[\w]+@[\w]{2,}[\w.]*\.[\w]{2,}$/;
const emailValidation = (val) => emailRegex.test(val);

const ChangeEmailForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const { showModal, setModalData } = useModalContext();
  const emailInputRef = useRef();
  const navigate = useNavigate();

  const {
    value: emailInputValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    changeInputHandler: emailChangeInputHandler,
    blurInputHandler: emailBlurInputHandler
  } = useInput('', emailValidation);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid);
    }, 900);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid]);

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (formIsValid) {
        setModalData(emailInputValue);
        showModal(M_EMAIL_CHANGE);
      } else if (!emailIsValid) {
        emailInputRef.current.focus();
        return;
      }
    },
    [formIsValid, emailIsValid, setModalData, emailInputValue, showModal]
  );

  const cancelBtnHandler = () => {
    navigate(R_PROFILE, { replace: true });
  };

  return (
    <>
      <PageHeader title="Modificare e-mail" shortLine={true} />
      <form onSubmit={submitHandler}>
        <Input
          htmlFor="email"
          label="E-mail nou:"
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
          inputComponentStyles={styles['profile-input--component']}
          labelStyles={styles['profile-input--label']}
          inputStyles={styles['profile-input--input']}
          colorStyles={`c${S_DEFAULT}`}
        />
        <Button text="Anulează" styles={B_CANCEL} onClick={cancelBtnHandler} />
        <Button type="submit" text="Modifică" />
      </form>
      <Line shortLine={true} />
    </>
  );
};

export default ChangeEmailForm;
