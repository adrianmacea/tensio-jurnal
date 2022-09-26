import { format } from 'date-fns';
import { useQuery } from 'react-query';
import axios from 'axios';

import useFirebaseUrl from '../use-firebase-url';
import useTimeRange from '../use-time-range';

const useQueryReadings = () => {
  const { readingsUrl } = useFirebaseUrl();

  const query = useQuery({
    queryKey: `getReadings`,
    queryFn: async () => await axios.get(readingsUrl),
    select: (data) => data.data, // takes a fn that transforms the returned "data"
    retry: 0,
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: 'always',
    refetchOnMount: 'always'
  });

  const { data, isLoading, isError, error, refetch, remove } = query;

  if (error) console.log(error.message);

  let readings = [];
  for (const key in data) {
    const date = new Date(data[key].timestamp);
    const pulsePressure = data[key].sis - data[key].dia;
    const medianPressure = (pulsePressure / 3 + data[key].dia).toFixed(0);
    readings.push({
      id: key,
      sis: +data[key].sis,
      dia: +data[key].dia,
      pulse: +data[key].puls,
      weight: +data[key].weight,
      timestamp: data[key].timestamp,
      date: format(date, 'dd.MM.yyyy'),
      time: format(date, 'HH:mm'),
      arm: data[key].arm,
      comment: data[key].comment ? data[key].comment : null,
      pulsePressure: pulsePressure,
      medianPressure: medianPressure
    });
  }

  readings.sort((a, b) => b.timestamp - a.timestamp);
  const mostRecentWeight = readings[0]?.weight;
  const { hourStart, hourEnd } = useTimeRange();

  const latestEntryInThisTimeRange = readings?.find(
    (element) =>
      +element.time.slice(0, 2) >= hourStart &&
      +element.time.slice(0, 2) < hourEnd
  );
  const mostRecentArmInThisTimeRange = latestEntryInThisTimeRange?.arm;
  // const mostRecentArm = readings[0]?.arm;

  return {
    readings,
    mostRecentWeight,
    mostRecentArm: mostRecentArmInThisTimeRange,
    isLoading,
    error,
    isError,
    refetch,
    remove
  };
};

export default useQueryReadings;
