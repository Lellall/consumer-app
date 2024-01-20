import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../../../components/Text/Text';
import {Product} from './shop-api';
import {EmptyState} from '../../../components/EmptyState';
import ProductItem from './components/Product';

const TopSellers = ({products}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.contentStyle}
      style={styles.container}>
      <StatusBar backgroundColor="#fff" />
      <Text h2>Top Sellers</Text>

      {!products.length ? (
        <EmptyState title={'No products available'} />
      ) : (
        products.map((product: Product) => {
          return <ProductItem key={product?.id} {...product} />;
        })
      )}

      {/* <ShopItem />
      <ShopItem /> */}
    </ScrollView>
  );
};

export default TopSellers;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentStyle: {
    padding: 10,
    // flex: 1,
  },
});
