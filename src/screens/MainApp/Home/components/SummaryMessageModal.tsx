/* eslint-disable react-native/no-inline-styles */
import {Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../../../../components/Text/Text';
import Button from '../../../../components/Buttons/Button';
import {useDispatch} from 'react-redux';
import {reset} from '../../../../redux/ui';

interface CategoryModalProps {
  modal: boolean;
  setModal: Function;
}

const SummaryMessageModal = ({modal, setModal}: CategoryModalProps) => {
  const dispatch = useDispatch();
  const resetOrder = () => {
    setModal(false);
    dispatch(reset());
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <Modal
      statusBarTranslucent
      transparent
      animationType={'fade'}
      visible={modal}>
      <View style={styles.containerModal}>
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 8,
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <Text h2>Add New Items with Ongoing Transaction</Text>
          <Text h3>
            To include a new item in your cart, you can easily terminate the
            ongoing transaction and proceed to add the desired item to the cart
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingVertical: 10,
            }}>
            <Button
              label="Yes"
              onPress={resetOrder}
              style={{width: '45%'}}
              backgroundColor="orange"
              fontStyle={{color: '#000'}}
            />
            <Button
              label="No"
              // backgroundColor="transparent"
              style={{width: '45%'}}
              onPress={closeModal}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SummaryMessageModal;

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
});
