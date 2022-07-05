import { useQuery } from 'react-query';
import axios from 'axios';

import useFirebaseUrl from '../use-firebase-url';

const useQueryIsEmailSent = () => {
  const { emailSentUrl } = useFirebaseUrl();

  const query = useQuery({
    queryKey: `getIsEmailSent`,
    queryFn: async () => await axios.get(emailSentUrl),
    select: (data) => data?.data,
    retry: 0,
    cacheTime: Infinity,
    staleTime: 1,
    refetchOnWindowFocus: 'always',
    refetchOnMount: 'always',
    notifyOnChangeProps: ['data', 'error'],
  });

  const { data, isLoading, isError, error, refetch } = query;

  if (error) console.log(error.message);

  let isEmailSent = '';

  if (data) {
    isEmailSent = data.isEmailSent;
  }

  return {
    isEmailSent,
    isLoading,
    isError,
    error,
    refetch
  };
};

export default useQueryIsEmailSent;
