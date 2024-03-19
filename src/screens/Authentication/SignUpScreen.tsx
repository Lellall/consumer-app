/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Dimensions,
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
import {
  AppleLogo,
  EmailIcon,
  GoogleIcon,
  UserIcon,
} from '../../assets/Svg/Index';
import Colors from '../../constants/Colors';
import {useFormik} from 'formik';
// import useAlert from '../../hooks/useAlert';
// import {useDispatch} from 'react-redux';

import Toast from 'react-native-toast-message';
import useDeepLink from '../../utils/useDeepLink';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/user/userSlice';
import {useSignUpController} from './useSignUpController';

const validationSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be more than eight characters')
    .required()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])/,
      'Password must contain at least one uppercase letter and one lowercase letter',
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  // phone: Yup.string().required(),
});
const initialValues = {
  first_name: '',
  last_name: '',
  password: '',
  confirm_password: '',
  email: '',
  address: '',
};

export default function SignUpScreen({
  navigation,
  signIn,
}: {
  navigation: any;
  signIn: () => {};
}) {
  const dispatch = useDispatch();
  const {value} = useDeepLink();

  const {actions, errors: SignupErrors, loading} = useSignUpController();
  const {
    isGoogleLoading,
    isSignupError,
    isSignupSuccess,
    isSignupLoading,
    isVerifySuccess,
  } = loading;
  const {postGoogleAuth, postSignup, postGoogleAuthVerify} = actions;
  const {signupError} = SignupErrors;
  // const {access_token, refresh_token} = useSelector(userSelector);
  // const [loadingScreen, setLoadingScrenn] = useState(true);
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm}) => {
      const {password, last_name, first_name, email} = values;
      postSignup({
        firstName: first_name,
        lastName: last_name,
        email: email.toLowerCase(),
        password: password,
        platformType: 'ANDROID',
        role: 'CONSUMER',
      });
      resetForm();
    },
  });

  const formatError = error => {
    if (error) {
      console.log('---------EREG', error);
      const {errors, data} = error;
      const message =
        data?.message || errors?.message || 'Something went wrong';
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
  }, [navigation, postGoogleAuthVerify, value, isVerifySuccess]);

  useEffect(() => {
    if (isSignupSuccess) {
      signIn();
      Toast.show({
        type: 'success',
        text1: 'Registered successfully 👋',
      });
    }
  }, [isSignupSuccess, signIn]);

  useEffect(() => {
    if (isSignupError) {
      Toast.show({
        type: 'error',
        text1: formatError(signupError),
      });
    }
  }, [isSignupError, signupError]);
  const {handleChange, handleSubmit, values, errors} = formik;
  const {password, email, first_name, last_name, confirm_password} = values;

  return (
    <View style={styles.container}>
      <Text style={{color: '#818391', textAlign: 'center'}}>
        Please fill in this form to create an account
      </Text>
      <Input
        label=""
        error={
          formik.touched.first_name && errors.first_name
            ? errors.first_name
            : ''
        }
        value={first_name}
        onChange={handleChange('first_name')}
        placeholder="First Name"
        Icon={<UserIcon color="#818391" />}
      />
      <Input
        label=""
        error={
          formik.touched.last_name && errors.last_name ? errors.last_name : ''
        }
        value={last_name}
        onChange={handleChange('last_name')}
        placeholder="Last Name"
        Icon={<UserIcon color="#818391" />}
      />
      <Input
        label=""
        error={formik.touched.email && errors.email ? errors.email : ''}
        value={email}
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
      />
      <Input
        label=""
        error={
          formik.touched.confirm_password && errors.confirm_password
            ? errors.confirm_password
            : ''
        }
        value={confirm_password}
        onChange={handleChange('confirm_password')}
        placeholder="Confirm Password"
        secureEntry={true}
      />
      <Button
        // onPress={() => navigation.navigate('Otp')}
        onPress={handleSubmit}
        isLoading={isSignupLoading}
        style={{
          borderRadius: 20,
          marginTop: 20,
        }}
        label="Create Account"
      />

      <View style={styles.otherSign}>
        <Text style={{color: '#AAAAAA'}}>Other sign in options</Text>

        <TouchableOpacity
          onPress={async () => {
            const data1 = await postGoogleAuth('');
            console.log(data1, 'lll');
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
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => signIn()} style={{marginLeft: 10}}>
          <Text style={{fontSize: 12, color: Colors.general.secondary}}>
            Sign In
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
            navigation.navigate('MainApp');
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
