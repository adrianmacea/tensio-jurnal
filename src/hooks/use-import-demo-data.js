import { useCallback } from 'react';

import useFetch from '../hooks/http-req/use-fetch-generic';
import useFirebaseUrl from '../hooks/use-firebase-url';
import { READING_SAMPLES } from '../helpers/readings-sample';
import useQueryReadings from '../hooks/http-req/use-query-readings';

const useImportDemoData = () => {
  const { readingsUrl } = useFirebaseUrl();
  const { sendRequest } = useFetch();
  const { refetch } = useQueryReadings();

  const populateDatabase = useCallback(() => {
    READING_SAMPLES.forEach((reading) => {
      const requestConfig = {
        url: readingsUrl,
        method: 'POST',
        body: reading,
        headers: { 'Content-Type': 'aplication/json' }
      };
      const applyDataFn = () => {
        console.log('readings added');
      };
      sendRequest(requestConfig, applyDataFn);
    });
    setTimeout(() => {
      refetch();
      console.log('refetched readings');
    }, 2400);
  }, [readingsUrl, refetch, sendRequest]);

  return { populateDatabase };
};

export default useImportDemoData;
