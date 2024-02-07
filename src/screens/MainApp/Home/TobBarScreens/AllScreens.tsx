import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import HomeCarousel from '../components/HomeCarousel';
import Text from '../../../../components/Text/Text';
import ShopCard from '../components/ShopCard';

export default function AllScreens() {
  return (
    <View style={styles.container}>
      <HomeCarousel />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapStyle}
        style={styles.products}>
        <View style={styles.label}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Categories
          </Text>
        </View>
        <ShopCard discount={true} />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <View style={styles.label}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Recommended Products
          </Text>

          <TouchableOpacity
            style={{borderBottomColor: '#00A661', borderBottomWidth: 1}}>
            <Text style={{color: '#00A661'}}>View all</Text>
          </TouchableOpacity>
        </View>
        <CategoriesCard />
        <CategoriesCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  products: {
    flex: 1,
    backgroundColor: 'rgba(47, 49, 63, 0.008)',
    paddingVert: 10,
  },
  wrapStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  label: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
});
