import React, { useContext } from 'react';

const ModalContext = React.createContext({
  modalName: '',
  modalIsVisible: false,
  modalData: '',
  setModalData: () => {},
  showModal: () => {},
  hideModal: () => {}
});

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);

  return modalContext;
};

export default ModalContext;
