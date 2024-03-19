import {
  usePostGoogleAuthMutation,
  usePostGoogleAuthVerifyMutation,
  usePostLoginMutation,
  usePostRefereshTokenMutation,
} from './auth-api';

export const useLoginController = () => {
  const [
    postLogin,
    {
      isError: isPostError,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
      error: postError,
      data: postLoginData,
    },
  ] = usePostLoginMutation();

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
    updateToken,
    {
      isLoading: isLoadingRefresh,
      isSuccess: isSucessRefresh,
      data: tokenData,
      error: errorRefresh,
    },
  ] = usePostRefereshTokenMutation();

  const actions = {
    updateToken,
    postGoogleAuth,
    postGoogleAuthVerify,
    postLogin,
  };
  const loading = {
    // post form login
    isPostError,
    isPostLoading,
    isPostSuccess,
    // google verify
    isVerifyError,
    isVerifyLoading,
    isVerifySuccess,
    // post google login loading
    isGoogleError,
    isGoogleLoading,
    isGoogleSucess,
    // refresh token
    isLoadingRefresh,
    isSucessRefresh,
  };
  const errors = {
    postError,
    errorRefresh,
    verifyError,
    postGoogleError,
  };
  const data = {
    postLoginData,
    verifyData,
    postGoogleData,
    tokenData,
  };
  return {actions, loading, errors, data};
};
