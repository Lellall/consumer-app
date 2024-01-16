import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../components/Text/Text';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Cancel, ErrorIcon, SuccesIcon, WarnIcon} from '../assets/Svg/Index';
interface AlertProps {
  text: string;
  type?: 'success' | 'error' | 'warn';
}
export default function useAlert() {
  const [text, setText] = useState('');
  const [type, setType] = useState('success');
  const sharedValue = useSharedValue(-100);
  function showAlert({text, type = 'success'}: AlertProps) {
    setText(text);
    setType(type);
    sharedValue.value = withTiming(70);
  }

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(sharedValue.value, [-100, 70], [0, 1]);
    return {
      transform: [{translateY: sharedValue.value}],
      opacity,
    };
  });

  useEffect(() => {
    if (text !== '') {
      setTimeout(() => {
        sharedValue.value = withTiming(-100, {duration: 4000});
      }, 3000);
      setTimeout(() => {
        setText('');
      }, 4000);
    }
  }, [text]);

  return {
    showAlert,
    Alert: (
      <Modal
        style={{padding: 20, position: 'relative'}}
        transparent
        animationType={'fade'}
        visible={text !== ''}>
        <View
          style={{
            position: 'relative',
            flex: 1,
            // justifyContent:'center',
            alignItems: 'center',

            // marginLeft: 'auto',
            // marginRight: 'auto',
          }}>
          <Animated.View
            style={[
              styles.alert,
              {
                backgroundColor:
                  type == 'success'
                    ? 'rgba(0, 154, 73, 0.7)'
                    : type == 'warn'
                    ? '#F9DDA5'
                    : '#F2C6C3',
                borderColor:
                  type == 'success'
                    ? '#fff'
                    : type == 'warn'
                    ? '#A08651'
                    : '#8B0000',
              },
              animatedStyle,
            ]}>
            {type == 'success' ? (
              <SuccesIcon />
            ) : type == 'warn' ? (
              <WarnIcon />
            ) : (
              <ErrorIcon />
            )}
            <Text
              style={{
                color:
                  type == 'success'
                    ? '#fff'
                    : type == 'warn'
                    ? '#A08651'
                    : '#8B0000',
                width: '70%',
              }}>
              {text}
            </Text>

            <TouchableOpacity
              onPress={() => {
                sharedValue.value = withTiming(-100);
              }}>
              <Cancel
                color={
                  type == 'success'
                    ? '#fff'
                    : type == 'warn'
                    ? '#A08651'
                    : '#8B0000'
                }
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    ),
  };
}

const styles = StyleSheet.create({
  alert: {
    position: 'absolute',
    top: 0,
    zIndex: 9999999999999999999,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
    borderRadius: 10,
    marginLeft: 'auto',
    padding: 10,
    borderWidth: 0.7,
  },
});
