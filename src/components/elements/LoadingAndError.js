import { useNavigate } from 'react-router-dom';

import ContainerFlexColumn from '../layout/containers/ContainerFlexColumn';
import ContainerFlexRow from '../layout/containers/ContainerFlexRow';
import Card from '../UI/Card';
import PageHeader from '../UI/PageHeader';
import Button from '../UI/Button';
import AlertText from '../UI/AlertText';
import LoadingSpinner from '../UI/LoadingSpinner';
import Line from '../UI/Line';
import { useAuthContext } from '../../store/auth-context';
import { R_LANDING, R_SIGNIN, B_CANCEL } from '../../helpers/global-constants';

const LoadingAndError = ({ isLoading, isError, refetch }) => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const reLogIn = () => {
    logout();
    navigate(`${R_LANDING}${R_SIGNIN}`, { replace: true });
  };

  return (
    <>
      {isLoading && (
        <ContainerFlexRow>
          <Card>
            <PageHeader title="Se încarcă datele!" />
            <LoadingSpinner />
          </Card>
        </ContainerFlexRow>
      )}
      {isError && !isLoading && (
        <ContainerFlexColumn>
          <Card>
            <PageHeader title="Eroare!" errorStyles={true} />
            <AlertText text="Încărcarea datelor eșuată." />
            <Button text="Încearcă din nou" onClick={refetch} />
          </Card>
          <Card>
            <Line />
            <p>Dacă eroarea persistă încearcă să te re-autentifici.</p>
            <Button text="Autentificare" onClick={reLogIn} styles={B_CANCEL} />
          </Card>
        </ContainerFlexColumn>
      )}
    </>
  );
};

export default LoadingAndError;
