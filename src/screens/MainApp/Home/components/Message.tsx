import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import Text from '../../../../components/Text/Text'

export default function Message({reciever=false}) {
  return (
    <View style={{
        ...styles.messageContainer,
    }}>
      {
        !reciever&&(
            <Image
                style={styles.image}
                source={{
                  uri:'https://images.unsplash.com/photo-1613876215075-276fd62c89a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBmYWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
                     
                }}
                alt="profile"
              />
        )
      }
    <View style={{
        ...styles.mainMessageContainer,
        marginLeft:reciever?'auto':0
    }}>
    <View style={{
        ...styles.mainMessage,
        minWidth:reciever?'70%':'70%',
        maxWidth:reciever?'70%':'70%',
        marginLeft:reciever?'auto':0,
        backgroundColor:reciever?'#03045E':'#E8EFFF',
        borderBottomLeftRadius:reciever?20:0,
        borderBottomRightRadius:reciever?0:20

    }}>
      <Text style={{color:reciever?'#fff':'#000'}}>How do i get you to know where i am at....... </Text>
      <Text style={{
        alignSelf:'flex-end',
        color:reciever?'#fff':'#000',
        fontSize:8,
       
      }}>10:56am</Text>
    </View>
    <Text style={{color:'rgba(17, 17, 17, 0.5)',marginTop:5, marginLeft:reciever?'auto':0}}>{
        reciever?'Sent':'Seen'
    }</Text>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
messageContainer:{
    flexDirection:'row',
    width:'100%',
    marginTop:20
},
image:{
    height:32,
    width:32,
    borderRadius:32,
    marginTop:'auto',
    transform:[{translateY:-15}],
    marginRight:20
},
mainMessageContainer:{
width:'100%',
flexDirection:'column',
position:'relative',


},
mainMessage:{
    minHeight:55,
    backgroundColor:'#E8EFFF',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    padding:10
}
})