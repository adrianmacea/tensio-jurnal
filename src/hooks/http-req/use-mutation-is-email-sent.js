import { useMutation } from 'react-query';
import axios from 'axios';

import useFirebaseUrl from '../use-firebase-url';

const useMutationIsEmailSent = () => {
  const { emailSentUrl } = useFirebaseUrl();

  const mutation = useMutation((value) => {
    return axios.put(emailSentUrl, { isEmailSent: value });
  });

  const { mutate: updateIsEmailSent, isLoading, isError, error } = mutation;

  return { updateIsEmailSent, isLoading, isError, error };
};

export default useMutationIsEmailSent;
