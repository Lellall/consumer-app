import {View, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';

export default function Divider({style}: {style?: ViewStyle}) {
  return (
    <View
      style={[
        styles.divider,
        style,
        {
          backgroundColor: '#262626',
        },
      ]}></View>
  );
}
const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 0.5,
    marginTop: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
