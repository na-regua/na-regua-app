import {PageCard, Splashs} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {RootState} from '@/store/Store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  SlideInDown,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {AttendanceFooter, CustomerAttendance, SelectBarber} from './components';
import {
  CutContainerStyled,
  CutContentStyled,
  SplashWrapperStyled,
} from './styles';

const CustomerCut: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/cut'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {steps} = useSelector((state: RootState) => state.cut);

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
    if (scrollAnimatedValue.value * ANIMATION_RATE_MULT > GAP_LIMIT) {
      return {
        gap: -GAP_LIMIT,
      };
    }

    return {gap: -scrollAnimatedValue.value};
  });

  const splashProps = useAnimatedProps(() => {
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
      scrollAnimatedValue.value = withSpring(contentOffsetY, {duration: 10});
    }
  };

  return (
    <CutContainerStyled style={[insetsStyles, gapStyle]}>
      <Header.Container zIndex={2}>
        <Header.GoBack pressables={{back: goBack}} />
      </Header.Container>
      <CutContentStyled>
        <SplashWrapperStyled entering={SlideInDown.delay(150).duration(500)}>
          <Splashs.BarberCuttingSplash animatedProps={splashProps} />
        </SplashWrapperStyled>
        <PageCard
          scrollable
          onScroll={(contentOffsetY, _, closeToBottom, event) => {
            if (!closeToBottom && event) {
              onPageCardScroll(contentOffsetY);
            }
          }}
          footer={<>{steps === 'attendance' && <AttendanceFooter />}</>}>
          {steps === 'select' && <SelectBarber />}
          {steps === 'attendance' && <CustomerAttendance />}
        </PageCard>
      </CutContentStyled>
    </CutContainerStyled>
  );
};

export default CustomerCut;
