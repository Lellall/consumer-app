import { View, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { ArrowLeftIcon, SearchIcon } from '../../../../assets/Svg/Index';
import Input from '../../../../components/Inputs/Input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function DetailHeader() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeftIcon color="#000" />
      </TouchableOpacity>
      <Input
        style={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="Search"
        IconLeft={<SearchIcon color="#000" />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 120,
    width: '100%',
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderRadius: 50,
  },
  inputContainer: {
    width: '80%',
  },
});
