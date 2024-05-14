import {Button, Icons, Splashs, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  BigActionStyled,
  BigActionTextStyled,
  CHContainerStyled,
  CHContentStyled,
  CHTabsStyled,
  LineStyled,
  ShareQrButtonContentStyled,
} from './styles';
import {Colors} from '@/theme';

const CustomerHome: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/home'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const goToSettings = () => {
    navigation.navigate('/customer/settings');
  };

  const goToCut = () => {
    navigation.navigate('/customer/cut');
  };

  return (
    <CHContainerStyled style={insetsStyles}>
      <Header.Container>
        <Header.User pressables={{user: goToSettings}} />
        <Header.Border />
      </Header.Container>
      <CHContentStyled>
        <View>
          <Typography variant="h2" weight="regular" color="black3">
            {'customer.home.titles.ask1'}
          </Typography>
          <Typography variant="h2" color="black3">
            {'customer.home.titles.ask2'}
          </Typography>
        </View>
        <BigActionStyled
          direction="row"
          onPress={goToCut}
          backgroundColor="secondary"
          underlayColor={Colors.secondaryHover}>
          <>
            <Splashs.BarberSplash />
            <BigActionTextStyled>
              <Typography variant="h4" weight="medium" color="white3">
                {'customer.home.actions.cut.title'}
              </Typography>
              <Typography variant="caption" color="white1" textAlign="left">
                {'customer.home.actions.cut.description'}
              </Typography>
            </BigActionTextStyled>
          </>
        </BigActionStyled>
        <LineStyled />
        <Button
          customContent={
            <ShareQrButtonContentStyled>
              <Icons.QRIcon color="main" disabled />
              <Typography variant="button" color="black3">
                {'customer.home.buttons.readQr'}
              </Typography>
            </ShareQrButtonContentStyled>
          }
          variant="ghost"
        />
        <LineStyled />
        <CHTabsStyled>
          <Typography variant="h4" color="black2">
            {'customer.home.tabs.attendance'}
          </Typography>
          <Typography variant="h6" color="default">
            {'customer.home.tabs.history'}
          </Typography>
        </CHTabsStyled>
      </CHContentStyled>
    </CHContainerStyled>
  );
};

export default CustomerHome;
