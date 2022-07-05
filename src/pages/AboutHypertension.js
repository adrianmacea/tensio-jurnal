import HyperColorsSummary from '../components/elements/HyperColorsSummary';
import ContainerFlexRow from '../components/layout/containers/ContainerFlexRow';
import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';

const AboutHypertension = () => {
  return (
    <>
      <HyperColorsSummary />
      <ContainerFlexRow>
        <Card>
          <PageHeader title="Despre hipertensiunea arterială" />
          <h3 className="c-primary">Work in progress...</h3>
          <ul className="to-do-list">
            <li className="bold">Info medicale hipertensiune:</li>
            <li>- definiție</li>
            <li>- cauze</li>
            <li>- recomandări generale</li>
            <li>- recomandări caz urgență</li>
            <li>- etc</li>
          </ul>
        </Card>
      </ContainerFlexRow>
    </>
  );
};

export default AboutHypertension;
