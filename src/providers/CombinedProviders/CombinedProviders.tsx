import React from 'react';

import {AppNavigator} from '@/navigation';
import {store} from '@/store/Store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as StoreProvider} from 'react-redux';
import PersistedData from '../PersistedData/PersistedData';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {combinedProvidersStyles} from './styles';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {ThemeProvider} from 'styled-components/native';
import {Colors} from '@/theme';
import NotifyProvider from '../NotifyProvider/NotifyProvider';

const CombinedProviders: React.FC = () => {
  return (
    <GestureHandlerRootView style={combinedProvidersStyles.gestureHandler}>
      <SafeAreaProvider>
        <ThemeProvider theme={{colors: Colors}}>
          <BottomSheetModalProvider>
            <StoreProvider store={store}>
              <PersistedData />

              <AppNavigator />

              <NotifyProvider />
            </StoreProvider>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default CombinedProviders;
