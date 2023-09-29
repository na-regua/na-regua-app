/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import './i18n/i18n';
import {AppNavigator} from './navigation';
import {Provider} from 'react-redux';
import {store} from './store/Store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
