import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { HeaderImage } from '../../../../assets/Images';
import { ArrowLeftIcon2 } from '../../../../assets/Svg/Index';
import Text from '../../../../components/Text/Text';
import { useNavigation } from '@react-navigation/native';

const CartHeader = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={HeaderImage} style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginRight: 'auto' }}
          onPress={() => navigation.goBack()}>
          <ArrowLeftIcon2 />
        </TouchableOpacity>
        <Text style={{ marginRight: 'auto' }} h2>
          My Cart
        </Text>
      </View>
    </ImageBackground>
  );
};

export default CartHeader;

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: '100%',
    backgroundColor: '#F3F3F8',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#F3F3F8',
    marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
});
