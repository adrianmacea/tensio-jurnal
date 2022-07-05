import ContainerFlexColumn from '../components/layout/containers/ContainerFlexColumn';
import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';
import { S_PRIMARY } from '../helpers/global-constants';

const Medication = () => {
  return (
    <ContainerFlexColumn>
      <Card>
        <PageHeader title="Medicația curentă" />
        <h3 className={`c${S_PRIMARY}`}>Work in progress...</h3>
        <ul className="to-do-list">
          <li className="bold">Listă tratament curent</li>
          <li>- formular de modificare</li>
          <li>
            - fiecare modificare generează automat o intrare în istoricul de mai
            jos
          </li>
        </ul>
      </Card>
      <Card>
        <PageHeader title="Istoric medicație" />
        <h3 className={`c${S_PRIMARY}`}>Work in progress...</h3>
        <ul className="to-do-list">
          <li className="bold">Listă tratamente anterioare</li>
          <li>Pentru fiecare item:</li>
          <li>- link - statistici pt. perioadă</li>
          <li>- link - raport  pt. perioadă</li>
          <li>- buton - delete item</li>
        </ul>
      </Card>
    </ContainerFlexColumn>
  );
};

export default Medication;
