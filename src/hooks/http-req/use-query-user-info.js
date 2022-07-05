import { differenceInYears, format } from 'date-fns';
import { useQuery } from 'react-query';
import axios from 'axios';

import useFirebaseUrl from '../use-firebase-url';

const useQueryUserInfo = () => {
  const { userInfoUrl } = useFirebaseUrl();

  const query = useQuery({
    queryKey: `getUserProfile`,
    queryFn: async () => await axios.get(userInfoUrl),
    select: (data) => data?.data,
    retry: 0,
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: 'always'
  });

  const { data, isLoading, isError, error, refetch } = query;

  if (error) console.log(error.message);

  let name = '';
  let birth = '';
  let birthInputFormat = '';
  let age = '';

  if (data) {
    const birthDate = new Date(data.birthStamp);
    birth = format(birthDate, 'dd.MM.yyyy');
    birthInputFormat = format(birthDate, 'yyyy-MM-dd');
    age = differenceInYears(new Date(), birthDate);
    name = data.name;
  }

  const hasProfile = !!name && !!birth;

  return {
    hasProfile,
    name,
    birth,
    birthInputFormat,
    age,
    isLoading,
    isError,
    error,
    refetch
  };
};

export default useQueryUserInfo;
