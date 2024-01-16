import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';

const MenuItem = ({ active = false, title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          borderWidth: active ? 1 : 0,
          opacity: active ? 1 : 0.5,
        },
      ]}>
      <Text style={{ color: active ? Colors.general.primary : '#AAAAAA' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 38,
    backgroundColor: '#F4F4F6',
    padding: 10,
    borderRadius: 30,
    minWidth: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderColor: Colors.general.primary,
    marginRight: 10,
  },
});
