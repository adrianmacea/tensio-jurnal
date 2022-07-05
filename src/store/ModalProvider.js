import { useState, useCallback } from 'react';

import ModalContext from './modal-context';

const ModalProvider = (props) => {
  const [modalName, setModalName] = useState(null);
  const [modalData, setModalData] = useState('');

  const showModal = useCallback((modalName) => {
    setModalName(modalName);
  }, []);

  const hideModal = () => {
    setModalData('');
    setModalName(null);
  };

  const modalContext = {
    modalName,
    modalIsVisible: !!modalName,
    modalData,
    setModalData,
    showModal,
    hideModal,
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
