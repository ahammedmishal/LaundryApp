import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {FONTS} from '../src/constants/theme';
import {useSelector, useDispatch} from 'react-redux';
import {addProductToCart, deleteCartItem, removeProductFromCart} from './CartSlice';
import { decreaseQty, increaseQty } from './ProductSlice';

const MyCart = () => {
  const myCartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 20,
          backgroundColor: '#ffff',
          elevation: 1,
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            fontFamily: FONTS.h4.fontFamily,
            fontWeight: '700',
          }}>
          Oder List
        </Text>
      </View>
      <FlatList
        data={myCartItems}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                width: '94%',
                elevation: 1,
                alignSelf: 'center',
                height: 100,
                backgroundColor: '#ffff',
                marginTop: 10,
                borderRadius: 10,
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Image
                source={item.image}
                style={{
                  width: 50,
                  height: 50,
                  border: 10,
                  resizeMode: 'contain',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 10,
                  flex: 1,
                }}>
                <View>
                  <Text style={{fontWeight: '700'}}>{item.name}</Text>
                  <Text style={{color: 'red'}}>{'$' + item.price}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      style={{
                        alignItems: 'center',
                        backgroundColor: '#ce1567',
                        borderRadius: 30,
                        height: 35,
                        justifyContent: 'center',
                        paddingHorizontal: 10,
                        marginLeft: 10,
                      }}>
                      <Text style={{color: '#ffff'}}>-</Text>
                    </TouchableOpacity>
                  )}
                  {item.qty == 0 ? null : (
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        fontWeight: '600',
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
                      style={{
                        alignItems: 'center',
                        backgroundColor: '#ce1567',
                        borderRadius: 30,
                        height: 35,
                        justifyContent: 'center',
                        paddingHorizontal: 10,
                        marginLeft: 10,
                      }}>
                      <Text style={{color: '#ffff'}}>+</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyCart;
