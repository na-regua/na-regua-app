/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import './i18n/i18n';
import {CombinedProviders} from './providers';

function App(): JSX.Element {
  return <CombinedProviders />;
}

export default App;
