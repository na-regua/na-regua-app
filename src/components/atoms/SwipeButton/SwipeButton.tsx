import {Colors} from '@/theme';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  Extrapolate,
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icons from '../Icons/Icons';
import Loader from '../Loader/Loader';
import {
  SwipeButtonColorWaveStyled,
  SwipeButtonDotStyled,
  SwipeButtonLoaderWrapper,
  SwipeButtonTextStyled,
  SwipeButtonWrapperStyled,
} from './styles';

export type SwipeButtonState = 'off' | 'on' | 'wait';

interface SwipeButtonProps {
  onToggle: (value: boolean) => void;
  title: string;
  resetAfterToggle?: boolean;
  resetAfterLoading?: boolean;
  state?: SwipeButtonState;
}

const HEIGHT = 52;
const PADDING = 8;
const SWIPEABLE_DIMENSIONS = HEIGHT - 2 * PADDING;
const WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * PADDING;

const SwipeButton: React.FC<SwipeButtonProps> = ({
  onToggle,
  title,
  resetAfterToggle,
  resetAfterLoading,
  state,
}) => {
  const {t: translate} = useTranslation();
  const X = useSharedValue(0);
  const [width, setWidth] = useState(40);

  const [toggled, setToggled] = useState(false);

  const SWIPE_RANGE = useMemo(
    () => width - 2 * PADDING - SWIPEABLE_DIMENSIONS,
    [width],
  );

  const handleComplete = (isToggled: boolean) => {
    if (isToggled !== toggled) {
      setToggled(isToggled);
      onToggle(isToggled);

      if (resetAfterToggle) {
        setTimeout(() => {
          setToggled(false);
          X.value = withSpring(0);
        }, 300);
      }
    }
  };

  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggled;
    },
    onActive: (e, ctx) => {
      let newValue;

      if (ctx.completed) {
        newValue = SWIPE_RANGE + e.translationX;
      }

      if (!ctx.completed) {
        newValue = e.translationX;
      }

      if (newValue >= 0 && newValue <= SWIPE_RANGE) {
        X.value = newValue;
      }
    },
    onEnd: () => {
      if (X.value < width / 2 - SWIPEABLE_DIMENSIONS / 2) {
        runOnJS(setToggled)(false);
        X.value = withSpring(0);
      } else {
        runOnJS(handleComplete)(true);
        X.value = withSpring(SWIPE_RANGE);
      }
    },
  });

  const InterpolateXValue = [0, SWIPE_RANGE];
  const AnimatedStyles = {
    dot: useAnimatedStyle(() => {
      return {
        transform: [{translateX: X.value}],
      };
    }),
    colorWave: useAnimatedStyle(() => {
      return {
        width: WAVE_RANGE + X.value,
        opacity: interpolate(
          X.value,
          InterpolateXValue,
          [0, 1],
          Extrapolate.CLAMP,
        ),
      };
    }),
    text: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXValue,
          [0.8, 0],
          Extrapolate.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              InterpolateXValue,
              [0, width / 2 - SWIPEABLE_DIMENSIONS],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    }),
  };

  useEffect(() => {
    if (toggled && resetAfterLoading && state === 'off') {
      setToggled(false);
      X.value = withSpring(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, toggled]);

  return (
    <SwipeButtonWrapperStyled
      height={HEIGHT}
      onLayout={event => {
        setWidth(event.nativeEvent.layout.width);
      }}>
      <SwipeButtonColorWaveStyled
        style={AnimatedStyles.colorWave}
        height={HEIGHT}
      />

      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <SwipeButtonDotStyled
          size={SWIPEABLE_DIMENSIONS}
          padding={PADDING}
          style={AnimatedStyles.dot}>
          {state !== 'on' && (
            <Icons.ChevronDoubleRightIcon strokeWidth={2} color="primary" />
          )}
          {state === 'on' && (
            <SwipeButtonLoaderWrapper entering={FadeIn} exiting={FadeOut}>
              <Loader color={Colors.white3} size="48" strokeWidth={2} />
            </SwipeButtonLoaderWrapper>
          )}
        </SwipeButtonDotStyled>
      </PanGestureHandler>
      <SwipeButtonTextStyled style={AnimatedStyles.text}>
        {translate(title)}
      </SwipeButtonTextStyled>
    </SwipeButtonWrapperStyled>
  );
};

export {SwipeButton};
