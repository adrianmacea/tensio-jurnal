import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';
import Card from './Card';
import ErrorModal from '../modals/ErrorModal';
import DeleteReadingModal from '../modals/DeleteReadingModal';
import EmailChangeModal from '../modals/EmailChangeModal';
import EmailVerifiedModal from '../modals/EmailVerifiedModal';
import { useModalContext } from '../../store/modal-context';
import {
  M_ERROR,
  M_DELETE_READING,
  M_EMAIL_CHANGE,
  M_EMAIL_VERIFIED
} from '../../helpers/global-constants';

const portalElement = document.getElementById('modal-root');

const Modal = () => {
  const { modalName, hideModal } = useModalContext();
  const backdropClickHandler = () => {
    hideModal();
  };

  useEffect(() => {
    const close = (event) => {
      if (event.keyCode === 27) {
        hideModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [hideModal]);

  let content;

  switch (modalName) {
    case M_ERROR:
      content = <ErrorModal />;
      break;
    case M_DELETE_READING:
      content = <DeleteReadingModal />;
      break;
    case M_EMAIL_CHANGE:
      content = <EmailChangeModal />;
      break;
    case M_EMAIL_VERIFIED:
      content = <EmailVerifiedModal />;
      break;
    // no default
  }

  return (
    <>
      {ReactDOM.createPortal(
        <div
          className={styles['modal--backdrop']}
          onClick={backdropClickHandler}
        />,
        portalElement
      )}

      {ReactDOM.createPortal(
        <Card className={styles['modal--card']}>{content}</Card>,
        portalElement
      )}
    </>
  );
};

export default Modal;
