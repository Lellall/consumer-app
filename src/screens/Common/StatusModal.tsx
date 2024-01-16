import {View, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';

import Lottie from 'lottie-react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Text from '../../components/Text/Text';
const StatusModal = ({
  isModalOpen,
  text,
  message,
  closeModal,
}: {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  closeModal: () => void;
  text: string;
  message: string;
}) => {
  //   const [isModalOpen, setModalVisible] = useState(isModalOpen);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        closeModal();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <Modal transparent={true} animationType={'fade'} visible={isModalOpen}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#00000040',
        }}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={{width: '100%', height: '50%'}} />
        </TouchableWithoutFeedback>

        <View
          style={{
            height: 400,
            width: '90%',
            backgroundColor: 'white',
            alignItems: 'center',
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{text}</Text>
          <View style={{marginVertical: 20, width: '100%', height: 100}}>
            <Lottie
              source={require('../../assets/Lottie/success.json')}
              autoPlay
              loop={true}
            />
          </View>
          <Text style={{textAlign: 'center'}}>{message}</Text>
        </View>

        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={{width: '100%', height: '50%'}} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default StatusModal;
