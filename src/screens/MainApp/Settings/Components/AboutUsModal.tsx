/* eslint-disable react-native/no-inline-styles */
import {Modal, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from '../../../../components/Text/Text';
import {CloseIcon} from '../../../../assets/Svg/Index';

interface aboutProps {
  modal: boolean;
  setModal: Function;
}

const AboutUsModal = ({modal, setModal}: aboutProps) => {
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
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
              margin: 'auto',
            }}>
            <Text style={{margin: 20}} h2>
              About Us
            </Text>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={{padding: 10}}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{padding: 20, textAlign: 'justify'}}>
              Welcome to LÉLLALL, your on-demand in-city shopping destination.
              At LÉLLALL, we're meticulous about the details, dedicated to
              delivering exceptional services to our users and partners. Our
              mission is to collaborate with small businesses, often overlooked
              in the market, providing them with a platform to boost their sales
              and connect with a broader customer base, igniting their creative
              potential online.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AboutUsModal;

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
