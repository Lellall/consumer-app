/* eslint-disable react-native/no-inline-styles */
import {Modal, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LoadingState from '../../../../components/LoadingState';
import Text from '../../../../components/Text/Text';
import {Category} from '../../Shop/shop-api';
import {CloseIcon} from '../../../../assets/Svg/Index';

type ModalProps = {
  loadingCategories: boolean;
  modal: boolean;
  categories: Category;
  setModal: (val: boolean) => void;
  setCategoryId: (val: string) => void;
};

const CategoryModal = ({
  loadingCategories,
  modal,
  categories,
  setModal,
  setCategoryId,
}: ModalProps) => {
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
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              width: '90%',
            }}>
            <Text style={{margin: 20}} h2>
              Categories
            </Text>
            <TouchableOpacity onPress={() => setModal(false)}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          {loadingCategories ? (
            <LoadingState />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                height: '35%',
              }}>
              {categories?.map(
                (item: {id: string; imageUrl: any; name: any}) => {
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
