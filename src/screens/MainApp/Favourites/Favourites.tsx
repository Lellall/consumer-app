/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SettingsHeader} from '../Settings/Components/SettingsHeader';
import {EmptyImage} from '../../../assets/Images';
import Text from '../../../components/Text/Text';
import CartItem from '../Cart/components/CartItem';
import CategoriesCard from '../Home/components/CategoriesCard';

export default function Favourites({navigation}) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <View style={styles.container}>
      <SettingsHeader
        title="Favorites"
        navigation={navigation}
        navigateRightTo="HomeScreenIndex"
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => setActiveTab(0)}
          style={[styles.tab, {borderBottomWidth: activeTab == 0 ? 2 : 0}]}>
          <Text style={{color: activeTab === 0 ? '#F06D06' : '#000'}}>
            Items
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(1)}
          style={[styles.tab, {borderBottomWidth: activeTab == 1 ? 2 : 0}]}>
          <Text style={{color: activeTab == 1 ? '#F06D06' : '#000'}}>
            Shops
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab == 0 && (
        <ScrollView
          contentContainerStyle={{
            padding: 20,
          }}
          style={styles.others}>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </ScrollView>
      )}

      {activeTab == 1 && (
        <ScrollView
          contentContainerStyle={{
            padding: 20,

            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
          style={styles.others}>
          <CategoriesCard />
          <CategoriesCard />
          <CategoriesCard />
          <CategoriesCard />
          <CategoriesCard />
          <CategoriesCard />
          <CategoriesCard />
          <CategoriesCard />
        </ScrollView>
      )}
      {/* <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image resizeMode="contain" source={EmptyImage} style={styles.image} />
        <Text>You have no favorites...yet</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  image: {
    height: 227,
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  tab: {
    marginRight: 10,
    borderBottomColor: '#F06D06',

    padding: 2,
  },
  others: {
    flex: 1,
  },
});
