import HyperColorsSummary from '../components/elements/HyperColorsSummary';
import ContainerFlexRow from '../components/layout/containers/ContainerFlexRow';
import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';
import LoadingAndError from '../components/elements/LoadingAndError';
import FilterReadings from '../components/elements/FilterReadings';
import useFilteredReadings from '../hooks/use-filtered-readings';
import useQueryReadings from '../hooks/http-req/use-query-readings';

const Report = () => {
  const { readings, isError, isLoading, refetch } = useQueryReadings();

  const {
    totalSelected,
    timeRange,
    criteria,
    changeDaysHandler,
    changeHoursHandler,
    changeArmHandler
  } = useFilteredReadings(readings);

  const isData = !!totalSelected;

  return (
    <>
      <HyperColorsSummary />
      <LoadingAndError
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
      {!isLoading && !isError && (
        <>
          <FilterReadings
            criteria={criteria}
            onChangeDays={changeDaysHandler}
            onChangeHours={changeHoursHandler}
            onChangeArm={changeArmHandler}
            totalSelected={totalSelected}
            timeRange={timeRange}
            threshold={1}
          />
          <ContainerFlexRow>
            <Card>
              {!isData && (
                <p>
                  Nu există înregistrări pentru această combinație de criterii.
                </p>
              )}
              {isData && (
                <>
                  <PageHeader title="Generează raport (pdf)" />
                  <h3 className="c-primary">Work in progress...</h3>
                  <ul className="to-do-list">
                    <li className="bold">Informații raport:</li>
                    <li>
                      - obligatorii: nume, vârstă, perioadă (pe bază de filtre și date utlizator)
                    </li>
                    <li>
                      - opționale: medicație, statistici, istoric, comentarii
                      (pe bază de checkbox)
                    </li>
                    <li className="bold">Buton - Generează raport</li>
                    <li>
                      - generează/actualizează pdf în background (fără afișare)
                      - eventual si alte formate...
                    </li>
                    <li className="bold">Buton - Descarcă PDF</li>
                    <li>- inactiv până pdf-ul e pregătit</li>
                  </ul>
                </>
              )}
            </Card>
          </ContainerFlexRow>
        </>
      )}
    </>
  );
};

export default Report;
