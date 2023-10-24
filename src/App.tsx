/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import './i18n/i18n';
import {CombinedProviders} from './providers';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): JSX.Element {
  const clearCache = async () => {
    await AsyncStorage.clear();
  };

  useEffect(() => {
    clearCache();
  }, []);

  return <CombinedProviders />;
}

export default App;
