import {Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../../../../components/Text/Text';
import Button from '../../../../components/Buttons/Button';
import {useSelector} from 'react-redux';
import {uiSelector} from '../../../../redux/ui';

const SummaryModal = ({open, data, setIsModalOpen}) => {
  const deliveryFee = data?.items.find(item => item.name === 'Delivery Fee');
  const serviceCharge = data?.items.find(
    item => item.name === 'Service Charge',
  );
  const items = data?.items.filter(item => item.type === 'PRODUCT');
  const {orderInfo} = useSelector(uiSelector);

  return (
    <Modal
      statusBarTranslucent
      transparent
      animationType={'fade'}
      visible={open}>
      <View style={styles.containerModal}>
        <View style={styles.SummaryContainer}>
          <Text h3>Total Items: {items?.length}</Text>
          <Text h3>Total Amount: {orderInfo.totalAmount}</Text>
          <Text h3>Delivery Fee: {deliveryFee?.totalAmount}</Text>
          <Text h3>Service Charge: {serviceCharge?.totalAmount}</Text>
          <Text h3>Total Cost: {data?.totalCost}</Text>
          <Button
            label="Close"
            style={{marginVertical: 10}}
            backgroundColor="orange"
            onPress={() => setIsModalOpen(false)}
          />
        </View>
      </View>
    </Modal>
  );C};

export default SummaryModal;

const styles = StyleSheet.create({
  containerModal: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 99999999999999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SummaryContainer: {
    backgroundColor: '#fff',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderRadius: 10,
    padding: 20,
  },
});
