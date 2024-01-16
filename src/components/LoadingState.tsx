import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const LoadingState = () => {
  return (
    <View style={styles.Container}>
      <Text style={{ color: '#000' }}>Loading....</Text>
    </View>
  );
};

export default LoadingState;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
