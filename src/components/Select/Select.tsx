import {  StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons'
import Text from '../Text/Text';
interface SelectProps{
options:any[]
onSelect:(item:string)=>void
placeHolder?:string
error?:string
style?:ViewStyle
}
export default function Select({options,onSelect,placeHolder='Select',error,style}:SelectProps) {
  return (
   <>
    <SelectDropdown
    
    defaultButtonText={placeHolder}
    renderDropdownIcon={()=><Icon name='chevron-down' size={20} color='#000'/>}
    dropdownIconPosition='right'
    buttonStyle={[styles.selectButton,style]}
    data={options}
    onSelect={(selectedItem, index) => {
      onSelect(selectedItem)
    }}
    buttonTextAfterSelection={(selectedItem, index) => {
      return selectedItem;
    }}
    rowTextForSelection={(item, index) => {
      return item;
    }}
  />
  {error && <Text style={{color: 'red'}}>{error}</Text>}
   </>
  )
}

const styles = StyleSheet.create({
selectButton:{
    height: 48,
    width: '100%',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation:3
}
})