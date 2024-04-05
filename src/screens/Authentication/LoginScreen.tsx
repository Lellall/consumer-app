/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import React, {useEffect} from 'react';
import Input from '../../components/Inputs/Input';
import Text from '../../components/Text/Text';
import Button from '../../components/Buttons/Button';
import {AppleLogo, EmailIcon, GoogleIcon} from '../../assets/Svg/Index';
import Colors from '../../constants/Colors';
import {useFormik} from 'formik';
import {Logo} from '../../assets/Images';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {setUser, userSelector} from '../../redux/user/userSlice';
import useDeepLink from '../../utils/useDeepLink';
import {useLoginController} from './useLoginController';

export default function LoginScreen({navigation, signUp}) {
  const {access_token} = useSelector(userSelector);
  // const [loadingScreen, setLoadingScrenn] = useState(true);
  const {value} = useDeepLink();
  const initialValues = {
    password: '',
    email: '',
    role: '',
  };
  const dispatch = useDispatch();
  const {actions, data, loading, errors: loginErrors} = useLoginController();
  const {
    isPostError,
    isPostLoading,
    isPostSuccess,
    isVerifySuccess,
    isGoogleLoading,
  } = loading;
  const {postGoogleAuth, postGoogleAuthVerify, postLogin} = actions;
  const {postLoginData} = data;
  const {postError} = loginErrors;

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Password must be more than six characters')
      .required('Password is required')
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])/,
        'Password must contain at least one uppercase letter and one lowercase letter',
      ),
    email: Yup.string()
      .required('Registered email address is required')
      .email(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      const {email, password} = values;
      postLogin({
        email: email.toLowerCase(),
        password,
        role: 'CONSUMER',
      });
    },
  });
  const formatError = error => {
    if (error) {
      const {errors, data} = error;
      console.log('---------E', error);

      const message =
        data?.detail ||
        errors?.message ||
        data?.message ||
        'Something went wrong';
      return message;
    }
  };

  useEffect(() => {
    if (value) {
      postGoogleAuthVerify({
        code: value,
      });
    }

    if (isVerifySuccess) {
      navigation.navigate('MainApp');
    }
  }, [isVerifySuccess, navigation, postGoogleAuthVerify, value]);

  useEffect(() => {
    if (isPostSuccess) {
      navigation.navigate('MainApp');
      dispatch(setUser(postLoginData));
    }
    if (isPostError) {
      Toast.show({
        type: 'error',
        text1: formatError(postError),
      });
    }
  }, [
    isPostSuccess,
    isPostError,
    navigation,
    dispatch,
    postLoginData,
    postError,
  ]);

  useEffect(() => {
    if (value) {
      postGoogleAuthVerify({
        code: value,
      });
    }

    if (isVerifySuccess) {
      navigation.navigate('MainApp');
    }
  }, [isVerifySuccess, navigation, postGoogleAuthVerify, value]);

  const {values, handleChange, handleSubmit, errors} = formik;
  const {password, email} = values;

  useEffect(() => {
    if (access_token) {
      navigation.replace('MainApp');
    }
  }, [access_token, navigation]);

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.logo} source={Logo} />
      <Text h1>Create Account</Text>
      <Text style={{color: '#818391', textAlign: 'center', marginVertical: 20}}>
        Log back into your account with your credentials
      </Text>

      <Input
        label=""
        error={formik.touched.email && errors.email ? errors.email : ''}
        value={email}
        autoCompleteKeyWord="email"
        onChange={handleChange('email')}
        placeholder="Email"
        Icon={<EmailIcon />}
      />
      <Input
        label=""
        error={
          formik.touched.password && errors.password ? errors.password : ''
        }
        value={password}
        onChange={handleChange('password')}
        placeholder="Password"
        secureEntry={true}
        // Icon={<EyeClosed />}
      />

      <TouchableOpacity
        style={{
          marginLeft: 'auto',
          marginTop: 10,
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#E41749',
          }}>
          Forgot Password ?
        </Text>
      </TouchableOpacity>

      <Button
        onPress={handleSubmit}
        style={{
          borderRadius: 20,
          marginTop: 20,
        }}
        label={'Sign In'}
        isLoading={isPostLoading}
      />
      <View style={styles.otherSign}>
        <Text style={{color: '#AAAAAA'}}>Other sign in options</Text>

        <TouchableOpacity
          onPress={async () => {
            const data1 = await postGoogleAuth('');
            Linking.openURL(data1.error.data);
          }}
          style={styles.option}>
          {isGoogleLoading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <GoogleIcon />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <AppleLogo />
        </TouchableOpacity>
      </View>

      <View style={styles.haveAccount}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => signUp()} style={{marginLeft: 10}}>
          <Text style={{fontSize: 12, color: Colors.general.secondary}}>
            Sign up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginLeft: 10,
            borderLeftWidth: 1,
            borderLeftColor: Colors.general.border,
            paddingHorizontal: 10,
          }}
          onPress={() => {
            navigation.navigate('MainApp');
            dispatch(
              setUser({
                refresh_token: '',
                access_token: '',
                token_type: '',
                user: {
                  id: 'string',
                  username: 'Anonymous',
                  firstName: 'Anonymous',
                  lastName: 'Anonymous',
                  role: 'Consumer',
                  isEmailVerified: false,
                  registrationSource: '',
                  streetName: '',
                  houseNumber: '',
                  apartmentName: '',
                  estate: '',
                  poBox: '',
                  trial: true,
                },
              }),
            );
          }}>
          <Text style={{fontSize: 12, color: Colors.general.border}}>
            Skip for now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
    height: Dimensions.get('window').height,
    alignItems: 'center',
  },
  divider: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9EAEE',
  },
  button: {
    backgroundColor: '#fff',
    marginVertical: 10,
    borderColor: '#AAAAAA',
    borderWidth: 1,
    borderRadius: 20,
  },
  privacy: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
  },
  otherSign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  option: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.general.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  haveAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
