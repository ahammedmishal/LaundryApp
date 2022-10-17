import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CheckBox from '../Components/CheckBox';
import {ICONS, IMAGES} from '../constants';
import {COLORS} from '../constants/theme';
import {useSelector, useDispatch} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

const ScheduleScreen = ({navigation}) => {
  const [checked, setChecked] = React.useState(false);

  //date
  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  const [timePicker, setTimePicker] = useState(false);

  const [time, setTime] = useState(new Date(Date.now()));

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
    setTimePicker(true);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }
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
        <Text style={styles.headerTitle}>Schedule A Pickup</Text>
      </View>
      {/* contents */}
      <ScrollView style={styles.containerView}>
        <Text style={styles.subHead}>Price details</Text>
        {/* view price modal */}
        <View style={styles.priceDetailsView}>
          <View style={styles.priceDetails}>
            <Text style={styles.priceText}>Subtotal</Text>
            <Text style={styles.priceTaxText}>{`$${getTotal()}`}</Text>
          </View>
          <View style={styles.priceDetails}>
            <Text style={styles.taxText}>Tax</Text>
            <Text style={styles.priceTaxText}>$10</Text>
          </View>
          <View style={styles.seperatorLine}></View>
          <View style={styles.priceDetails}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmountText}>{`$${getTotal() + 10}`}</Text>
          </View>
        </View>
        {/* shedule date */}
        <Text style={styles.subHead}>Schedule Date</Text>

        <View style={styles.sheduleView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text>Pickup Time</Text>
            <Text>Delivery Time</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
         
            <TouchableOpacity
            onPress={showDatePicker}
              style={{
                borderWidth: 1,
                width: '50%',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderColor: COLORS.lightBg,
                paddingLeft: 15,
                height: responsiveHeight(8),
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={ICONS.FromCalender}
                  style={{width: 30, height: 30, resizeMode: 'contain'}}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.date}>{date.toDateString()}</Text>
                  <Text style={styles.time}>
                    {time.toLocaleTimeString('en-US')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          
            {/* calender */}
            <TouchableOpacity
              onPress={showDatePicker}
              style={{
                borderWidth: 1,
                width: '50%',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderColor: COLORS.lightBg,
                paddingLeft: 15,
                height: responsiveHeight(8),
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={ICONS.ToCalender}
                  style={{width: 30, height: 30, resizeMode: 'contain'}}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.date}>{date.toDateString()}</Text>
                  <Text style={styles.time}>
                    {time.toLocaleTimeString('en-US')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {datePicker && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelected}
            style={styles.datePicker}
          />
        )}
 
        {timePicker && (
          <DateTimePicker
            value={time}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={false}
            onChange={onTimeSelected}
            style={styles.datePicker}
          />
        )}

        {/* payment method */}
        <Text style={styles.subHead}>Payment method</Text>

        <View style={styles.paymentMethod}>
          <View style={styles.paymentItems}>
            <View style={styles.paymentItem}>
              <CheckBox
                onPress={() => setChecked(!checked)}
                isChecked={checked}
              />
              <View style={{marginLeft: 20}}>
                <Text style={styles.paymentText}>Pay Via Paypal</Text>
                <Text style={styles.addAccountText}>+ Add account</Text>
              </View>
            </View>
            <Image source={ICONS.PayPal} style={styles.payPalIcon} />
          </View>

          <View style={styles.paymentItems}>
            <View style={styles.paymentItem}>
              <CheckBox
                onPress={() => setChecked(!checked)}
                isChecked={checked}
              />
              <View style={{marginLeft: 20}}>
                <Text style={styles.paymentText}>Visa/Master Card</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{marginRight: 18}}>**** **** **** 1234</Text>
                  <Image
                    source={ICONS.EditIcon}
                    style={{width: 15, height: 15, resizeMode: 'contain'}}
                  />
                </View>
              </View>
            </View>
            <Image source={ICONS.Visa} style={styles.visaIcon} />
          </View>

          <View style={styles.paymentItems}>
            <View style={styles.paymentItem}>
              <CheckBox
                onPress={() => setChecked(!checked)}
                isChecked={checked}
              />
              <View style={{marginLeft: 20}}>
                <Text style={styles.paymentText}>Cash On Delivery</Text>
              </View>
            </View>
            <Image source={ICONS.Delivery} style={styles.deliveryIcon} />
          </View>
        </View>

        {/* address */}
        <Text style={styles.subHead}>Address</Text>
        <View style={styles.addressView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={ICONS.Start}
              style={{
                width: 22,
                height: 22,
                resizeMode: 'contain',
                marginRight: 20,
              }}
            />
            <View>
              <Text style={styles.addressext}>Pickup Address</Text>
              <Text style={{fontSize: 12}}>
                CT7B The Sparks, KDT Duong Noi, Str. Ha Dong,{'\n'}Ha Noi
              </Text>
            </View>
          </View>
          <View style={styles.seperatorLine1} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={ICONS.Map}
              style={{
                width: 22,
                height: 22,
                resizeMode: 'contain',
                marginRight: 20,
              }}
            />
            <View>
              <Text style={styles.addressext}>Delivery Address</Text>
              <Text style={{fontSize: 12}}>
                CT7B The Sparks, KDT Duong Noi, Str. Ha Dong,{'\n'}Ha Noi
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.confirmOrderView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderDetails')}
          style={styles.confirmOrderButton}>
          <Text style={{color: '#fff', fontSize: 20}}>Confirm Order</Text>
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
    marginVertical: 20,
  },
  priceDetailsView: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: responsiveHeight(16),
    justifyContent: 'space-evenly',
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
  seperatorLine1: {
    height: responsiveHeight(0.1),
    width: responsiveWidth(70),
    backgroundColor: '#E9EBF0',
    alignSelf: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  priceTaxText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '700',
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
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: responsiveHeight(10),
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
  addressView: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    height: responsiveHeight(22),
    borderColor: '#E9EBF0',
    paddingHorizontal: 20,
    justifyContent: 'space-around',
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
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
  time: {
    fontSize: 17,
    color: COLORS.primary,
    fontWeight: '700',
  },
  date: {
    fontSize: 13,
    color: COLORS.black,
    fontWeight: '500rrrr',
  },
});

export default ScheduleScreen;
