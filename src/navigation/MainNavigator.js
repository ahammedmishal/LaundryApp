import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CartScreen from '../screens/CartScreen';
import MyCart from '../../redux/MyCart';
import ScheduleScreen from '../screens/ScheduleScreen';
import OrderDetails from '../screens/OrderDetails';

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
};

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScheduleScreen"
          component={ScheduleScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
