import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Text from '../../../components/Text/Text';
import {SettingsHeader} from './Components/SettingsHeader';
import {SettingsCardItem} from './Components/SettingsCardItem';
// import Colors from '../../../constants/Colors';
import {
  BookIcon,
  DocumentIcon,
  LogOutIcon,
  NotificationIcon,
  ProfileCircleIcon,
  TicketIcon,
  ArrowRightIcon2,
} from '../../../assets/Svg/Index';
import {ProfileHeader} from './Components/ProfileHeader';
import {useDispatch} from 'react-redux';
import {logout} from '../../../redux/user/userSlice';
import AboutUsModal from './Components/AboutUsModal';

export default function SettingsScreen({navigation}) {
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);

  return (
    <View style={styles.container}>
      <SettingsHeader
        iconLeft={null}
        title="Settings"
        navigateRightTo="HomeScreenIndex"
      />
      <ProfileHeader />

      <SettingsCardItem
        onPress={() => navigation.navigate('profile')}
        title={'Profile'}
        iconBefore={<ProfileCircleIcon />}
        iconAfter={<ArrowRightIcon2 color="#000" />}
      />
      <SettingsCardItem
        onPress={() => navigation.navigate('myorders')}
        title={'My Orders'}
        iconBefore={<BookIcon />}
        iconAfter={<ArrowRightIcon2 />}
      />
      <SettingsCardItem
        title={'Discount'}
        // onPress={() => navigation.navigate('profile')}
        iconBefore={<TicketIcon />}
        iconAfter={<ArrowRightIcon2 />}
        style={{backgroundColor: '#E5E5E5'}}
        disabled
      />
      <SettingsCardItem
        title={'Push notifications'}
        // onPress={() => navigation.navigate('profile')}
        iconBefore={<NotificationIcon />}
        // iconAfter={<ArrowRightIcon2 />}
        style={{backgroundColor: '#E5E5E5'}}
        disabled
      />
      <SettingsCardItem
        title={'About'}
        onPress={() => setIsModal(true)}
        iconBefore={<DocumentIcon />}
        iconAfter={<ArrowRightIcon2 />}
      />
      <View style={styles.adsContainer}>
        <Text style={styles.adsHeader}>Earn With Us</Text>
        <Text style={styles.adsText}>
          Sign up with us as a vendor or a driver and earn money with us
        </Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            dispatch(logout());
            navigation.navigate('Authentication');
          }}
          style={styles.logout}>
          <Text style={styles.logoutText}>
            <LogOutIcon color={'#0E5D37'} />
          </Text>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={() => navigation.navigate('profile')}>
        <Text>Profile</Text>
      </TouchableOpacity> */}
      <AboutUsModal setModal={setIsModal} modal={isModal} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  adsContainer: {
    backgroundColor: '#EDEDED',
    padding: 15,
    margin: 10,
    height: 86,
    borderRadius: 10,
  },
  adsHeader: {
    color: '#0E5D37',
    fontSize: 16,
    fontWeight: '700',
  },
  adsText: {
    color: '#0E5D37',
  },
  logout: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    paddingVertical: 8,
    height: 46,
    margin: 10,
    borderRadius: 8,
    flexDirection: 'row',
  },
  logoutText: {
    color: '#0E5D37',
  },
});
