import {StatusBar, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {WaveSvg} from '../../assets/Svg/Index';
import Colors from '../../constants/Colors';

export default function AuthHeader() {
  return (
    <>
      <WaveSvg style={styles.svg} />
      <StatusBar backgroundColor={Colors.general.primary} />
    </>
  );
}

const styles = StyleSheet.create({
  svg: {
    width: Dimensions.get('window').width,
    height: 100,
    position: 'absolute',
    top: 0,
    transform: [{translateY: -20}],
  },
});
