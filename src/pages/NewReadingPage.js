import ContainerFlexRow from '../components/layout/containers/ContainerFlexRow';
import Card from '../components/UI/Card';
import NewReadingForm from '../components/forms/NewReadingForm';

const NewReadingPage = () => {
  return (
    <ContainerFlexRow>
      <Card>
        <NewReadingForm />
      </Card>
    </ContainerFlexRow>
  );
};

export default NewReadingPage;
