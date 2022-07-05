import ContainerFlexRow from '../components/layout/containers/ContainerFlexRow';
import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';
import { S_PRIMARY } from '../helpers/global-constants';

const Help = () => {
  return (
    <ContainerFlexRow>
      <Card>
        <PageHeader title="Help Page" />
        <h3 className={`c${S_PRIMARY}`}>Work in progress...</h3>
        <ul className="to-do-list">
          <li>- Info despre aplicație</li>
          <li>- Help utilizare</li>
          <li>- FAQ</li>
        </ul>
      </Card>
    </ContainerFlexRow>
  );
};

export default Help;
