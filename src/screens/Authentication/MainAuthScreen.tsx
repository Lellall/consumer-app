import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {AuthBg, Logo} from '../../assets/Images';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
import Text from '../../components/Text/Text';

export default function MainAuthScreen({navigation}) {
  // const [active, setActive] = useState(0);
  // const [logginUser, setLoggingUser] = useState(true);
  const scrollRef = useRef();
  const SignUp = () => {
    scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };
  const SignIn = () => {
    scrollRef.current?.scrollToEnd({animated: true});
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={AuthBg}
      style={styles.container}>
      <StatusBar barStyle="dark-content" translucent />

      <>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={{
            alignItems: 'center',
          }}
          style={styles.content}>
          <>
            <Image resizeMode="contain" style={styles.logo} source={Logo} />
            <Text h1>Create Account</Text>
            <SignUpScreen signIn={SignIn} navigation={navigation} />
          </>

          <LoginScreen signUp={SignUp} navigation={navigation} />
        </ScrollView>
      </>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 70,
    height: 70,
  },
  content: {
    paddingTop: StatusBar.currentHeight,
  },
  tab: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
  },
  tabContent: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',

    borderBottomWidth: 2,
    padding: 5,
  },
});
