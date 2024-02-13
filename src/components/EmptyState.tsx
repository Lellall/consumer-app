import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {EmptyImage} from '../assets/Images';

export const EmptyState = ({title}) => {
  return (
    <View style={styles.Container}>
      <Image source={EmptyImage} />
      <Text style={{color: '#000'}}> {title} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 20,
  },
});
