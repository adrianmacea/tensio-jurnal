import ContainerFlexRow from '../components/layout/containers/ContainerFlexRow';
import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';
import { useAuthContext } from '../store/auth-context';
import { S_PRIMARY } from '../helpers/global-constants';

const ContactContent = () => {
  return (
    <Card>
      <PageHeader title="Contact Form" />
      <h3 className={`c${S_PRIMARY}`}>Work in progress...</h3>
      <ul className="to-do-list">
        <li>- formular de contact</li>
      </ul>
    </Card>
  );
};

const Contact = () => {
  const { isLoggedIn } = useAuthContext();
  return (
    <>
      {isLoggedIn && <ContainerFlexRow children={<ContactContent />} />}
      {!isLoggedIn && <ContactContent />}
    </>
  );
};

export default Contact;
