import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';
import { S_PRIMARY } from '../helpers/global-constants';

const ForgatPass = () => {
  return (
    <Card>
      <PageHeader title="Resetează parola" />
      <h3 className={`c${S_PRIMARY}`}>Work in progress...</h3>
      <ul className="to-do-list">
        <li>- formular resetare parolă</li>
      </ul>
    </Card>
  );
};

export default ForgatPass;
