import {CLOSE_TO_BOTTOM_OFFSET} from '@/utils';
import React, {PropsWithChildren, useMemo} from 'react';
import {NativeScrollEvent, ViewProps} from 'react-native';
import {
  FadeInDown,
  runOnJS,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  PageCardContainer,
  PageCardContentStyled,
  PageCardScrollStyled,
  PageFooterStyled,
} from './styles';

interface PageCardProps extends PropsWithChildren {
  scrollable?: boolean;
  footer?: React.ReactNode;
  onScroll?: (
    contentOffsetY: number,
    isScrolling: boolean,
    closeToBottom: boolean,
    event?: NativeScrollEvent,
  ) => void;
  onScrollEnds?: (
    contentOffsetY: number,
    isScrolling: boolean,
    closeToBottom: boolean,
  ) => void;
  bounce?: boolean;
  wrapperProps?: ViewProps;
  scrollProps?: ViewProps;
  resetScroll?: () => void;
}

const PageCard: React.FC<PageCardProps> = ({
  children,
  footer,
  scrollable = false,
  onScroll,
  bounce = true,
  wrapperProps,
  scrollProps,
}) => {
  const insets = useSafeAreaInsets();
  // const [isScrolling, setIsScrolling] = useState(false);
  // const [closeToBottom, setCloseToBottom] = useState(false);
  // const [_contentOffsetY, setContentOffsetY] = useState(0);

  const insetsStyles = {
    paddingBottom: insets.bottom,
  };

  const hasFooter = useMemo(() => !!footer, [footer]);

  const pageFooterStyles = useMemo(() => {
    if (hasFooter) {
      return {};
    }

    return insetsStyles;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFooter]);

  const footerStyles = useMemo(() => {
    if (!hasFooter) {
      return {};
    }

    return insetsStyles;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFooter]);

  const handleOnScrollAnimated = useAnimatedScrollHandler({
    onScroll: (event: NativeScrollEvent) => {
      const {contentOffset} = event;
      const _isScrolling = contentOffset.y !== 0;
      const _isCloseToBottom =
        event.layoutMeasurement.height + contentOffset.y >=
        event.contentSize.height - CLOSE_TO_BOTTOM_OFFSET;

      // runOnJS(setIsScrolling)(_isScrolling);
      // runOnJS(setCloseToBottom)(_closeToBottom);
      // runOnJS(setContentOffsetY)(contentOffset.y);

      if (onScroll) {
        runOnJS(onScroll)(
          contentOffset.y,
          _isScrolling,
          _isCloseToBottom,
          event,
        );
      }
    },
  });

  return (
    <PageCardContainer
      {...wrapperProps}
      style={[pageFooterStyles, wrapperProps?.style]}
      entering={FadeInDown.delay(100).duration(300)}>
      {scrollable ? (
        <PageCardScrollStyled
          bounces={bounce}
          alwaysBounceVertical={bounce}
          onScroll={handleOnScrollAnimated}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          {...scrollProps}>
          {children}
        </PageCardScrollStyled>
      ) : (
        <PageCardContentStyled>{children}</PageCardContentStyled>
      )}
      {!!footer && (
        <PageFooterStyled style={[footerStyles]}>{footer}</PageFooterStyled>
      )}
    </PageCardContainer>
  );
};

export {PageCard};
