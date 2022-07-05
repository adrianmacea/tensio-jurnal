import PageHeader from '../UI/PageHeader';
import Button from '../UI/Button';
import AlertText from '../UI/AlertText';
import { useModalContext } from '../../store/modal-context';

const EmailVerifiedModal = () => {
  const { modalData: message, hideModal } = useModalContext();

  return (
    <>
      <PageHeader title="Adresă de e-mail neverificată!" errorStyles={true} />
      <AlertText text={message} />
      <Button text="Ok" onClick={hideModal} />
    </>
  );
};

export default EmailVerifiedModal;
