import { useParams } from 'react-router-dom';

import ContainerFlexColumn from '../components/layout/containers/ContainerFlexColumn';
import ContainerFlexRow from '../components/layout/containers/ContainerFlexRow';
import Card from '../components/UI/Card';
import LoadingAndError from '../components/elements/LoadingAndError';
import ProfileUserInfo from '../components/elements/ProfileUserInfo';
import ProfileUserData from '../components/elements/ProfileUserData';
import ProfileEmailNotVerified from '../components/elements/ProfileEmailNotVerified';
import ChangeUserInfoForm from '../components/forms/ChangeUserInfoForm';
import ChangeNicknameForm from '../components/forms/ChangeNicknameForm';
import ChangeEmailForm from '../components/forms/ChangeEmailForm';
import ChangePasswordForm from '../components/forms/ChangePasswordForm';
import useQueryUserInfo from '../hooks/http-req/use-query-user-info';
import useQueryUserData from '../hooks/http-req/use-query-user-data';
import {
  R_UPDATE_NICK,
  R_UPDATE_MAIL,
  R_UPDATE_PASS,
  R_UPDATE_INFO
} from '../helpers/global-constants';

const UserProfile = () => {
  const { params } = useParams();
  const {
    isLoading: loadingUserInfo,
    isError: errorUserInfo,
    refetch: refetchUserInfo
  } = useQueryUserInfo();
  const {
    email,
    emailVerified,
    isLoading: loadingUserData,
    isError: errorUserData,
    refetch: refetchUserData
  } = useQueryUserData();
  
  const isLoading = loadingUserInfo || loadingUserData;
  const isError = errorUserInfo || errorUserData;
  const refetchData = () => {
    if (errorUserInfo) refetchUserInfo();
    if (errorUserData) refetchUserData();
  };

  switch (params) {
    case R_UPDATE_INFO.substring(1):
      return (
        <ContainerFlexRow>
          <Card>
            <ChangeUserInfoForm />
          </Card>
        </ContainerFlexRow>
      );
    case R_UPDATE_NICK.substring(1):
      return (
        <ContainerFlexRow>
          <Card>
            <ChangeNicknameForm />
          </Card>
        </ContainerFlexRow>
      );
    case R_UPDATE_MAIL.substring(1):
      return (
        <ContainerFlexRow>
          <Card>
            <ChangeEmailForm />
          </Card>
        </ContainerFlexRow>
      );
    case R_UPDATE_PASS.substring(1):
      return (
        <ContainerFlexRow>
          <Card>
            <ChangePasswordForm />
          </Card>
        </ContainerFlexRow>
      );
    default:
      return (
        <>
          <LoadingAndError
            isLoading={isLoading}
            isError={isError}
            refetch={refetchData}
          />
          {!isLoading && !isError && (
            <ContainerFlexColumn>
              <Card>
                <ProfileUserInfo />
              </Card>
              <Card>
                <ProfileUserData />
              </Card>
              {emailVerified === false && (
                <ProfileEmailNotVerified email={email} />
              )}
            </ContainerFlexColumn>
          )}
        </>
      );
  }
};

export default UserProfile;
