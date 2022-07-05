import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { useEffect } from 'react';

// import useQueryUserData from '../hooks/http-req/use-query-user-data';
// import { useModalContext } from '../store/modal-context';
import styles from './HomePage.module.css';
import HyperColorsSummary from '../components/elements/HyperColorsSummary';
import LoadingAndError from '../components/elements/LoadingAndError';
import ContainerFlexColumn from '../components/layout/containers/ContainerFlexColumn';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import CurrentMonth from '../components/elements/CurrentMonth';
import ScatterCh from '../components/charts/ScatterCh';
import useQueryReadings from '../hooks/http-req/use-query-readings';
import useFilteredReadings from '../hooks/use-filtered-readings';
import Line from '../components/UI/Line';

import useImportDemoData from '../hooks/use-import-demo-data';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import { usePanelsContext } from '../store/panels-context';
import {
  B_TEXT,
  F_24H,
  F_BOTH,
  MIN_START_DATE,
  R_READING
} from '../helpers/global-constants';

const HomePage = () => {
  const [isPopulating, setIsPopulating] = useState(false);
  const { populateDatabase } = useImportDemoData();

  const importDataHandler = () => {
    setIsPopulating(true);
    populateDatabase();
  };

  // below is the email validation check - disabled for the moment
  // const { emailVerified, email } = useQueryUserData();
  // const { showModal, setModalData } = useModalContext();
  // useEffect(() => {
  //   if (emailVerified === false) {
  //     setModalData(
  //       `Pentru a valida contul accesează linkul trimis la adresa de e-mail furnizată.`
  //     );
  //     showModal('email-verified');
  //   }
  // }, [email, emailVerified, setModalData, showModal]);

  const { readings, isError, isLoading, refetch } = useQueryReadings();
  const navigate = useNavigate();
  const { windowWidth } = usePanelsContext();
  const isWindowWidth = windowWidth > 688;

  const lastTenReadings = readings.slice(0, 10);
  const criteriaLastTenReadings = {
    days: `6${MIN_START_DATE}`,
    hours: F_24H,
    arm: F_BOTH
  };
  const {
    totalSelected: totalLastTenReadings,
    formatedData: dataLastTenReadings,
    timeRange: timeRangeLastTenReadings,
    tickValues
  } = useFilteredReadings(lastTenReadings, criteriaLastTenReadings);
  const { scatterData } = dataLastTenReadings;
  const { sisValues, diaValues } = tickValues;

  const message =
    'Monitorizarea zilnică a tensiunii arteriale este esențială pentru o evaluare precisă.';

  const clickHandler = () => {
    navigate(R_READING, { replace: false });
  };

  const has3Readings = readings.length > 2;

  return (
    <>
      <HyperColorsSummary />
      <LoadingAndError
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
      {!isLoading && !isError && (
        <ContainerFlexColumn>
          {readings.length < 25 && (
            <Card className="bg-primary">
              {!isPopulating && (
                <>
                  <p className="c-light">
                  Încarcă date "demo" în aplicație pentru a-i testa mai ușor funcționalitățile.
                  </p>
                  <Line />
                  <Button
                    text="Încarcă date demo"
                    onClick={importDataHandler}
                    styles={B_TEXT}
                  />
                  <Line />
                </>
              )}
              {isPopulating && (
                <>
                  <p className="c-light">Se încarcă datele!</p>
                  <LoadingSpinner color="light" />
                </>
              )}
            </Card>
          )}
          <CurrentMonth readings={readings} />
          <Card>
            <p className={styles['home--message']}>{message}</p>
            <Button text="Adaugă o citire" onClick={clickHandler} />
          </Card>
          {has3Readings && (
            <ScatterCh
              data={scatterData}
              xTickValues={diaValues}
              yTickValues={sisValues}
              labelText={`Ultimele ${totalLastTenReadings} citiri`}
              descriptionText={timeRangeLastTenReadings}
              isWindowWidth={isWindowWidth}
            />
          )}
        </ContainerFlexColumn>
      )}
    </>
  );
};

export default HomePage;
