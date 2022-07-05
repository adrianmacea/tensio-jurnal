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
import useQueryUserData from '../../hooks/http-req/use-query-user-data';
import { useAuthContext } from '../../store/auth-context';
import { useModalContext } from '../../store/modal-context';
import {
  B_CANCEL,
  S_DEFAULT,
  R_PROFILE,
  M_ERROR
} from '../../helpers/global-constants';

const nickRegex = /^.{2,15}$/; // min 2 char, max 15 char, any char except line terminators
const nickValidation = (val) => nickRegex.test(val.trim());

const ChangeNicknameForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const nickInputRef = useRef();
  const { changeUserDataUrl } = useFirebaseUrl();
  const { token } = useAuthContext();
  const { showModal, setModalData } = useModalContext();
  const navigate = useNavigate();
  const { refetch } = useQueryUserData();

  const {
    value: nickInputValue,
    isValid: nickIsValid,
    hasError: nickHasError,
    changeInputHandler: nickChangeInputHandler,
    blurInputHandler: nickBlurInputHandler
  } = useInput('', nickValidation);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(nickIsValid);
    }, 900);
    return () => {
      clearTimeout(identifier);
    };
  }, [nickIsValid]);

  const { isLoading, error, sendRequest } = useFetch();

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (formIsValid) {
        const requestConfig = {
          url: changeUserDataUrl,
          method: 'POST',
          body: {
            idToken: token,
            displayName: nickInputValue.trim(),
            returnSecureToken: true
          },
          headers: { 'Content-Type': 'aplication/json' }
        };
        const applyDataFn = () => {
          refetch();
          navigate(R_PROFILE, { replace: true });
        };
        sendRequest(requestConfig, applyDataFn);
      } else if (!nickIsValid) {
        nickInputRef.current.focus();
        return;
      }
    },
    [
      formIsValid,
      nickIsValid,
      changeUserDataUrl,
      token,
      nickInputValue,
      sendRequest,
      refetch,
      navigate
    ]
  );

  useEffect(() => {
    if (error) {
      console.log(error);
      setModalData('Modificare nickname eșuată! Încearcă din nou.');
      showModal(M_ERROR);
    }
  }, [error, setModalData, showModal]);

  const cancelBtnHandler = () => {
    navigate(R_PROFILE, { replace: true });
  };

  return (
    <>
      <PageHeader title="Modificare nickname" shortLine={true} />
      <form onSubmit={submitHandler}>
        <Input
          htmlFor="nick"
          label="Nickname nou:"
          type="text"
          name="nick"
          id="nick"
          ref={nickInputRef}
          error={nickHasError}
          value={nickInputValue}
          onChange={nickChangeInputHandler}
          onBlur={nickBlurInputHandler}
          minLength="2"
          maxLength="15"
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

export default ChangeNicknameForm;
