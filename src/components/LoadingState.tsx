import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const LoadingState = () => {
  return (
    <View style={styles.Container}>
      <LottieView
        source={require('../assets/Lottie/loading.json')}
        style={{width: 100, height: 100}}
        autoPlay
        loop
      />
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
