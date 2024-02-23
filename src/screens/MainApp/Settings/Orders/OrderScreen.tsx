/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Text from '../../../../components/Text/Text';
import {SettingsHeader} from '../Components/SettingsHeader';
import {ArrowLeftIcon2} from '../../../../assets/Svg/Index';
import MenuItem from '../../Shop/components/MenuItem';
import StatusCard from '../Components/StatusCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useOrdersQuery} from '../payment-order-api';
import {useSelector} from 'react-redux';
import {User} from '../../../Authentication/auth-api';
import {EmptyState} from '../../../../components/EmptyState';
import LoadingState from '../../../../components/LoadingState';

const MENUS = ['All', 'Pending', 'Completed', 'Rejected'];

const sampleData = [
  {
    orderId: '1',
    orderCode: '3233',
    paymentItems: [
      {
        productId: 'string',
        count: 'number',
        productName: 'string',
        price: 'number',
      },
    ],
    status: 'PENDING',
    address: {
      streetName: 'string',
      houseNumber: 'string',
      apartmentName: 'string',
      estate: 'string',
      poBox: 'string',
    },
  },
  {
    orderId: '2',
    orderCode: '2032',
    paymentItems: [
      {
        productId: 'string',
        count: 'number',
        productName: 'string',
        price: 'number',
      },
    ],
    status: 'canceled',
    address: {
      streetName: 'string',
      houseNumber: 'string',
      apartmentName: 'string',
      estate: 'string',
      poBox: 'string',
    },
  },
  {
    orderId: '33',
    orderCode: '4032',
    paymentItems: [
      {
        productId: 'string',
        count: 'number',
        productName: 'string',
        price: 'number',
      },
    ],
    status: 'delivered',
    address: {
      streetName: 'string',
      houseNumber: 'string',
      apartmentName: 'string',
      estate: 'string',
      poBox: 'string',
    },
  },
];
export default function OrderScreen({navigation}) {
  const [activeMenu, setActiveMenu] = useState(0);
  const handlePress = ind => {
    setActiveMenu(ind);
  };
  const {user} = useSelector((state: User) => state.user);
  const {data, isLoading, isError, error} = useOrdersQuery(user.id);

  return (
    <View style={styles.container}>
      <SettingsHeader
        iconLeft={<ArrowLeftIcon2 />}
        title="My Orders"
        navigateLeftTo={'SettingsScreenIndex'}
        iconRight={false}
      />
      <>
        <EmptyState title={'No orders yet'} />
      </>
      {/* {isLoading ? (
        <LoadingState />
      ) : error?.data?.status === 403 ? (
        <EmptyState title={'No orders yet'} />
      ) : (
        <>
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
          <ScrollView>
            <View
              style={{
                paddingHorizontal: 20,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Date</Text>
                <Text>Order Number</Text>
                <Text>Status</Text>
                <Text>Actions</Text>
              </View>

              {sampleData.map(data => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('orderDetails')}
                    style={styles.card}
                    key={data.orderId}>
                    <Text>{data.orderId}</Text>
                    <Text>{data.orderCode}</Text>
                    <StatusCard
                      pending={data.status.toLocaleLowerCase() === 'pending'}
                      delivered={
                        data.status.toLocaleLowerCase() === 'delivered'
                      }
                      canceled={data.status.toLocaleLowerCase() === 'canceled'}
                    />
                    <Text>{'...'}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </>
      )} */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
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
