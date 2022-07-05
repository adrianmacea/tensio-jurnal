import ContainerFlexRow from '../components/layout/containers/ContainerFlexRow';
import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';
import { S_PRIMARY } from '../helpers/global-constants';

const ImportExport = () => {
  return (
    <ContainerFlexRow>
      <Card>
        <PageHeader title="Import/Export" />
        <h3 className={`c${S_PRIMARY}`}>Work in progress...</h3>
        <ul className="to-do-list">
          <li className="bold">Buton - import date</li>
          <li className="bold">Buton - export date</li>
          <li>... plus explicații utilizare</li>
        </ul>
      </Card>
    </ContainerFlexRow>
  );
};

export default ImportExport;
