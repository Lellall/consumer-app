import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Text from '../../../components/Text/Text';
import { SettingsHeader } from './Components/SettingsHeader';
import { ArrowLeftIcon2 } from '../../../assets/Svg/Index';
import MenuItem from '../Shop/components/MenuItem';
import StatusCard from './Components/StatusCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MENUS = ['All', 'Pending', 'Completed', 'Rejected'];
const smapleData = [
  { date: '#2014', orderNum: '04', status: 'pending' },
  { date: '#2014', orderNum: '02', status: 'delivered' },
  { date: '#2014', orderNum: '01', status: 'canceled' },
  { date: '#2014', orderNum: '05', status: 'pending' },
];

export default function OrderScreen({ navigation }) {
  const [activeMenu, setActiveMenu] = useState(0);
  const handlePress = (ind) => {
    setActiveMenu(ind);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <SettingsHeader
          iconLeft={<ArrowLeftIcon2 />}
          title="My Orders"
          navigateLeftTo={'SettingsScreenIndex'}
          iconRight={false}
        />
      </ScrollView>
      <View>
        <ScrollView
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.menus}
          contentContainerStyle={styles.menuItems}>
          {MENUS.map((menu, ind) => (
            <MenuItem
              onPress={() => handlePress(ind)}
              title={menu}
              key={menu}
              active={ind == activeMenu}
            />
          ))}
        </ScrollView>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Date</Text>
          <Text>Order Number</Text>
          <Text>Status</Text>
          <Text>Actions</Text>
        </View>

        {smapleData.map((data) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('orderDetails')}
              style={styles.card}
              key={data.orderNum}>
              <Text>{data.date}</Text>
              <Text>{data.orderNum}</Text>
              <StatusCard
                pending={data.status === 'pending'}
                delivered={data.status === 'delivered'}
                canceled={data.status === 'canceled'}
              />
              <Text>{'...'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  menuItems: {
    flexDirection: 'row',
    padding: 10,
  },
  menus: {
    overflow: 'scroll',
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    height: 45,
    alignItems: 'center',
    borderColor: '#E7E7E7',
    marginVertical: 10,
  },
});
