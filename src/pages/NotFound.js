import ContainerFlexRow from '../components/layout/containers/ContainerFlexRow';
import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';
import AlertText from '../components/UI/AlertText';

const NotFound = () => {
  return (
    <ContainerFlexRow>
      <Card>
        <PageHeader title="Pagina nu a fost gasită!" errorStyles={true} />
        <AlertText text="Adresă URL invalidă." />
      </Card>
    </ContainerFlexRow>
  );
};

export default NotFound;
