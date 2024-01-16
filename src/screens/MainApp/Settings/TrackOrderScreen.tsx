import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import Text from '../../../components/Text/Text';
import { SettingsHeader } from './Components/SettingsHeader';
import Button from '../../../components/Buttons/Button';
import {
  Clipart,
  HeaderImage,
  Check,
  Line,
  PreparedOrder,
  DeliveryMan,
  RectangleImageMap,
} from '../../../assets/Images';
import { CheckIcon, CallDelivery, DotCircles } from '../../../assets/Svg/Index';

export default function TrackOrderScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={HeaderImage} style={{ height: 105 }} />
      <Text style={styles.header}>TRACK YOUR ORDER</Text>

      <View style={styles.card}>
        <View style={styles.flex}>
          <View style={styles.flex}>
            <View style={[styles.iconWrapper, { backgroundColor: '#FFFAEB' }]}>
              <Image source={Clipart} />
            </View>
            <Text style={styles.title}>Order Taken</Text>
          </View>

          <CheckIcon color="#0f5d38" width={24} height={24} />
        </View>
        <Image source={Line} style={{ left: 30, top: 5 }} />
      </View>

      <View style={styles.card}>
        <View style={styles.flex}>
          <View style={styles.flex}>
            <View style={[styles.iconWrapper, { backgroundColor: '#FFFAEB' }]}>
              <Image source={PreparedOrder} />
            </View>
            <Text style={styles.title}>Order Is Being Prepared</Text>
          </View>

          <CheckIcon color="#0f5d38" width={24} height={24} />
        </View>
        <Image source={Line} style={{ left: 30, top: 5 }} />
      </View>

      <View style={styles.card}>
        <View style={styles.flex}>
          <View style={styles.flex}>
            <View style={[styles.iconWrapper, { backgroundColor: '#FFFAEB' }]}>
              <Image source={DeliveryMan} />
            </View>
            <View>
              <Text style={styles.title}>Order Is Being Delivered</Text>
              <Text>Your delivery agent is coming</Text>
            </View>
          </View>

          <CallDelivery />
        </View>
        <Image source={Line} style={{ left: 30, top: -10, zIndex: -1 }} />
      </View>
      <Image source={RectangleImageMap} />

      <View style={[styles.card, { marginTop: 10 }]}>
        <View style={styles.flex}>
          <View style={styles.flex}>
            <View style={[styles.iconWrapper, { backgroundColor: '#FFFAEB' }]}>
              <Image source={Check} />
            </View>
            <Text style={styles.title}>Order Is Being Prepared</Text>
          </View>

          <DotCircles />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 21,
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    // height: 64,
    // position: 'relative',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 65,
    height: 64,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
