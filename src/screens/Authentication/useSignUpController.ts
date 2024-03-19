import {
  usePostGoogleAuthMutation,
  usePostGoogleAuthVerifyMutation,
  usePostSignupMutation,
} from './auth-api';

export const useSignUpController = () => {
  const [
    postGoogleAuth,
    {
      isLoading: isGoogleLoading,
      isSuccess: isGoogleSucess,
      isError: isGoogleError,
      data: postGoogleData,
      error: postGoogleError,
    },
  ] = usePostGoogleAuthMutation();
  const [
    postGoogleAuthVerify,
    {
      isLoading: isVerifyLoading,
      isError: isVerifyError,
      isSuccess: isVerifySuccess,
      data: verifyData,
      error: verifyError,
    },
  ] = usePostGoogleAuthVerifyMutation();

  const [
    postSignup,
    {
      data: postSignUpData,
      isLoading: isSignupLoading,
      isSuccess: isSignupSuccess,
      isError: isSignupError,
      error: signupError,
    },
  ] = usePostSignupMutation();

  const actions = {postGoogleAuth, postSignup, postGoogleAuthVerify};
  const loading = {
    isSignupLoading,
    isSignupSuccess,
    isSignupError,
    isGoogleError,
    isGoogleLoading,
    isGoogleSucess,
    isVerifyError,
    isVerifyLoading,
    isVerifySuccess,
  };
  const errors = {postGoogleError, signupError, verifyError};
  const data = {postGoogleData, postSignUpData, verifyData};
  return {actions, loading, errors, data};
};
