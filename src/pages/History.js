import styles from './History.module.css';
import HyperColorsSummary from '../components/elements/HyperColorsSummary';
import ContainerFlexColumn from '../components/layout/containers/ContainerFlexColumn';
import ContainerFlexRow from '../components/layout/containers/ContainerFlexRow';
import Card from '../components/UI/Card';
import LoadingAndError from '../components/elements/LoadingAndError';
import HistoryItem from '../components/elements/HistoryItem';
import FilterReadings from '../components/elements/FilterReadings';
import useQueryReadings from '../hooks/http-req/use-query-readings';
import useFilteredReadings from '../hooks/use-filtered-readings';

const History = () => {
  const { readings, isError, isLoading, refetch } = useQueryReadings();
  const {
    filteredReadings,
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
          {!isData && (
            <ContainerFlexRow>
              <Card className={styles['history-list']}>
                <p>
                  Nu există înregistrări pentru această combinație de criterii.
                </p>
              </Card>
            </ContainerFlexRow>
          )}
          {isData && (
            <ContainerFlexColumn className={styles['history-list']}>
              {filteredReadings?.map((reading) => (
                <HistoryItem
                  key={reading.id}
                  id={reading.id}
                  sis={reading.sis}
                  dia={reading.dia}
                  pulse={reading.pulse}
                  weight={reading.weight}
                  date={reading.date}
                  time={reading.time}
                  arm={reading.arm}
                  comment={reading.comment}
                  pulsePressure={reading.pulsePressure}
                  medianPressure={reading.medianPressure}
                />
              ))}
            </ContainerFlexColumn>
          )}
        </>
      )}
    </>
  );
};

export default History;
