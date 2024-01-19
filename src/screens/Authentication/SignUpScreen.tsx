/* eslint-disable react-native/no-inline-styles */
import {
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
import {
  usePostGoogleAuthMutation,
  usePostGoogleAuthVerifyMutation,
  usePostSignupMutation,
} from './auth-api';
import Toast from 'react-native-toast-message';
import useDeepLink from '../../utils/useDeepLink';

export default function SignUpScreen({navigation, signIn}) {
  const {value} = useDeepLink();

  const initialValues = {
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    email: '',
    address: '',
  };

  const [postSignup, {isLoading, isSuccess, isError, error}] =
    usePostSignupMutation();

  const [postGoogleAuthVerify, {isSuccess: verifySuccess}] =
    usePostGoogleAuthVerifyMutation();

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

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      const {password, last_name, first_name, email} = values;
      postSignup({
        firstName: first_name,
        lastName: last_name,
        email: email.toLowerCase(),
        password: password,
        platformType: 'ANDROID',
        role: 'CONSUMER',
      });
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

  const [
    googleSignup,
    {isLoading: isGoogleLoadin, isSuccess: isGoogleSuccess},
  ] = usePostGoogleAuthMutation();

  useEffect(() => {
    if (isSuccess) {
      signIn();
      Toast.show({
        type: 'success',
        text1: 'Registered successfully 👋',
      });
    }
  }, [isSuccess, signIn]);
  useEffect(() => {
    if (value) {
      postGoogleAuthVerify({
        code: value,
      });
    }
    if (verifySuccess) {
      navigation.navigate('MainApp');
    }
  }, [navigation, postGoogleAuthVerify, value, verifySuccess]);

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: formatError(error),
      });
    }
  }, [isError, error]);
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
        Icon={<UserIcon height={20} width={20} color="#AAAAAA" />}
      />
      <Input
        label=""
        error={
          formik.touched.last_name && errors.last_name ? errors.last_name : ''
        }
        value={last_name}
        onChange={handleChange('last_name')}
        placeholder="Last Name"
        Icon={<UserIcon height={20} width={20} color="#AAAAAA" />}
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
        Icon={<EmailIcon />}
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
        Icon={<EmailIcon />}
      />
      <Button
        // onPress={() => navigation.navigate('Otp')}
        onPress={handleSubmit}
        isLoading={isLoading}
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
            const data1 = await googleSignup('');
            console.log(data1, 'lll');
            Linking.openURL(data1.error.data);
          }}
          style={styles.option}>
          <GoogleIcon />
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
