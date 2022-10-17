import React, {useEffect} from 'react';
import MainNavigator from './navigation/MainNavigator';
import {useDispatch} from 'react-redux';
import { addProducts } from '../redux/ProductSlice';
import PRODUCTS from './constants/productsdata';

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    PRODUCTS.map(item => {
      dispatch(addProducts(item));
    });
  }, )

  return <MainNavigator />;
};

export default Main;
