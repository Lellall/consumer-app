import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import CheckoutHeader from './Components/CheckoutHeader';
import Text from '../../../components/Text/Text';
import LocationSelector from './Components/LocationSelector';
import Previous from './Components/Previous';
import Button from '../../../components/Buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { AchieveImage } from '../../../assets/Images';
import { CheckoutSuccessProps } from '../../../navigation/Stack/HomeScreenStack';

const CheckOutSuccess = ({ route }: CheckoutSuccessProps) => {
  const { tansaction_id } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CheckoutHeader title="Order Complete" icon={false} />
      <Image resizeMode="contain" source={AchieveImage} style={styles.image} />
      <Text style={{ textAlign: 'center' }} h2>
        Thank you for your purchase!
      </Text>
      <View style={styles.order}>
        <Text>Your transaction id is</Text>
        <Text h3> {tansaction_id}</Text>
      </View>
      <Text style={{ textAlign: 'center' }}>
        Check your order history for more details.
      </Text>
      <View style={styles.order}>
        <Text>Estimated delivery time by </Text>
        <Text h3>02:00:00</Text>
      </View>
      <Text style={{ textAlign: 'center' }}>You will receive an email at </Text>
      <Text style={{ textAlign: 'center' }} h3>
        jondoe@mymail.com
      </Text>

      <Button
        onPress={() => navigation.navigate('HomeScreenIndex')}
        style={{
          width: '80%',
          marginTop: 'auto',
          borderRadius: 40,
          marginBottom: 10,
        }}
        label="Back Home"
      />
    </View>
  );
};

export default CheckOutSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  decoContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  deco: {
    width: 40,
    height: 1,
    backgroundColor: '#F06D06',
    borderRadius: 5,
  },
  deco2: {
    width: 20,
    height: 1,
    backgroundColor: '#F7ECE1',
    marginLeft: 10,
  },
  remain: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 20,
  },
  image: {
    height: 250,
    width: '100%',
    marginTop: 20,
  },
  order: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
