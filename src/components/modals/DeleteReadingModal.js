import { useCallback, useEffect } from 'react';

import PageHeader from '../UI/PageHeader';
import Button from '../UI/Button';
import AlertText from '../UI/AlertText';
import LoadingSpinner from '../UI/LoadingSpinner';
import useFetch from '../../hooks/http-req/use-fetch-generic';
import useQueryReadings from '../../hooks/http-req/use-query-readings';
import useFirebaseUrl from '../../hooks/use-firebase-url';
import { useModalContext } from '../../store/modal-context';
import { M_ERROR } from '../../helpers/global-constants';

const DeleteReadingModal = () => {
  const {
    hideModal,
    modalData: id,
    setModalData,
    showModal
  } = useModalContext();
  const { isLoading, error, sendRequest } = useFetch();
  const { refetch } = useQueryReadings();
  const { readingsUrl } = useFirebaseUrl(`/${id}`);
  const deleteItemHandler = useCallback(() => {
    const requestConfig = {
      url: readingsUrl,
      method: 'DELETE'
    };
    const applyDataFn = () => {
      refetch();
      hideModal();
    };
    sendRequest(requestConfig, applyDataFn);
  }, [readingsUrl, hideModal, sendRequest, refetch]);

  useEffect(() => {
    if (error) {
      console.log(error);
      setModalData('Solicitare eșuată! Încearcă din nou.');
      showModal(M_ERROR);
    }
  }, [error, hideModal, setModalData, showModal]);

  return (
    <>
      <PageHeader title="Sigur dorești ștergerea?" errorStyles={true} />
      <AlertText text="Datele nu vor putea fi recuperate." />
      <Button text="Anulează" onClick={hideModal} />
      <Button text="Șterge" onClick={deleteItemHandler} />
      <br />
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default DeleteReadingModal;
