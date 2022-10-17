import React,{useEffect} from 'react';
import Main from './src/Main';
import {Provider} from 'react-redux';
import store from './redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
