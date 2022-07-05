import { useMutation } from 'react-query';
import axios from 'axios';

import useFirebaseUrl from '../use-firebase-url';
import useMutationIsEmailSent from './use-mutation-is-email-sent';
import { useAuthContext } from '../../store/auth-context';

const useMutationSendEmailVerif = (email) => {
  const { sendEmailVerifUrl } = useFirebaseUrl();
  const { token } = useAuthContext();
  const { updateIsEmailSent } = useMutationIsEmailSent();

  const mutation = useMutation(
    () => {
      return axios.post(sendEmailVerifUrl, {
        requestType: 'VERIFY_EMAIL',
        idToken: token
      });
    },
    {
      onSuccess: (data) => {
        const emailedTo = data.data.email;
        console.log('Verification email was sent.');
        if (email === emailedTo) {
          updateIsEmailSent(true);
          console.log('updateIsEmailSent(true)');
        }
      },
      onError: (err) => console.log(err)
    }
  );

  const {
    mutate: sendEmailVerifRequest,
    isLoading,
    isError,
    error
  } = mutation;

  return { sendEmailVerifRequest, isLoading, isError, error };
};

export default useMutationSendEmailVerif;
