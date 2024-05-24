import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import StatusCard from '../Components/StatusCard';

const CardOrder = ({item}) => {
  return (
    <TouchableOpacity
      //   onPress={() => navigation.navigate('orderDetails')}
      style={[styles.card, {marginHorizontal: 10}]}
      key={item?.orderId}>
      <Text>{item?.orderCode}</Text>
      <Text>{item?.paymentItems?.length}</Text>
      <StatusCard
        pending={item?.status?.toLocaleLowerCase() === 'pending'}
        delivered={item?.status?.toLocaleLowerCase() === 'delivered'}
        accepted={item?.status?.toLocaleLowerCase() === 'accepted'}
        canceled={item?.status?.toLocaleLowerCase() === 'canceled'}
      />
      <Text>{'...'}</Text>
    </TouchableOpacity>
  );
};

export default CardOrder;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    // paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    height: 45,
    alignItems: 'center',
    borderColor: '#E7E7E7',
    marginVertical: 10,
  },
});
