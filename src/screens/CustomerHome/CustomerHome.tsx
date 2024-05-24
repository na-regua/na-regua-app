import {Box, Button, Icons, Splashs, Typography} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {fetchTodayTickets} from '@/store/slicers';
import {Colors} from '@/theme';
import {strongShadowStyle} from '@/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {FadeInDown} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  BigActionStyled,
  CHActionStyled,
  CHContainerStyled,
  CHContentStyled,
  CHTabsContentStyled,
  CHTabsStyled,
  ShareQrButtonContentStyled,
  SplashViewStyled,
} from './styles';
import {CustomerJoinTodayQueue} from '@/components/modals';

const CustomerHome: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/home'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();

  const {todayTickets} = useSelector((state: RootState) => state.cut);

  const [showJoinQueueModal, setShowJoinQueueModal] = useState(false);

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

  const goToQrScanner = () => {
    navigation.navigate('/customer/qr-scanner');
  };

  const getTodayTicketsData = async () => {
    await dispatch(fetchTodayTickets());
  };

  useEffect(() => {
    getTodayTicketsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CHContainerStyled style={insetsStyles}>
      <Header.Container>
        <Header.User pressables={{user: goToSettings}} />
        <Header.Border />
      </Header.Container>
      <CHContentStyled>
        <View>
          <Typography variant="h4" weight="medium" color="black3">
            {'Menu'}
          </Typography>
        </View>
        <BigActionStyled
          direction="row"
          onPress={goToCut}
          backgroundColor="secondary"
          underlayColor={Colors.secondaryHover}
          entering={FadeInDown}>
          <>
            <Box viewProps={{entering: FadeInDown.delay(300)}}>
              <Splashs.BarberSplash />
            </Box>
            <Box paddings={{bottom: 18}} gap={2} flex={1}>
              <Typography variant="h4" weight="medium" color="white3">
                {'customer.home.actions.cut.title'}
              </Typography>
              <Typography variant="caption" color="white1" textAlign="left">
                {'customer.home.actions.cut.description'}
              </Typography>
            </Box>
          </>
        </BigActionStyled>
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
          onPress={goToQrScanner}
        />
        <CHTabsStyled>
          <Typography variant="h4" color="black2">
            {'customer.home.tabs.attendance'}
          </Typography>
          <Typography variant="h6" color="default">
            {'customer.home.tabs.history'}
          </Typography>
        </CHTabsStyled>
        <Box flex={1}>
          <CHTabsContentStyled>
            {todayTickets?.queue && (
              <CHActionStyled
                underlayColor={Colors.accentBlueHover}
                color="accentBlue"
                height={100}
                onPress={() => setShowJoinQueueModal(true)}
                entering={FadeInDown}
                style={[strongShadowStyle]}>
                <>
                  <Typography variant="body1" weight="semiBold">
                    {'customer.home.actions.queue.title'}
                  </Typography>
                  <SplashViewStyled right={-12} bottom={-12}>
                    <Splashs.ClockSplash size={80} />
                  </SplashViewStyled>
                </>
              </CHActionStyled>
            )}

            {/* {todayTickets?.schedules && todayTickets?.schedules.length > 0 && ( */}
            <CHActionStyled
              underlayColor={Colors.sandHover}
              color="sand"
              height={160}
              onPress={() => {}}
              entering={FadeInDown}>
              <>
                <Typography variant="body1" weight="semiBold">
                  {'customer.home.actions.mySchedule.title'}
                </Typography>
                <SplashViewStyled right={0} bottom={0}>
                  <Splashs.ScheduleSplash />
                </SplashViewStyled>
              </>
            </CHActionStyled>
            {/* )} */}
          </CHTabsContentStyled>
        </Box>
      </CHContentStyled>
      {todayTickets?.queue && showJoinQueueModal && (
        <CustomerJoinTodayQueue
          onBack={() => setShowJoinQueueModal(false)}
          onContinue={() => setShowJoinQueueModal(false)}
          ticket={todayTickets?.queue}
        />
      )}
    </CHContainerStyled>
  );
};

export default CustomerHome;
