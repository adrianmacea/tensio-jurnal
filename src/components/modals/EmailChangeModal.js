import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../UI/PageHeader';
import Button from '../UI/Button';
import SmallText from '../UI/SmallText';
import AlertText from '../UI/AlertText';
import LoadingSpinner from '../UI/LoadingSpinner';
import useFetch from '../../hooks/http-req/use-fetch-generic';
import useQueryUserData from '../../hooks/http-req/use-query-user-data';
import useQueryIsEmailSent from '../../hooks/http-req/use-query-is-email-sent';
import useMutationIsEmailSent from '../../hooks/http-req/use-mutation-is-email-sent';
import useFirebaseUrl from '../../hooks/use-firebase-url';
import { useModalContext } from '../../store/modal-context';
import { useAuthContext } from '../../store/auth-context';
import { R_PROFILE, M_ERROR } from '../../helpers/global-constants';

const EmailChangeModal = () => {
  const {
    hideModal,
    modalData: newEmail,
    setModalData,
    showModal
  } = useModalContext();
  const { isLoading, error, sendRequest } = useFetch();
  const { refetch: refetchUserData } = useQueryUserData();
  const { refetch: refetchIsEmailSent } = useQueryIsEmailSent();
  const { updateIsEmailSent } = useMutationIsEmailSent();
  const { changeUserDataUrl } = useFirebaseUrl();
  const navigate = useNavigate();
  const { login, token } = useAuthContext();

  const changeEmailHandler = useCallback(() => {
    const requestConfig = {
      url: changeUserDataUrl,
      method: 'POST',
      body: {
        idToken: token,
        email: newEmail,
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
      refetchUserData();
      updateIsEmailSent(false);
      refetchIsEmailSent();
      navigate(R_PROFILE, { replace: true });
      hideModal();
    };
    sendRequest(requestConfig, applyDataFn);
  }, [
    changeUserDataUrl,
    token,
    newEmail,
    sendRequest,
    login,
    refetchUserData,
    updateIsEmailSent,
    refetchIsEmailSent,
    navigate,
    hideModal
  ]);

  useEffect(() => {
    if (error) {
      console.log(error);
      switch (error) {
        case 'EMAIL_EXISTS':
          setModalData('Există deja un cont asociat acestui email.');
          break;
        case 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN':
          setModalData(
            'Token de autentificare expirat. Autentifică-te din nou.'
          );
          break;
        default:
          setModalData('Modificare email eșuată! Încearcă din nou.');
          break;
      }
      showModal(M_ERROR);
    }
  }, [error, setModalData, showModal]);

  return (
    <>
      <PageHeader
        title="Sigur dorești modificarea adresei de e-mail?"
        errorStyles={true}
      />
      <SmallText text="E-mail nou:" />
      <AlertText text={newEmail} />
      <Button text="Anulează" onClick={hideModal} />
      <Button text="Modifică" onClick={changeEmailHandler} />
      <br />
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default EmailChangeModal;
