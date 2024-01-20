import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {SettingsHeader} from '../Settings/Components/SettingsHeader';
import Text from '../../../components/Text/Text';
import NotificationItem from './components/NotificationItem';

export default function Notifications({navigation}) {
  return (
    <View style={styles.container}>
      <SettingsHeader title="Notification" navigation={navigation} />
      <View style={styles.notification}>
        <View style={styles.decoration} />
        <Text h3 style={{color: '#aaa'}}>
          1 Unread
        </Text>
      </View>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingHorizontal: 20}}>
        <NotificationItem />
        <NotificationItem read />
        <NotificationItem read />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  decoration: {
    backgroundColor: '#F06D06',
    width: 7,
    height: 7,
    borderRadius: 7,
    marginRight: 10,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 20,
  },
});
