/* eslint-disable react-native/no-inline-styles */
import {Modal, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {CloseIcon} from '../assets/Svg/Index';
import Text from './Text/Text';

interface ModalProps {
  open: boolean;
  closeModal: Function;
  header?: string;
  body?: string;
  children?: React.ReactNode;
}
const ModalWrapper = ({
  open,
  header,
  body,
  children,
  closeModal,
}: ModalProps) => {
  return (
    <Modal
      statusBarTranslucent
      transparent
      animationType={'fade'}
      visible={open}>
      <View style={styles.containerModal}>
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={{margin: 20}} h2>
              {header}
            </Text>

            <TouchableOpacity
              onPress={() => closeModal()}
              style={{padding: 20, borderRadius: 100}}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <View>
            <Text>{body}</Text>
          </View>
          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  containerModal: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    width: '100%',
  },
  body: {
    backgroundColor: '#fff',
    width: '95%',
    alignItems: 'center',
    // justifyContent: 'center',
    minHeight: 200,
    borderRadius: 10,
    padding: 15,
  },
});
