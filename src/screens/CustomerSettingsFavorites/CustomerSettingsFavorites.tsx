import {AppStatusBar} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {ContainerStyle, ScrollContentStyle} from './styles';

const CustomerSettingsFavorites: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/settings/favorites'>
> = ({navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const {user} = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  if (!user) {
    return null;
  }

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/customer/home');
    }
  };

  return (
    <ContainerStyle style={insetsStyles}>
      <AppStatusBar />
      <Header.Container>
        <Header.GoBack pressables={{back: goBack}} />
        <Header.Border />
      </Header.Container>
      <ScrollContentStyle
        showsVerticalScrollIndicator={false}></ScrollContentStyle>
    </ContainerStyle>
  );
};

export default CustomerSettingsFavorites;
