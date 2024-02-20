/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from '../Text/Text';
import Colors from '../../constants/Colors';
import {CartIcon, SearchIcon} from '../../assets/Svg/Index';
import Input from '../Inputs/Input';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {User} from '../../screens/Authentication/auth-api';

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function AppHeader({search, setSearch}: Props) {
  const {user} = useSelector((state: User) => state.user);
  const cart = useSelector((state: User) => state.cart);
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.icon}>
        <Input
          inputStyle={{borderRadius: 40}}
          style={styles.input}
          IconLeft={<SearchIcon color="#121D2B" />}
          placeholder="Search"
          value={search}
          onChange={setSearch}
        />
        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate('Carts')}>
          <CartIcon />
          {cart.length > 0 && (
            <Text
              style={{
                position: 'absolute',
                top: -10,
                left: 15,
                backgroundColor: '#0E5D37',
                borderRadius: 10,
                color: '#fff',
                padding: 1,
                fontSize: 10,
                height: 20,
                width: 20,
                textAlign: 'center',
                lineHeight: 17,
              }}>
              {cart.length}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          user.trial
            ? navigation.navigate('Authentication')
            : navigation.navigate('Settings');
        }}>
        <View style={[styles.image, {backgroundColor: 'orange'}]}>
          <Text style={{fontSize: 17, fontWeight: '800'}}>
            {user?.firstName[0].toUpperCase()}
            {user?.lastName[0].toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  headerTetx: {
    color: Colors.general.primary,
    marginLeft: 'auto',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  input: {
    width: '80%',
    borderRadius: 40,
    marginRight: 20,
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 45,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
});
