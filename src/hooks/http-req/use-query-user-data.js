import { useQuery } from 'react-query';
import axios from 'axios';

import useFirebaseUrl from '../use-firebase-url';
import { useAuthContext } from '../../store/auth-context';

const useQueryUserData = () => {
  const { userDataUrl } = useFirebaseUrl();
  const { token } = useAuthContext();

  const query = useQuery({
    queryKey: `getUserData`,
    queryFn: async () => await axios.post(userDataUrl, { idToken: token }),
    select: (data) => data?.data.users[0],
    retry: 0,
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: 'always'
  });

  const { data, isLoading, isError, error, refetch } = query;

  if (error) console.log(error.message);

  let email;
  let emailVerified;
  let nickname;

  if (data) {
    email = data.email;
    emailVerified = data.emailVerified;
    // emailVerified = true;
    nickname = data.displayName;
  }

  return {
    email,
    emailVerified,
    nickname,
    isLoading,
    isError,
    error,
    refetch
  };
};

export default useQueryUserData;
