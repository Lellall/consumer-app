/* eslint-disable react-native/no-inline-styles */
import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../../../../components/Text/Text';
import {ClockIcon} from '../../../../assets/Svg/Index';

const {width} = Dimensions.get('window');
interface locationProps {
  title: string;
  subtitle: string;
}
export default function Previous({title, subtitle}: locationProps) {
  return (
    <View style={styles.container}>
      <View>
        <ClockIcon color="#000" />
      </View>
      <View style={{marginLeft: 10, width: '80%'}}>
        <Text style={{fontSize: 15}} h2>
          {title}
        </Text>
        <Text style={{color: '#AAAAAA'}}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 10,
    width,
  },
});
