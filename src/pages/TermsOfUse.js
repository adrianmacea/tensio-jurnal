import ContainerFlexRow from '../components/layout/containers/ContainerFlexRow';
import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';
import { useAuthContext } from '../store/auth-context';
import { S_PRIMARY } from '../helpers/global-constants';

const TermsContent = () => {
  return (
    <Card>
      <PageHeader title="Termeni și condiții de utilizare" />
      <h3 className={`c${S_PRIMARY}`}>Work in progress...</h3>
      <ul className="to-do-list">
        <li>- terms of use</li>
        <li>- legal text</li>
        <li>- pagina obligatorie</li>
      </ul>
    </Card>
  );
};

const TermsOfUse = () => {
  const { isLoggedIn } = useAuthContext();
  return (
    <>
      {isLoggedIn && <ContainerFlexRow children={<TermsContent />} />}
      {!isLoggedIn && <TermsContent />}
    </>
  );
};

export default TermsOfUse;
