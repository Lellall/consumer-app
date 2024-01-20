import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {HeaderImage} from '../../../../assets/Images';
import {ArrowLeftIcon2, Cancel, CancelIcon} from '../../../../assets/Svg/Index';
import Text from '../../../../components/Text/Text';
import {useNavigation} from '@react-navigation/native';

export const SettingsHeader = ({
  iconRight = true,
  title = 'Settings',
  // navigation,
  navigateRightTo = 'SettingsScreenIndex',
  iconLeft,
  navigateLeftTo = 'SettingsScreenIndex',
}) => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={HeaderImage} style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <View>
          {iconLeft && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              {iconLeft}
            </TouchableOpacity>
          )}
        </View>
        <Text h2>{title}</Text>
        <View>
          {iconRight && (
            <TouchableOpacity
              // style={{ marginLeft: 'auto' }}
              onPress={() => navigation.navigate(navigateRightTo)}>
              <Cancel color="#000" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: '100%',
    backgroundColor: '#FCFCFC',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#FCFCFC',
    marginTop: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
});
