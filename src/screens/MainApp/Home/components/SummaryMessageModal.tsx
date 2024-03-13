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
        <View style={styles.main}>
          <Text h2 style={{textAlign: 'center'}}>
            Are you sure ?
          </Text>
          <Text h3>
            To include a new item to your cart, you need to terminate your
            ongoing transaction.
          </Text>

          <View
            style={{
              padding: 5,
              marginVertical: 10,
              borderWidth: 1,
              borderTopColor: 'lightgrey',
              borderBottomColor: 'lightgrey',
              borderRightColor: 'white',
              borderLeftColor: 'white',
            }}>
            <Button
              label="Yes, Terminate Transaction"
              onPress={resetOrder}
              style={{
                width: '100%',
              }}
              backgroundColor="transparent"
              fontStyle={{color: 'red'}}
            />
          </View>

          <View>
            <Button
              label="Cancel"
              backgroundColor="transparent"
              onPress={closeModal}
              fontStyle={{
                color: '#000',
              }}
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
  main: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
