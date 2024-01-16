import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Text from '../Text/Text';
import Colors from '../../constants/Colors';
import { CartIcon, SearchIcon } from '../../assets/Svg/Index';
import Input from '../Inputs/Input';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { User } from '../../screens/Authentication/auth-api';

export default function AppHeader({ search, setSearch }) {
  const { user } = useSelector((state: User) => state.user);

  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.icon}>
        <Input
          inputStyle={{ borderRadius: 40 }}
          style={styles.input}
          IconLeft={<SearchIcon color="#121D2B" />}
          placeholder="Search"
          value={search}
          onChange={setSearch}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Carts')}>
          <CartIcon />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <View style={[styles.image, { backgroundColor: 'lightblue' }]}>
          <Text style={{ fontSize: 24, fontWeight: '800' }}>
            {user.firstName[0]}
            {user.lastName[0]}
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
