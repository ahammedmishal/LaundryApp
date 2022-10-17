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
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CheckBox from '../Components/CheckBox';
import {ICONS, IMAGES} from '../constants';
import {COLORS} from '../constants/theme';
import ICON from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';

const OrderDetails = ({navigation}) => {
  const [checked, setChecked] = React.useState(false);
  const myProducts = useSelector(state => state.product);
  const myCartItems = useSelector(state => state.cart);
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
      {/* header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={ICONS.arrowLeft}
            style={{width: 25, height: 20, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>
      {/* contents */}
      <ScrollView style={styles.containerView}>
        <Image
          source={IMAGES.vector9}
          style={{
            marginBottom: 8,
            alignSelf: 'center',
            width: responsiveWidth(32),
            height: responsiveHeight(18),
          }}
        />
        <Text style={styles.subHead}>Thanh for choosing Us!</Text>
        <Text style={styles.subHead1}>Your pickup has been confirmed</Text>

        {/* view price modal */}
        <View style={styles.priceDetailsView}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.orderText}>Order #123</Text>
              <Text style={styles.orderSubText}>(2 bags)</Text>
            </View>
            <Text style={styles.orderSubText}>11:35 AM, Thu, 15 Jun 2019</Text>
          </View>
          <View style={styles.seperatorLine} />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.categoryHeading}>Wash & Fold</Text>
            <ICON name="chevron-up" size={20} color={COLORS.black} />
          </View>
          <View style={styles.priceDetails}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.priceText}>2 x </Text>
              {/* <Text style={styles.priceText}>2 x {Tshirt}</Text> */}
              <Text style={styles.categorySubHeading}>(Men)</Text>
            </View>
            <Text style={styles.priceTaxText}>$6</Text>
          </View>
          <View style={styles.priceDetails}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.priceText}>3 x Jean</Text>
              <Text style={styles.categorySubHeading}>(Men)</Text>
            </View>
            <Text style={styles.priceTaxText}>$6</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.categoryHeading}>Wash & Iron</Text>
            <ICON name="chevron-up" size={20} color={COLORS.black} />
          </View>

          <View style={styles.priceDetails}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.priceText}>2 x Tshirt</Text>
              <Text style={styles.categorySubHeading}>(Men)</Text>
            </View>
            <Text style={styles.priceTaxText}>$6</Text>
          </View>
          <View style={styles.priceDetails}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.priceText}>3 x Jean</Text>
              <Text style={styles.categorySubHeading}>(Men)</Text>
            </View>
            <Text style={styles.priceTaxText}>$6</Text>
          </View>

          <View style={styles.seperatorLine} />

          <View style={styles.priceDetails}>
            <Text style={styles.subTotaltext}>Subtotal</Text>
            <Text style={styles.subTotalAmount}>$220.23</Text>
          </View>
          <View style={styles.priceDetails}>
            <Text style={styles.subTotaltext}>Tax</Text>
            <Text style={styles.subTotalAmount}>$10</Text>
          </View>
          <View style={styles.seperatorLine}></View>
          <View style={styles.priceDetails}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmountText}>$230.23</Text>
          </View>
        </View>

        {/* address */}

        <View style={styles.orderView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={ICONS.Shipping}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
              <Text style={styles.addressext}>Order Status</Text>
            </View>
            <Text style={styles.viewdetails}>View detail</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 22,
                height: 22,
                marginRight: 10,
                backgroundColor: '#d3eadd',
                borderRadius: 30,
                position: 'absolute',
              }}
            />
            <View
              style={{
                width: 13,
                height: 13,
                marginRight: 10,
                backgroundColor: 'green',
                borderRadius: 30,
                top: 4.5,
                left: 4.5,
              }}></View>
            <View style={{marginLeft: 10, justifyContent: 'space-evenly'}}>
              <Text style={styles.deliverdText}>Delivered</Text>
              <Text>7:00 AM, Wed, 6 Jun 2019</Text>
            </View>
          </View>
        </View>
        <View style={styles.sheduleView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={ICONS.Calender}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
              <Text style={styles.addressext}>Schedule Date</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.confirmOrderView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyCart')}
          style={styles.confirmOrderButton}>
          <Text
            style={{color: COLORS.secondary, fontSize: 20, fontWeight: '600'}}>
            Schedule a laundry
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  containerView: {
    paddingHorizontal: 20,
  },
  subHead: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '600',
    alignSelf: 'center',
  },
  subHead1: {
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'center',
    marginVertical: 5,
  },
  priceDetailsView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: responsiveHeight(48),
    justifyContent: 'space-around',
    borderColor: '#E9EBF0',
    borderWidth: 1,
    paddingVertical: 10,
  },
  orderText: {
    color: COLORS.black,
    fontWeight: '700',
    fontSize: 15,
    marginRight: 3,
  },
  orderSubText: {
    fontSize: 13,
  },
  priceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seperatorLine: {
    height: responsiveHeight(0.1),
    width: '100%',
    backgroundColor: '#E9EBF0',
  },
  categoryHeading: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '700',
  },
  subTotaltext: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '400',
  },
  subTotalAmount: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  categorySubHeading: {},
  seperatorLine1: {
    height: responsiveHeight(0.1),
    width: responsiveWidth(70),
    backgroundColor: 'lightgrey',
    alignSelf: 'flex-end',
  },
  priceText: {
    fontSize: 14,
    color: COLORS.black,
    marginRight: 5,
  },
  priceTaxText: {
    fontSize: 15,
    color: COLORS.secondary,
    fontWeight: '400',
  },
  taxText: {
    fontSize: 14,
    color: COLORS.primary,
  },
  totalText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  totalAmountText: {
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: '700',
  },
  sheduleView: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: responsiveHeight(10),
    justifyContent: 'space-evenly',
  },
  paymentMethod: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    height: responsiveHeight(22),
    borderColor: '#E9EBF0',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  paymentItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payPalIcon: {
    width: responsiveWidth(7),
    height: responsiveHeight(5),
    resizeMode: 'contain',
  },
  visaIcon: {
    width: responsiveWidth(11),
    height: responsiveHeight(5),
    resizeMode: 'contain',
  },
  deliveryIcon: {
    width: responsiveWidth(11),
    height: responsiveHeight(5),
    resizeMode: 'contain',
  },
  paymentText: {
    fontSize: 17,
    color: COLORS.primary,
    fontWeight: '600',
  },
  addAccountText: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  orderView: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    height: responsiveHeight(13),
    borderColor: '#E9EBF0',
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    marginTop: 14,
  },
  sheduleView: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    height: responsiveHeight(13),
    borderColor: '#E9EBF0',
    paddingHorizontal: 20,
    marginTop: 14,
    paddingVertical: 15,
  },
  addressext: {
    fontSize: 17,
    color: COLORS.primary,
    fontWeight: '600',
  },
  confirmOrderView: {
    width: '100%',
    height: 100,
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
    borderWidth: 2,
    borderColor: COLORS.secondary,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
  viewdetails: {
    fontSize: 13,
    color: COLORS.secondary,
    fontWeight: '400',
  },
  deliverdText: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: '700',
  },
});

export default OrderDetails;
