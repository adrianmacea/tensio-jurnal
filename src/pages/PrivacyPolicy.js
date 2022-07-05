import ContainerFlexRow from '../components/layout/containers/ContainerFlexRow';
import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';
import { useAuthContext } from '../store/auth-context';
import { S_PRIMARY } from '../helpers/global-constants';

const PrivacyContent = () => {
  return (
    <Card>
      <PageHeader title="Confidențialitatea datelor" />
      <h3 className={`c${S_PRIMARY}`}>Work in progress...</h3>
      <ul className="to-do-list">
        <li>- privacy policy</li>
        <li>- legal text</li>
        <li>- pagina obligatorie</li>
      </ul>
    </Card>
  );
};

const PrivacyPolicy = () => {
  const { isLoggedIn } = useAuthContext();
  return (
    <>
      {isLoggedIn && <ContainerFlexRow children={<PrivacyContent />} />}
      {!isLoggedIn && <PrivacyContent />}
    </>
  );
};

export default PrivacyPolicy;
