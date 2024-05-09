import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch} from '@/store/Store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {CHContainerStyled, CHContentStyled} from './styles';

const CustomerHome: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/home'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const goToSettings = () => {
    navigation.navigate('/customer/settings');
  };

  return (
    <CHContainerStyled style={insetsStyles}>
      <Header
        showUser
        showActions={false}
        showBorder
        showWelcome
        onUserPress={goToSettings}
        userClickable
      />
      <CHContentStyled />
    </CHContainerStyled>
  );
};

export default CustomerHome;
