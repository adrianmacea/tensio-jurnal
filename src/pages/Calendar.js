import HyperColorsSummary from '../components/elements/HyperColorsSummary';
import ContainerFlexRow from '../components/layout/containers/ContainerFlexRow';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoadingAndError from '../components/elements/LoadingAndError';
import CalendarItem from '../components/elements/CalendarItem';
import useCalendarReadings from '../hooks/use-calendar-readings';
import useQueryReadings from '../hooks/http-req/use-query-readings';
import { useNavigate } from 'react-router-dom';
import { R_READING } from '../helpers/global-constants';

const Calendar = () => {
  const { isError, isLoading, refetch } = useQueryReadings();
  const { calendarReadings } = useCalendarReadings();
  const navigate = useNavigate();

  const uniqueMonthsArr = Object.keys(calendarReadings);

  const message =
    'Nu ai nici o citire înregistrată.';
  const clickHandler = () => {
    navigate(R_READING, { replace: false });
  };

  return (
    <>
      <HyperColorsSummary />
      <LoadingAndError
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
      {!isLoading && !isError && (
        <ContainerFlexRow>
          {uniqueMonthsArr.map((mon, i) => (
            <CalendarItem key={i} month={mon} />
          ))}
          {uniqueMonthsArr.length === 0 && (
            <Card>
              <p>{message}</p>
              <Button text="Adaugă o citire" onClick={clickHandler} />
            </Card>
          )}
        </ContainerFlexRow>
      )}
    </>
  );
};

export default Calendar;
