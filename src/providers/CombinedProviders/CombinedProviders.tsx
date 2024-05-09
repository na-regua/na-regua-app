import React from 'react';

import {AppNavigator} from '@/navigation';
import {store} from '@/store/Store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as StoreProvider} from 'react-redux';
import PersistedData from '../PersistedData/PersistedData';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {combinedProvidersStyles} from './styles';

import {SocketProvider} from '@/socket';
import {Colors} from '@/theme';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {ThemeProvider} from 'styled-components/native';
import NotifyProvider from '../NotifyProvider/NotifyProvider';
import {StatusBarProvider} from '../StatusBarProvider/StatusBarProvider';

const CombinedProviders: React.FC = () => {
  return (
    <GestureHandlerRootView style={combinedProvidersStyles.gestureHandler}>
      <SafeAreaProvider>
        <ThemeProvider theme={{colors: Colors}}>
          {/* Redux Store provider */}
          <StoreProvider store={store}>
            {/* Socket provider */}
            <SocketProvider>
              {/* StatusBar provider */}
              <StatusBarProvider>
                <BottomSheetModalProvider>
                  {/* Get persisted data E.g Token */}
                  <PersistedData />
                  {/* App routes */}

                  <AppNavigator />
                  {/* App notifier */}
                  <NotifyProvider />
                </BottomSheetModalProvider>
              </StatusBarProvider>
            </SocketProvider>
          </StoreProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default CombinedProviders;
