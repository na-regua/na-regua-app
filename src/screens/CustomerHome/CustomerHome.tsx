import {
  AppStatusBar,
  Box,
  Button,
  Icons,
  Splashs,
  Typography,
} from '@/components/atoms';
import {CustomerJoinTodayQueueModal} from '@/components/modals';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {
  CutThunks,
  TicketHistoryActions,
  TicketHistoryThunks,
} from '@/store/slicers';
import {Colors, Fonts} from '@/theme';
import {strongShadowStyle} from '@/utils';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Host} from 'react-native-portalize';
import {
  FadeInDown,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {CustomerHomeHistory} from './components';
import {
  BigActionStyled,
  CHActionStyled,
  CHContainerStyled,
  CHContentStyled,
  CHLeftContent,
  CHRightContent,
  CHTabsContentStyled,
  CHTabsStyled,
  ShareQrButtonContentStyled,
  SplashViewStyled,
  TodayScheduleBarberAvatar,
} from './styles';

const TABS = {
  ATTENDANCE: 0,
  HISTORY: 1,
};

const CustomerHome: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/home'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const isScreenFocused = useIsFocused();

  const homeTabSV = useSharedValue(1);
  const historyTabSV = useSharedValue(0);
  const AnimatedStyles = {
    home: useAnimatedStyle(() => ({
      fontSize: interpolate(
        homeTabSV.value,
        [0, 1],
        [Fonts.sizes.h6, Fonts.sizes.h4],
      ),
    })),
    history: useAnimatedStyle(() => ({
      fontSize: interpolate(
        historyTabSV.value,
        [0, 1],
        [Fonts.sizes.h6, Fonts.sizes.h4],
      ),
    })),
  };

  const {todayTickets} = useSelector((state: RootState) => state.cut);

  const [showJoinQueueModal, setShowJoinQueueModal] = useState(false);

  const [selectedTab, setSelectedTab] = useState(TABS.ATTENDANCE);

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

  const goToSchedules = () => {
    navigation.navigate('/customer/schedules');
  };

  const getTodayTicketsData = async () => {
    await dispatch(CutThunks.fetchTodayTickets());
  };

  const selectTab = async (tab: number) => {
    setSelectedTab(tab);

    if (tab === TABS.ATTENDANCE) {
      homeTabSV.value = withTiming(1, {duration: 100});
      historyTabSV.value = withTiming(0, {duration: 100});
    }

    if (tab === TABS.HISTORY) {
      historyTabSV.value = withTiming(1, {duration: 100});
      homeTabSV.value = withTiming(0, {duration: 100});
      dispatch(TicketHistoryActions.clear());
      await dispatch(TicketHistoryThunks.fetchTicketHistory());
    }
  };

  useEffect(() => {
    if (isScreenFocused) {
      getTodayTicketsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScreenFocused]);

  return (
    <CHContainerStyled style={insetsStyles}>
      <AppStatusBar />
      <Header.Container>
        <Header.User pressables={{user: goToSettings}} />
        <Header.Border />
      </Header.Container>
      <Host style={{flex: 1}}>
        <CHContentStyled>
          <Typography variant="h4" weight="medium" color="black3">
            {'Menu'}
          </Typography>
          <BigActionStyled
            direction="row"
            onPress={goToCut}
            backgroundColor="secondary"
            underlayColor={Colors.secondaryHover}
            entering={FadeInDown}>
            <>
              <Box
                entering={FadeInDown.delay(300)}
                alignItems="center"
                justifyContent="center">
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
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => selectTab(TABS.ATTENDANCE)}>
              <Typography
                color={selectedTab === TABS.ATTENDANCE ? 'black2' : 'default'}
                animatedStyles={AnimatedStyles.home}>
                {'customer.home.tabs.attendance'}
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => selectTab(TABS.HISTORY)}>
              {/* variant={selectedTab === TABS.HISTORY ? 'h4' : 'h6'} */}
              <Typography
                color={selectedTab === TABS.HISTORY ? 'black2' : 'default'}
                animatedStyles={AnimatedStyles.history}>
                {'customer.home.tabs.history'}
              </Typography>
            </TouchableOpacity>
          </CHTabsStyled>
          <Box flex={1}>
            {selectedTab === TABS.ATTENDANCE && (
              <CHTabsContentStyled
                entering={SlideInLeft}
                exiting={SlideOutLeft}>
                <>
                  {(todayTickets?.schedule || todayTickets?.queue) && (
                    <CHLeftContent>
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

                      {todayTickets?.schedule &&
                        todayTickets.schedule.schedule?.date && (
                          <CHActionStyled
                            color="default"
                            height={120}
                            underlayColor={Colors.defaultHover}
                            entering={FadeInDown}
                            style={[strongShadowStyle]}>
                            <Box
                              width="100%"
                              direction="column"
                              justifyContent="flex-end"
                              alignItems="flex-end"
                              position="relative">
                              <Typography
                                variant="body1"
                                color="white3"
                                textAlign="right"
                                weight="semiBold">
                                {'customer.home.actions.mySchedule.today'}
                              </Typography>
                              <Typography
                                variant="caption"
                                textAlign="right"
                                weight="semiBold"
                                color="primary">
                                {todayTickets.schedule.barber.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                textAlign="right"
                                translate={false}>
                                {format(
                                  new Date(todayTickets.schedule.schedule.date),
                                  'dd/MM',
                                )}
                              </Typography>
                              <Typography
                                variant="caption"
                                textAlign="right"
                                translate={false}>
                                {todayTickets.schedule.schedule?.time}
                              </Typography>
                              <SplashViewStyled left={-10} bottom={40}>
                                <TodayScheduleBarberAvatar
                                  source={
                                    todayTickets.schedule.barber.avatar.url
                                  }
                                  onError={() => {}}
                                />
                              </SplashViewStyled>
                            </Box>
                          </CHActionStyled>
                        )}
                    </CHLeftContent>
                  )}

                  <CHRightContent>
                    <CHActionStyled
                      underlayColor={Colors.sandHover}
                      color="sand"
                      height={160}
                      onPress={goToSchedules}
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
                  </CHRightContent>
                </>
              </CHTabsContentStyled>
            )}

            {selectedTab === TABS.HISTORY && (
              <CHTabsContentStyled
                entering={SlideInRight}
                exiting={SlideOutRight}>
                <CustomerHomeHistory isScreenFocused={isScreenFocused} />
              </CHTabsContentStyled>
            )}
          </Box>
        </CHContentStyled>
      </Host>
      {/* This should be under any host */}
      {todayTickets?.queue && showJoinQueueModal && (
        <CustomerJoinTodayQueueModal
          onBack={() => setShowJoinQueueModal(false)}
          onContinue={() => setShowJoinQueueModal(false)}
          ticket={todayTickets?.queue}
        />
      )}
    </CHContainerStyled>
  );
};

export default CustomerHome;
