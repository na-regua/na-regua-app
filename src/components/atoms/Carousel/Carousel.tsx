import React, {useMemo, useRef, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icons from '../Icons/Icons';
import {
  CarouselActionsWrapperStyled,
  CarouselControlWrapperStyled,
  CarouselDotStyled,
  CarouselDotWrapperStyled,
  CarouselItemStyled,
  CarouselScrollViewStyled,
  CarouselWrapperStyled,
} from './styles';

export interface ICarouselProps {
  items?: {
    element: React.ReactNode;
  }[];
}

const Carousel: React.FC<ICarouselProps> = ({items}) => {
  const [byAction, setByAction] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollXOffset = useSharedValue(0);

  const size = useMemo(() => (items && items.length) || 0, [items]);

  const [scrollViewWidth, setScrollViewWidth] = useState(0);

  const scrollRef = useRef<Animated.ScrollView>(null);

  const [snapPoint, setSnapPoint] = useState(0);

  const onScrollLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setSnapPoint(width);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollXOffset.value = withSpring(event.contentOffset.x, {
        damping: 18,
        stiffness: 120,
      });

      if (!byAction) {
        const index = Math.round(Math.abs(event.contentOffset.x / snapPoint));

        runOnJS(setActiveIndex)(index);
      }
    },
    onMomentumEnd: event => {
      scrollXOffset.value = withSpring(event.contentOffset.x, {
        damping: 18,
        stiffness: 120,
      });

      const index = Math.round(Math.abs(event.contentOffset.x / snapPoint));

      runOnJS(setActiveIndex)(index);
      runOnJS(setByAction)(false);
    },
  });

  const onContentSizeChange = (w: number, _h: number) => {
    setScrollViewWidth(w);
  };

  const goToNext = () => {
    if (scrollXOffset.value < scrollViewWidth - snapPoint) {
      const quotient = Math.ceil((scrollXOffset.value + 1) / snapPoint);
      const nextNearestMultiple = snapPoint * quotient;

      scrollRef.current?.scrollTo({x: nextNearestMultiple, animated: true});
      scrollXOffset.value = withSpring(nextNearestMultiple, {
        damping: 18,
        stiffness: 120,
      });

      setActiveIndex(quotient);
      setByAction(true);
    }
  };

  const goToPrevious = () => {
    if (scrollXOffset.value !== 0) {
      const quotient = Math.floor((scrollXOffset.value - 1) / snapPoint);
      const previousMultiple = snapPoint * quotient;

      scrollRef.current?.scrollTo({x: previousMultiple, animated: true});
      scrollXOffset.value = withSpring(previousMultiple, {
        damping: 18,
        stiffness: 120,
      });

      setActiveIndex(quotient);
      setByAction(true);
    }
  };

  return (
    <CarouselWrapperStyled>
      <CarouselScrollViewStyled
        as={Animated.ScrollView}
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        onLayout={onScrollLayout}
        onScroll={scrollHandler}
        snapToInterval={snapPoint}
        scrollEventThrottle={16}
        decelerationRate={0}
        onContentSizeChange={onContentSizeChange}>
        {items &&
          items.map((item, index) => (
            <CarouselItemStyled key={index} width={snapPoint}>
              {item.element}
            </CarouselItemStyled>
          ))}
      </CarouselScrollViewStyled>

      <CarouselActionsWrapperStyled>
        <CarouselControlWrapperStyled>
          <Icons.ArrowLeftIcon
            width={24}
            height={24}
            disabled={activeIndex === 0}
            color={activeIndex === 0 ? 'disabled' : 'black1'}
            onPress={goToPrevious}
          />
        </CarouselControlWrapperStyled>
        <CarouselDotWrapperStyled>
          {[...Array(size)].map((_, index) => (
            <CarouselDotStyled active={activeIndex === index} key={index} />
          ))}
        </CarouselDotWrapperStyled>
        <CarouselControlWrapperStyled>
          <Icons.ArrowRightIcon
            width={24}
            height={24}
            disabled={activeIndex + 1 === size}
            color={activeIndex + 1 === size ? 'disabled' : 'black1'}
            onPress={goToNext}
          />
        </CarouselControlWrapperStyled>
      </CarouselActionsWrapperStyled>
    </CarouselWrapperStyled>
  );
};

export {Carousel};
