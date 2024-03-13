/* eslint-disable react-native/no-inline-styles */
import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {User} from '../../../Authentication/auth-api';
import Text from '../../../../components/Text/Text';

export const ProfileHeader = () => {
  const {user} = useSelector((state: User) => state.user);

  return (
    <View style={styles.container}>
      <View style={[styles.image, {backgroundColor: 'orange'}]}>
        <Text style={{fontSize: 23, fontWeight: '800'}}>
          {user?.firstName ? user?.firstName[0].toUpperCase() : null}
          {user?.lastName ? user?.lastName[0].toUpperCase() : null}
        </Text>
      </View>
      <Text style={styles.username}>
        {user?.firstName} {user?.lastName}
      </Text>
      <Text style={styles.email}>{user?.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 55.51,
    height: 55.51,
    borderRadius: 100,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  email: {
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: '400',
  },
});
