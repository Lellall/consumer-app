/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Text from '../../../../components/Text/Text';
import Colors from '../../../../constants/Colors';
import {HeartIcon} from '../../../../assets/Svg/Index';
import {useNavigation} from '@react-navigation/native';
import {Shop} from '../../Shop/shop-api';

export default function CategoriesCard(props: Shop) {
  const {id, logoUrl, status, name, category} = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Shop', {shopId: id})}
      style={[styles.container, {padding: 5}]}>
      <>
        <ImageBackground
          resizeMode="cover"
          source={{uri: logoUrl}}
          style={styles.image}>
          <View style={styles.open}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: Colors.general.primary,
              }}>
              {status.toLowerCase()}
            </Text>
          </View>

          <View style={styles.wish}>
            <HeartIcon color="#F06D06" />
          </View>
        </ImageBackground>
        <View style={styles.foot}>
          <Text style={{fontSize: 10}}>{name}</Text>
        </View>

        <View style={styles.foot}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            {category?.name}
          </Text>
        </View>
      </>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 170,
    width: '45%',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  image: {
    width: '100%',
    flex: 1,
    marginVertical: 10,
  },
  button: {
    borderBottomColor: '#00A661',
    borderBottomWidth: 1,
    width: '60%',
    paddingVertical: 2,
    marginBottom: 5,
  },
  discountImage: {
    width: '100%',
    flex: 1,
    borderRadius: 10,
  },
  foot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  star: {
    flexDirection: 'row',
  },
  open: {
    backgroundColor: '#F3F3F8',
    width: 50,
    height: 23,
    marginLeft: 'auto',
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wish: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    borderRadius: 40,
    marginBottom: 10,
    marginRight: 10,
  },
});
