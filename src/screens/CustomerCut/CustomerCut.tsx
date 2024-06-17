import {UserService} from '@/app/api';
import {AppStatusBar, Box, Icons, PageCard, Splashs} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {createNotification, getCurrentUser} from '@/store/slicers';
import {Colors, Metrics} from '@/theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AxiosError} from 'axios';
import React, {useEffect, useMemo, useRef} from 'react';
import {Platform, ScrollView} from 'react-native';
import {
  SlideInDown,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomerAttendance,
  CustomerAttendanceFooter,
  CustomerSelectBarber,
  CustomerSelectedBarberModal,
} from './components';
import {
  CutContainerStyled,
  CutContentStyled,
  SplashWrapperStyled,
} from './styles';

const CustomerCut: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/cut'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const {steps, selectedBarber, showSelectedModal} = useSelector(
    (state: RootState) => state.cut,
  );
  const {user} = useSelector((state: RootState) => state.auth);

  const insetsStyles = {
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const scrollAnimatedValue = useSharedValue(0);
  const SPLASH_SIZE = 200;
  const ANIMATION_RATE_MULT = 0.5;
  const GAP_LIMIT = 40;

  const gapStyle = useAnimatedStyle(() => {
    if (scrollAnimatedValue.value * ANIMATION_RATE_MULT >= GAP_LIMIT) {
      return {
        gap: -GAP_LIMIT,
      };
    }

    return {gap: -scrollAnimatedValue.value * ANIMATION_RATE_MULT};
  });

  const isOpen = useMemo(
    () => (selectedBarber ? selectedBarber?.open : true),
    [selectedBarber],
  );

  const splashProps = useAnimatedProps(() => {
    if (Platform.OS === 'android') {
      return {
        width: SPLASH_SIZE,
        height: SPLASH_SIZE,
      };
    }

    if (scrollAnimatedValue.value * ANIMATION_RATE_MULT > GAP_LIMIT) {
      return {
        width: SPLASH_SIZE - GAP_LIMIT,
        height: SPLASH_SIZE - GAP_LIMIT,
      };
    }

    const newSize =
      SPLASH_SIZE - scrollAnimatedValue.value * ANIMATION_RATE_MULT;

    return {
      width: newSize,
      height: newSize,
    };
  });

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/customer/home');
    }
  };

  const onPageCardScroll = (contentOffsetY: number) => {
    if (contentOffsetY > 0) {
      scrollAnimatedValue.value = contentOffsetY;
    }
  };

  const scrollRef = useRef<ScrollView>(null);

  // reset scrollAnimatedValue on steps change
  useEffect(() => {
    if (scrollAnimatedValue.value > 0) {
      scrollAnimatedValue.value = withSpring(0, {duration: 1200});
      scrollRef.current?.scrollTo({y: 0, animated: true});
    }
  }, [steps, scrollAnimatedValue]);

  const isFavorite = useMemo(() => {
    return user?.favorites?.some(fav =>
      typeof fav === 'string'
        ? fav === selectedBarber?._id
        : fav._id === selectedBarber?._id,
    );
  }, [user, selectedBarber]);

  const onFavorite = async () => {
    try {
      if (selectedBarber) {
        await UserService.favoriteBarber(selectedBarber._id);

        await dispatch(getCurrentUser());
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const {message} = error.response?.data;

        if (message) {
          dispatch(
            createNotification({
              id: 'favorite_barber',
              message: `errors.${message}`,
              type: 'error',
            }),
          );
        }
      }
    }
  };

  return (
    <CutContainerStyled style={[insetsStyles, gapStyle]}>
      <AppStatusBar color={Colors.border} />
      <Header.Container
        zIndex={2}
        direction="row"
        justifyContent={steps === 'attendance' ? 'space-between' : 'flex-start'}
        alignItems="center">
        <Header.GoBack pressables={{back: goBack}} />
        {steps === 'attendance' && (
          <Box
            paddings={{horizontal: 6}}
            direction="row"
            alignItems="center"
            justifyContent="flex-end">
            <Icons.HeartIcon
              width={24}
              height={24}
              color="main"
              onPress={onFavorite}
              fill={isFavorite ? 'main' : 'transparent'}
            />
          </Box>
        )}
      </Header.Container>
      <CutContentStyled>
        <SplashWrapperStyled entering={SlideInDown.delay(150).duration(500)}>
          <Splashs.BarberCuttingSplash
            animatedProps={splashProps}
            grayscale={!isOpen}
          />
        </SplashWrapperStyled>
        <PageCard
          scrollable
          onScroll={(contentOffsetY, _, closeToBottom, event) => {
            if (!closeToBottom && event) {
              onPageCardScroll(contentOffsetY);
            }
          }}
          scrollProps={
            {
              ref: scrollRef,
            } as any
          }
          bounce={false}
          wrapperProps={{
            style: {
              paddingBottom: Metrics.platformPaddingBottom,
            },
          }}
          footer={
            <>{steps === 'attendance' && <CustomerAttendanceFooter />}</>
          }>
          {steps === 'select' && <CustomerSelectBarber />}
          {steps === 'attendance' && <CustomerAttendance isOpen={isOpen} />}
        </PageCard>
      </CutContentStyled>
      {showSelectedModal && !!selectedBarber && <CustomerSelectedBarberModal />}
    </CutContainerStyled>
  );
};

export default CustomerCut;
