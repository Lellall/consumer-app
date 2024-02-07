/* eslint-disable react-native/no-inline-styles */
import {Modal, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {CloseIcon} from '../../../../assets/Svg/Index';
import Text from '../../../../components/Text/Text';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Input from '../../../../components/Inputs/Input';

interface CategoryModalProps {
  modal: boolean;
  setModal: Function;
}

const LocationModal = ({modal, setModal}: CategoryModalProps) => {
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
            height: '60%',
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
              Seach Location
            </Text>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={{padding: 20}}>
              <CloseIcon />
            </TouchableOpacity>
          </View>

          <GooglePlacesAutocomplete
            placeholder="Search location..."
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              //   setAddress(data);
              // rollInFun();
              //   setIsModal(true);
            }}
            query={{
              key: 'AIzaSyDBqbRu9jjh3kBFSXTH6bgp7cAt2_2M2x4',
              language: 'en',
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            minLength={2}
            enablePoweredByContainer={false}
            styles={{
              textInput: {
                height: 44,
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontSize: 15,
                borderWidth: 1,
                borderColor: '#F1EFEF',
                backgroundColor: '#9694949f',
                color: '#000',
              },
              description: {
                color: 'black',
                backgroundColor: 'transparent',
              },
            }}
          />
          <Input
            label=""
            onChange={() => {}}
            placeholder="Land Mark (Optional)"
          />
          <Input
            label=""
            onChange={() => {}}
            placeholder="Land Mark (Optional)"
          />
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;

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
