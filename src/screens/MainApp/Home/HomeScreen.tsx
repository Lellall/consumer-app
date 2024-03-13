/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../../components/Headers/AppHeader';
import {HeaderImage} from '../../../assets/Images';
// import HomeCarousel from './components/HomeCarousel';
import Text from '../../../components/Text/Text';
import Colors from '../../../constants/Colors';
import {ProductMini} from '../Shop/shop-api';
import LoadingState from '../../../components/LoadingState';
import {EmptyState} from '../../../components/EmptyState';
import ProductCard from './components/ProductCard';
import CategoryModal from './components/CategoryModal';
import {ArrowLeftIcon2} from '../../../assets/Svg/Index';
import {useDebounce} from '../../../hooks/useDebounce';
import {useHomeScreenController} from './useHomeScreenController';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [modal, setModal] = useState(false);
  const debounceSearch = useDebounce(search);
  const [currentPage, setCurrentPage] = useState(0);
  const {data, actions, loading} = useHomeScreenController({
    debounceSearch,
    categoryId,
    currentPage,
  });
  const {isFetching, loadingCategories, loadingProducts} = loading;
  const {categories, products} = data;
  const totalPages = products?.resultTotal;

  const handlePageClick = (p: number) => setCurrentPage(p);

  const renderItem = ({item}: {item: ProductMini}) => {
    return (
      <View key={item?.id} style={styles.columnContainer}>
        <ProductCard {...item} />
      </View>
    );
  };

  const renderPaginationButtons = () => {
    const maxButtonsToShow = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxButtonsToShow / 2));

    let endPage = Math.min(
      Number(totalPages),
      startPage + maxButtonsToShow - 1,
    );

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(0, endPage - maxButtonsToShow + 1);
    }

    const buttons = [];

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          onPress={() => handlePageClick(i)}
          style={[
            styles.paginationButton,
            i === currentPage ? styles.activeButton : styles.inActiveButton,
          ]}>
          <Text
            style={
              i === currentPage ? styles.buttonTextActive : styles.buttonText
            }>
            {i}
          </Text>
        </TouchableOpacity>,
      );
    }

    return buttons;
  };

  const handleCategoryChange = (newCategoryId: string) => {
    setCategoryId(newCategoryId);
    actions.refetch(); // Trigger refetch with updated categoryId
  };

  const FooterComponents = () => {
    return (
      <View>
        {isFetching && products?.data?.length > 0 ? (
          <ActivityIndicator size={'small'} color={'black'} />
        ) : !products?.data.length ? null : (
          <View
            style={{
              flexDirection: 'row',
              padding: 3,
              justifyContent: 'center',
            }}>
            {renderPaginationButtons()}
          </View>
        )}
      </View>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <ImageBackground source={HeaderImage} style={styles.mainHeader} />
        <AppHeader search={search} setSearch={setSearch} />
        <View
          // showsVerticalScrollIndicator={false}
          // contentContainerStyle={styles.wrapStyle}
          // style={styles.products}
          style={{paddingHorizontal: 15}}>
          <>
            {/* <HomeCarousel /> */}
            <Text style={{textAlign: 'center'}} h1>
              What do you want to buy?
            </Text>
            <TouchableOpacity
              style={[
                styles.category,
                {borderColor: categoryId ? '#F06D06' : 'transparent'},
              ]}
              onPress={() => {
                categoryId ? setCategoryId('') : setModal(true);
              }}>
              <Text style={{color: Colors.general.primary}}>
                {categoryId ? 'Filtered out ' : 'Choose a category'}
              </Text>
            </TouchableOpacity>
            <View style={styles.label}>
              {categoryId && (
                <TouchableOpacity
                  style={{paddingRight: 20}}
                  onPress={() => setCategoryId('')}>
                  <Text style={{color: Colors.general.secondary}}>
                    <ArrowLeftIcon2 />
                  </Text>
                </TouchableOpacity>
              )}
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Products {isFetching && '...'}{' '}
              </Text>
            </View>
          </>
          {loadingProducts && (
            <View style={{height: 250, width: '100%'}}>
              <LoadingState />
            </View>
          )}
        </View>
        <>
          <FlatList
            data={products?.data}
            renderItem={renderItem}
            keyExtractor={item => item?.id.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            ListEmptyComponent={
              !loadingProducts ? (
                <EmptyState title={'No Products available'} />
              ) : null
            }
            // onEndReachedThreshold={0} // Trigger data fetch near the end
            ListFooterComponent={FooterComponents}
          />
        </>

        <CategoryModal
          categories={categories}
          loadingCategories={loadingCategories}
          modal={modal}
          setCategoryId={handleCategoryChange}
          setModal={setModal}
        />
      </View>
    </>
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
    // justifyContent: 'space-between',
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
    borderWidth: 1,
    borderColor: 'transparent',
  },
  columnContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 4,
    // backgroundColor: 'red',
  },
  columnWrapper: {
    justifyContent: 'space-between', // Adjust vertical spacing if needed
    // backgroundColor: 'red',
    paddingHorizontal: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'red',
  },
  paginationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: '#F06D06',
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  inActiveButton: {
    backgroundColor: 'transparent',
    width: 35,
    height: 35,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#888',
  },
  buttonTextActive: {
    color: 'white',
  },
  buttonText: {
    color: '#8888',
  },
});
