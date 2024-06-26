/* eslint-disable react-native/no-inline-styles */
import {Modal, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from '../../../../components/Text/Text';
import {CloseIcon} from '../../../../assets/Svg/Index';
import LottieView from 'lottie-react-native';
import {Category} from '../api/categories-api';

interface CategoryModalProps {
  modal: boolean;
  setModal: Function;
  categories: Category[] | undefined;
  loadingCategories: boolean;
  setCategoryId: Function;
}

const CategoryModal = ({
  loadingCategories,
  modal,
  categories,
  setModal,
  setCategoryId,
}: CategoryModalProps) => {
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
            minHeight: 330,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '95%',
              margin: 'auto',
            }}>
            <Text style={{margin: 20}} h2>
              {loadingCategories ? 'Loading...' : 'Categories'}
            </Text>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={{padding: 20}}>
              <CloseIcon />
            </TouchableOpacity>
          </View>

          {loadingCategories ? (
            <View
              style={{
                flex: 1,
                // width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LottieView
                source={require('../../../../assets/Lottie/loading.json')}
                style={{
                  width: 100,
                  height: 100,
                }}
                autoPlay
                loop
              />
            </View>
          ) : categories?.length ? (
            <Text>No category</Text>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-between',
                // minHeight: '35%',
              }}>
              {categories?.data?.map(
                (item: {id: string; imageUrl: string; name: string}) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        width: 100,
                        alignItems: 'center',
                        margin: 10,
                      }}
                      onPress={() => {
                        setModal(false);
                        setCategoryId(item.id);
                      }}>
                      <Image
                        source={{uri: item.imageUrl}}
                        style={{width: 50, height: 50, borderRadius: 50}}
                      />
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                },
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CategoryModal;

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
