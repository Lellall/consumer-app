/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SettingsHeader} from './Components/SettingsHeader';
import {ProfileHeader} from './Components/ProfileHeader';
import Input from '../../../components/Inputs/Input';
import Button from '../../../components/Buttons/Button';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {User} from '../../Authentication/auth-api';
// import Colors from '../../../constants/Colors';

export default function ProfileScreen({navigation}) {
  const {user} = useSelector((state: User) => state.user);
  const {firstName, lastName, username} = user;

  return (
    <View style={styles.container}>
      <ScrollView>
        <SettingsHeader
          title="Profile"
          iconRight
          // navigation={navigation}
          iconLeft={undefined}
          navigateLeftTo={undefined}
        />
        <ProfileHeader />
        <View style={styles.form}>
          <Input label="Firstname" placeholder="Jane" value={firstName} />
          <Input label="Lastname" placeholder="Doe" value={lastName} />
          <Input
            label="Email Address"
            placeholder="janedoe@gmail.com"
            value={username}
          />
          {/* <Input label="Phone number" placeholder="08105473245" /> */}
          {/* <Input label="Date of Birth" placeholder="12-07-1998" /> */}
          <Button
            style={{
              borderRadius: 20,
              marginTop: 10,
            }}
            fontStyle={{fontSize: 14}}
            label="Update Profile Information"
          />
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
