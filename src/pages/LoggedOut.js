import { useNavigate } from 'react-router-dom';

import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';
import Button from '../components/UI/Button';
import { B_CANCEL, R_LANDING, R_SIGNIN } from '../helpers/global-constants';

const LoggedOut = () => {
  const navigate = useNavigate();

  const cancelBtnHandler = () => {
    navigate(R_LANDING, { replace: true });
  };
  
  const reconnectBtnHandler = () => {
    navigate(`${R_LANDING}${R_SIGNIN}`, { replace: true });
  };

  return (
    <Card>
      <PageHeader
        title="Sesiune expirată"
        shortLine={true}
        errorStyles={true}
      />
      <p>Fiecare sesiune expiră la 60 de minute după conectare.</p>
      <p>Pentru a continua este nevoie să te re-autentifici.</p>
      <Button text="Anulează" styles={B_CANCEL} onClick={cancelBtnHandler} />
      <Button text="Reconectează-te" onClick={reconnectBtnHandler}/>
    </Card>
  );
};

export default LoggedOut;
