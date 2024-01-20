/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../../components/Headers/AppHeader';
import {HeaderImage} from '../../../assets/Images';
import HomeCarousel from './components/HomeCarousel';
import Text from '../../../components/Text/Text';
import Colors from '../../../constants/Colors';
import CategoriesCard from './components/CategoriesCard';
import {
  useCategoryQuery,
  useProductsQuery,
  useShopQuery,
} from '../Shop/shop-api';
import LoadingState from '../../../components/LoadingState';
import {EmptyState} from '../../../components/EmptyState';
import ProductCard from './components/ProductCard';
import CategoryModal from './components/CategoryModal';
import {CloseIcon} from '../../../assets/Svg/Index';

export default function HomeScreen() {
  const {data, isLoading} = useShopQuery();
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [modal, setModal] = useState(false);

  const {
    data: products,
    isLoading: loadingProducts,
    refetch,
    isFetching,
  } = useProductsQuery({
    filter: search.toLocaleLowerCase(),
    page: 0,
    size: 10,
    categoryId: categoryId,
  });

  const {data: categories, isLoading: loadingCategories} = useCategoryQuery();

  const handleCategoryChange = (newCategoryId: string) => {
    setCategoryId(newCategoryId);
    refetch(); // Trigger refetch with updated categoryId
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <ImageBackground source={HeaderImage} style={styles.mainHeader} />
      <AppHeader search={search} setSearch={setSearch} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapStyle}
        style={styles.products}>
        <HomeCarousel />
        <Text style={{textAlign: 'center'}} h1>
          What do you want to buy?
        </Text>
        <TouchableOpacity
          style={styles.category}
          onPress={() => setModal(true)}>
          <Text style={{color: Colors.general.primary}}>Choose a category</Text>
        </TouchableOpacity>
        <View style={styles.label}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Products</Text>

          {categoryId && (
            <TouchableOpacity
              style={{padding: 20}}
              onPress={() => setCategoryId('')}>
              <Text style={{color: Colors.general.secondary}}>
                <CloseIcon />
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {loadingProducts || isFetching ? (
          <View style={{height: 250, width: Dimensions.get('window').width}}>
            <LoadingState />
          </View>
        ) : !products?.data.length ? (
          <View style={{width: '100%'}}>
            <EmptyState title={'No Products available'} />
          </View>
        ) : (
          products.data.map(data => {
            return <ProductCard key={data?.id} {...data} />;
          })
        )}

        <View style={styles.label}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Popular Shops</Text>

          <TouchableOpacity>
            <Text style={{color: Colors.general.secondary}}>View all</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <View style={{minHeight: 250, width: Dimensions.get('window').width}}>
            <LoadingState />
          </View>
        ) : !data?.data.length ? (
          <View>
            <EmptyState title={'popular shops'} />
          </View>
        ) : (
          data?.data?.map(({id, logoUrl, status, name, category}) => {
            return (
              <CategoriesCard
                id={id}
                logoUrl={logoUrl}
                name={name}
                status={status}
                key={id}
                category={category}
              />
            );
          })
        )}
      </ScrollView>

      <CategoryModal
        categories={categories}
        loadingCategories={loadingCategories}
        modal={modal}
        setCategoryId={handleCategoryChange}
        setModal={setModal}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainHeader: {
    width: '100%',
    height: 70,
    paddingTop: StatusBar.currentHeight,
    marginBottom: 10,
    paddingBottom: 10,
  },
  label: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  products: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  wrapStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  category: {
    width: '80%',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
    marginVertical: 10,
  },
});
