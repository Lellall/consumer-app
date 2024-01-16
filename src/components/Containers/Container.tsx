import {View, StyleSheet, StatusBar, Dimensions, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import Colors from '../../constants/Colors';

export default function Container({
  children,
  style,
}: {
  style?: ViewStyle;
  children: ReactNode;
}) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.container, style]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
    position: 'relative',
    flex: 1,
  },
});
