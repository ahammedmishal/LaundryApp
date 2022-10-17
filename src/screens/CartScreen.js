import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {COLORS, FONTS} from '../constants/theme';
import {useSelector, useDispatch} from 'react-redux';
import {addProductToCart, deleteCartItem, removeProductFromCart} from '../../redux/CartSlice';
import {decreaseQty, increaseQty} from '../../redux/ProductSlice';
import ICON from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDown from '../Components/DropDown';
import images from '../constants/images';
import {ICONS} from '../constants';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const CartScreen = ({navigation}) => {
  let data = [
    {id: 1, name: 'Men'},
    {id: 2, name: 'women'},
  ];
  const [selectedItem, setSelectedItem] = useState(null);
  const onSelect = item => {
    setSelectedItem(item);
  };
  const myProducts = useSelector(state => state.product);
  const myCartItems = useSelector(state => state.cart);
  // console.log(myProducts);
  console.log(myCartItems);
  const dispatch = useDispatch();

  const getTotal = () => {
    let total = 0;
    myCartItems.map(item => {
      total = total + item.qty * item.price;
    });
    return total;
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.headerContainer}>
        <Image
          source={ICONS.arrowLeft}
          style={{width: 25, height: 20, resizeMode: 'contain'}}
        />
        <Text style={styles.headerTitle}>Order List</Text>
      </View>
      {/* lists */}
      <ScrollView contentContainerStyle={{height:85}} showsHorizontalScrollIndicator={false} horizontal={true}>
      <View style={styles.listContainer}>
        <View style={styles.activeList}>
          <Text style={styles.activeListText}>Wash</Text>
        </View>
        <View style={styles.unActiveList}>
          <Text style={styles.unActiveListText}>Ironing</Text>
        </View>
        <View style={styles.unActiveList}>
          <Text style={styles.unActiveListText}>Fold</Text>
        </View>
        <View style={styles.unActiveList}>
          <Text style={styles.unActiveListText}>Dry</Text>
        </View>
        <View style={styles.unActiveList}>
          <Text style={styles.unActiveListText}>Clear</Text>
        </View>
      </View>
      </ScrollView>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={myProducts}
        renderItem={({item, index}) => {
          return (
            <View style={styles.containerView}>
              <Image source={item.image} style={styles.imageStyle} />

              <View style={{flex: 1, marginLeft: 10, padding: 2}}>
                <Text style={{fontWeight: '700', color: COLORS.primary}}>
                  {item.name}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'red'}}>{'$' + item.price}</Text>
                  <View>
                    <DropDown
                      value={selectedItem}
                      data={data}
                      onSelect={onSelect}
                    />
                  </View>
                </View>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {item.qty == 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(addProductToCart(item));
                      dispatch(increaseQty(item.id));
                    }}
                    style={styles.addToCartButton}>
                    <Text style={{color: '#ffff'}}>Add to Cart</Text>
                  </TouchableOpacity>
                ) : null}
                {item.qty == 0 ? null : (
                  <TouchableOpacity
                  onPress={() => {
                    if(item.qty > 1){
                        dispatch(removeProductFromCart(item));
                        dispatch(decreaseQty(item.id));
                    }else{
                        dispatch(deleteCartItem(item));
                        dispatch(decreaseQty(item.id));
                    }
                  }}
                    style={styles.removeButton}>
                    <MaterialCommunityIcons
                      name="minus"
                      size={20}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                )}
                {item.qty == 0 ? null : (
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 16,
                      fontWeight: '600',
                      color: COLORS.primary,
                    }}>
                    {item.qty}
                  </Text>
                )}
                {item.qty == 0 ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(addProductToCart(item));
                      dispatch(increaseQty(item.id));
                    }}
                    style={styles.addButton}>
                    <MaterialCommunityIcons
                      name="plus"
                      size={20}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />

      {myCartItems.length > 0 ? (
        <View style={styles.confirmOrderView}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
              paddingHorizontal: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: COLORS.lightSecondary,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 15,
                }}>
                <Image
                  source={images.vector8}
                  style={{width: 30, height: 30, resizeMode: 'contain'}}
                />
              </View>
              <View>
                <Text>Total</Text>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontWeight: '800',
                  }}>{`${myCartItems.length} items`}</Text>
              </View>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text>Cost</Text>
              <Text
                style={{
                  color: COLORS.secondary,
                  fontSize: 16,
                  fontWeight: '800',
                }}>{`${getTotal()}$`}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ScheduleScreen')}
            style={styles.confirmOrderButton}>
            <Text style={{color: '#fff', fontSize: 20}}>Confirm Order</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{height: 20}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    width: '94%',
    alignSelf: 'center',
    height: 85,
    backgroundColor: '#F9F9F9',
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    textAlign: 'center',
    fontWeight: '600',
    width: 320,
    color: COLORS.black,
  },
  imageStyle: {
    width: 50,
    height: 50,
    border: 10,
    resizeMode: 'contain',
  },
  confirmOrderView: {
    width: '100%',
    height: 170,
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    shadowRadius: 3,
    borderRadius: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3.6,
    backgroundColor: '#0000',
  },
  confirmOrderButton: {
    width: '90%',
    height: 55,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
  headerView: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',
    elevation: 1,
    paddingHorizontal: 10,
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontFamily: FONTS.h4.fontFamily,
    fontWeight: '700',
  },
  headerIconConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  addButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    width: 25,
    height: 25,
    justifyContent: 'center',
    marginLeft: 10,
    borderColor: '#C3C8D2',
  },
  removeButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    width: 25,
    height: 25,
    justifyContent: 'center',
    marginLeft: 10,
    borderColor: '#C3C8D2',
  },
  addToCartButton: {
    alignItems: 'center',
    backgroundColor: '#ce1567',
    borderRadius: 10,
    height: 35,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  itemStyle: {
    fontSize: 10,
    color: '#007aff',
  },
  pickerStyle: {
    width: '100%',
    height: 40,
    color: '#007aff',
    fontSize: 3,
  },
  textStyle: {
    fontSize: 14,
  },
  listContainer: {
    flexDirection: 'row',
    marginTop: responsiveHeight(1.5),
    padding:10
  },
  activeList: {
    width: responsiveWidth(20),
    height: responsiveHeight(4),
    borderWidth: 1,
    borderRadius: responsiveHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.secondary,
    marginRight:8,
    backgroundColor:COLORS.secondary
  },
  activeListText: {
    fontSize: responsiveFontSize(1.8),
    color: COLORS.white,
    fontWeight: '400',
  },
  unActiveList: {
    width: responsiveWidth(20),
    height: responsiveHeight(4),
    borderWidth: 1,
    borderRadius: responsiveHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.primary,
    marginRight:8
  },
  unActiveListText: {
    fontSize: responsiveFontSize(1.8),
    color: COLORS.primary,
    fontWeight: '400',
  },
});

export default CartScreen;
