import { useEffect } from 'react';

import Card from '../UI/Card';
import AlertText from '../UI/AlertText';
import Line from '../UI/Line';
import useQueryIsEmailSent from '../../hooks/http-req/use-query-is-email-sent';
import useMutationSendEmailVerif from '../../hooks/http-req/use-mutation-send-email-verif';
import { S_ALERT } from '../../helpers/global-constants';

const ProfileEmailNotVerified = (props) => {
  const { email } = props;
  const {
    isEmailSent,
    isLoading,
    isError,
    refetch: refetchIsEmailSent
  } = useQueryIsEmailSent();
  const { sendEmailVerifRequest } = useMutationSendEmailVerif(email);

  useEffect(() => {
    const timer = setTimeout(() => {
      refetchIsEmailSent();
      if (isEmailSent !== true) {
        sendEmailVerifRequest();
      }
    }, 1020);    
    return () => {
      clearTimeout(timer);
    };
  }, [isEmailSent, refetchIsEmailSent, sendEmailVerifRequest]);

  return (
    <>
      {!isLoading && !isError && (
        <Card>
          <AlertText
            text="Adresă de email neverificată!"
            color={`c${S_ALERT}`}
          />
          <Line shortLine={true} closer={true} />
          {!isEmailSent && (
            <p>
              Imediat vei primi un email de verificare la adresa:{' '}
              <span className="bold">{email}</span>.
            </p>
          )}
          {isEmailSent && (
            <p>
              Accesează linkul trimis către email:{' '}
              <span className="bold">{email}</span> pentru a-ți valida contul.
            </p>
          )}
        </Card>
      )}
    </>
  );
};

export default ProfileEmailNotVerified;
