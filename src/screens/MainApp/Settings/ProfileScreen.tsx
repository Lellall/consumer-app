/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import {SettingsHeader} from './Components/SettingsHeader';
import {ProfileHeader} from './Components/ProfileHeader';
import Input from '../../../components/Inputs/Input';
import Button from '../../../components/Buttons/Button';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {User, useUpdateProfileMutation} from '../../Authentication/auth-api';
import React, {useEffect} from 'react';
import {FormikErrors, useFormik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
// import Colors from '../../../constants/Colors';

/*
 "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phoneNumber": "string",
  "password": "string",
  "role": "CONSUMER",
  "registrationSource": "GOOGLE",
  "platformType": "WEB",
  "isEmailVerified": true,
  "address": {
    "streetName": "string",
    "houseNumber": "string",
    "apartmentName": "string",
    "estate": "string",
    "poBox": "string"
  },
*/

export default function ProfileScreen() {
  const {user} = useSelector((state: User) => state.user);
  const {
    firstName,
    lastName,
    username,
    id,
    isEmailVerified,
    registrationSource,
    role,
  } = user;

  const [updateProfile, {isLoading, isSuccess, isError, error}] =
    useUpdateProfileMutation();
  console.log(error);
  const initialValues = {
    firstName,
    lastName,
    username: username,
    id,
    isEmailVerified,
    registrationSource,
    platformType: 'ANDROID',
    role,
    phoneNumber: '',
    // password: '',
    streetName: '',
    houseNumber: '',
    apartmentName: '',
    estate: '',
    poBox: '',
  };

  const validationSchema = Yup.object({
    streetName: Yup.string().required('Street Name is required'),
    houseNumber: Yup.string().required('House Number is required'),
    apartmentName: Yup.string().required('Apartment Name is required'),
    estate: Yup.string().required('Estate is required'),
    poBox: Yup.string().required('PO Box is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      // Extract the address fields from values
      const {apartmentName, estate, streetName, poBox, houseNumber} = values;
      let address = {
        apartmentName,
        estate,
        streetName,
        poBox,
        houseNumber,
      };
      const remainingValues = {
        // Remove the address fields that are now in the `address` object
        ...Object.fromEntries(
          Object.entries(values).filter(
            ([key]) =>
              ![
                'apartmentName',
                'estate',
                'streetName',
                'poBox',
                'houseNumber',
              ].includes(key),
          ),
        ),
      };

      // Create the final data object with the updated address
      const data = {
        ...remainingValues,
        address: address,
      };
      // Create a new data object with the updated address

      console.log('--------------');
      console.log(data);

      updateProfile(values);
    },
  });
  const {values, handleChange, handleSubmit, errors} = formik;
  const {
    phoneNumber,
    // password,
    streetName,
    apartmentName,
    estate,
    houseNumber,
    poBox,
  } = values;

  const formatError = (
    error: FormikErrors<{
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      password: string;
      streetName: string;
      houseNumber: string;
      apartmentName: string;
      estate: string;
      poBox: string;
    }>,
  ) => {
    console.log('---------E', error);

    if (error) {
      const {errors, data} = error;
      const message =
        data?.detail ||
        errors?.message ||
        data?.message ||
        data?.error?.message ||
        'Something went wrong';
      return message;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Profile has been updated successfully',
      });
    }
    if (isError) {
      Toast.show({
        type: 'error',
        text1: formatError(errors),
      });
    }
  }, [isSuccess, isError, errors]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <SettingsHeader
          title="Profile"
          iconRight
          //
          iconLeft={undefined}
          navigateLeftTo={undefined}
        />
        <ProfileHeader />
        <View style={styles.form}>
          <Input
            label="Firstname"
            disabled
            placeholder="Jane"
            value={firstName}
          />
          <Input label="Lastname" disabled placeholder="Doe" value={lastName} />
          <Input
            label="Email Address"
            placeholder="janedoe@gmail.com"
            value={username}
            disabled
          />
          <Input
            label="Phone number"
            value={phoneNumber}
            placeholder="08105473245"
            onChange={handleChange('phoneNumber')}
          />
          {/* <Input label="Date of Birth" placeholder="12-07-1998" /> */}
          <Input
            label="Street Name"
            placeholder="street name"
            value={streetName}
            onChange={handleChange('streetName')}
            error={
              formik.touched.streetName && errors.streetName
                ? errors.streetName
                : ''
            }
          />
          <Input
            label="House Number"
            placeholder="House Number"
            value={houseNumber}
            onChange={handleChange('houseNumber')}
            error={
              formik.touched.houseNumber && errors.houseNumber
                ? errors.houseNumber
                : ''
            }
          />
          <Input
            label="Apartment Name"
            placeholder="Apartment"
            value={apartmentName}
            onChange={handleChange('apartmentName')}
            error={
              formik.touched.apartmentName && errors.apartmentName
                ? errors.apartmentName
                : ''
            }
          />
          <Input
            label="Estate"
            placeholder="Estate"
            value={estate}
            onChange={handleChange('estate')}
            error={formik.touched.estate && errors.estate ? errors.estate : ''}
          />
          <Input
            label="P O Box"
            placeholder="P O Box"
            value={poBox}
            onChange={handleChange('poBox')}
            error={formik.touched.poBox && errors.poBox ? errors.poBox : ''}
          />
          {/* <Button
            style={{
              borderRadius: 20,
              marginTop: 10,
            }}
            fontStyle={{fontSize: 14}}
            label="Update Profile Information"
            onPress={handleSubmit}
            isLoading={isLoading}
          /> */}
          {/* <Button
            style={{
              borderRadius: 20,
              marginTop: 10,
              backgroundColor: '#fff',
            }}
            fontStyle={{color: 'red', fontSize: 14}}
            label="Deactivate Account"
          /> */}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    alignSelf: 'center',
    width: '90%',
  },
});
