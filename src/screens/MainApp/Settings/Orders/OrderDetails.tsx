import {StyleSheet, View, Image, ScrollView, Modal} from 'react-native';
import React, {useState} from 'react';
import Text from '../../../../components/Text/Text';
import {SettingsHeader} from '../Components/SettingsHeader';
import Button from '../../../../components/Buttons/Button';
// import Colors from '../../../constants/Colors';

export default function OrderDetails({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView>
        <SettingsHeader
          iconLeft
          navigation={navigation}
          title="Order Details"
        />
        <View style={styles.wrapper}>
          <View style={styles.flexText}>
            <Text style={styles.title}>Order date</Text>
            <Text style={styles.subTitle}>April 3, 2023</Text>
          </View>
          <View style={styles.flexText}>
            <Text style={styles.title}>Order number</Text>
            <Text style={styles.subTitle}>46578295</Text>
          </View>
          <View style={styles.flexText}>
            <Text style={styles.title}>Status</Text>
            <Text
              style={{
                color: '#00A661',
                fontWeight: '400',
                fontSize: 14,
                width: 140,
              }}>
              Delivered
            </Text>
          </View>
          <View style={styles.flexText}>
            <Text style={styles.title}>Delivery method</Text>
            <Text style={styles.subTitle}>Standard</Text>
          </View>
          <View style={styles.flexText}>
            <Text style={styles.title}>Delivery address</Text>
            <Text style={styles.subTitle}>
              Jonathan Doe 144 Baker Avenue Northenhills, UK SW43 4MM
            </Text>
          </View>
          <View style={styles.flexText}>
            <Text style={styles.title}> Estimated arrival</Text>
            <Text style={styles.subTitle}>2:00:45</Text>
          </View>

          <View style={styles.barcode}>
            <Image
              source={{
                uri: 'https://chart.googleapis.com/chart?chl=lellal-app.com&chs=200x200&cht=qr&chld=H%7C0',
              }}
              style={{height: 200, width: 200}}
            />
          </View>

          <View style={styles.btnContainer}>
            <Button
              onPress={() => navigation.navigate('trackOrder')}
              style={{
                borderRadius: 20,
                marginTop: 20,
              }}
              label="Track Your Package"
            />
            <Button
              style={{
                borderRadius: 20,
                marginTop: 20,
                backgroundColor: '#F3F3F8',
              }}
              fontStyle={{color: '#0E5D37'}}
              label="Cancel Order"
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.overlay}>
            <View style={styles.modalWrapper}>
              <Text style={styles.modalHeader}>Are you sure?</Text>
              <Text style={{textAlign: 'center', paddingTop: 10}}>
                Your order will be cancelled, but don’t worry your money will be
                refunded.
              </Text>
              <Button
                onPress={() => setModalVisible(false)}
                style={{
                  borderRadius: 20,
                  marginTop: 20,
                  backgroundColor: 'red',
                }}
                label="Confirm"
              />
              <Button
                style={{
                  borderRadius: 20,
                  marginTop: 20,
                  backgroundColor: '#F3F3F8',
                }}
                fontStyle={{color: '#0E5D37'}}
                label="Back"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalWrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrapper: {
    margin: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 14,
    width: 140,
  },
  flexText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 38,
  },
  btnContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  barcode: {
    alignSelf: 'center',
  },
});
