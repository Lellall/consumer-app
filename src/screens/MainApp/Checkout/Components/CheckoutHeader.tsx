/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {HeaderImage} from '../../../../assets/Images';
import {Cancel} from '../../../../assets/Svg/Index';
import Text from '../../../../components/Text/Text';
import {useNavigation} from '@react-navigation/native';

const CheckoutHeader = ({icon = true, title = 'Checkout'}) => {
  const navigate = useNavigation();
  return (
    <ImageBackground source={HeaderImage} style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <Text style={{marginLeft: icon ? 'auto' : 0}} h2>
          {title}
        </Text>
        {icon && (
          <TouchableOpacity
            onPress={() => navigate.goBack()}
            style={{marginLeft: 'auto'}}>
            <Cancel color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

export default CheckoutHeader;

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
});
