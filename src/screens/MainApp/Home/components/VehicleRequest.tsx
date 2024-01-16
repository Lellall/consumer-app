import { View, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import Text from '../../../../components/Text/Text'
import { Cancel, TickIcon } from '../../../../assets/Svg/Index'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export default function VehicleRequest({isOpen=false,trip,close}) {

    
  return (
    <Modal
        style={{padding: 20, position: 'relative'}}
        transparent
        animationType={'fade'}
        visible={isOpen}>
    <Animated.View style={[styles.container]}>
      <Image
                style={styles.image}
                source={{
                  uri:'https://images.unsplash.com/photo-1613876215075-276fd62c89a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBmYWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
                      
                }}
                alt="profile"
              />

        <View>
            <Text h3>Incoming ride Request</Text>
            <Text style={{color:'rgba(17, 17, 17, 0.5)'}}>Rider looking for a ride</Text>
        </View>

        <TouchableOpacity onPress={()=>{
            trip()
            close()
        }} style={styles.icon}>
         <View style={styles.iconColor}>
          <TickIcon color='#fff'/>
         </View>
         <Text style={{fontSize:8}}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon}>
         <View style={{
            ...styles.iconColor,
            backgroundColor:'#8B0000'
         }}>
          <Cancel color='#fff'/>
         </View>
         <Text style={{fontSize:8}}>Decline</Text>
        </TouchableOpacity>
    </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        height:100,
        width:'100%',
        backgroundColor:'#fff',
        zIndex:9999999,
        borderRadius:4,
        marginTop:20,
       
        alignItems:'center',
        flexDirection:'row',
        paddingRight:10
    },
    image:{
        height:48,
        width:48,
        borderRadius:48,
        marginRight:10
    },
    icon:{
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20
    },
    iconColor:{
        height:34,
        width:34,
        borderRadius:34,
        backgroundColor:'#009A49',
        justifyContent:'center',
        alignItems:'center'
    }
})