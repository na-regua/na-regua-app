import {ITicket, ModalSizes} from '@/app/models';
import {
  Box,
  Button,
  Loader,
  Modal,
  TicketHistoryItem,
} from '@/components/atoms';
import {CustomerRateTicketModal} from '@/components/modals';
import {useAppNavigation} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {TicketHistoryActions, TicketHistoryThunks} from '@/store/slicers';
import {Colors, Metrics} from '@/theme';
import {isCloseToBottom} from '@/utils';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Portal} from 'react-native-portalize';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {CHHScrollViewStyled} from './styles';

interface ICustomerHomeHistoryProps {
  isScreenFocused: boolean;
}

const CustomerHomeHistory: React.FC<ICustomerHomeHistoryProps> = ({
  isScreenFocused,
}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useAppNavigation();

  const {
    tickets,
    loading,
    refreshing,
    filters: {next: hasMoreHistory},
  } = useSelector((state: RootState) => state.ticketHistory);

  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();
  const selectedItem = useMemo(
    () => tickets.find(t => t._id === selectedItemId),
    [selectedItemId, tickets],
  );
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

  const [reachedEnd, setReachedEnd] = useState<boolean>(false);

  const inverseZIndex = 99;

  const rateModalRef = useRef<BottomSheetModal>(null);
  const listRef = useRef<Animated.ScrollView>(null);
  const listGap = useSharedValue(18);
  const listStyle = useAnimatedStyle(() => ({
    gap: listGap.value,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  }));

  const fetchHistory = async () => {
    await dispatch(TicketHistoryThunks.fetchTicketHistory());
  };

  const onItemPress = (ticket: ITicket, itemIndex: number) => {
    listGap.value = withSpring(-80, {velocity: 2});
    setSelectedItemId(ticket._id);
    setSelectedItemIndex(itemIndex);

    if (selectedItem?._id === ticket._id) {
      clearSelectedItem();
    }
  };

  const clearSelectedItem = () => {
    listGap.value = withTiming(18);
    setSelectedItemId(undefined);
    setSelectedItemIndex(-1);
  };

  const calculateZIndex = (index: number): number => {
    if (selectedItemIndex < 0) {
      return 0;
    }

    if (index < selectedItemIndex) {
      const diff = selectedItemIndex - index;

      return inverseZIndex - diff;
    }

    if (selectedItemIndex === index) {
      return inverseZIndex + 1;
    }

    return inverseZIndex - index;
  };

  const showRateModal = () => {
    rateModalRef.current?.present();
  };

  const goToHistoryPage = () => {
    navigation.navigate('/customer/settings/history');
  };

  const onRefresh = () => {
    dispatch(TicketHistoryActions.setRefreshing(true));

    fetchHistory();
  };

  useEffect(() => {
    if (isScreenFocused) {
      fetchHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScreenFocused]);

  return (
    <CHHScrollViewStyled
      as={Animated.ScrollView}
      ref={listRef}
      scrollEventThrottle={16}
      hasSelected={!!selectedItem}
      insetBottom={insets.bottom}
      showsVerticalScrollIndicator={false}
      onScroll={event => {
        const {nativeEvent} = event;
        const hasReachedEnd = isCloseToBottom(nativeEvent, 64);
        setReachedEnd(hasReachedEnd);
      }}>
      <Animated.View style={listStyle}>
        {((loading && tickets.length === 0) || refreshing) && (
          <Box
            paddings={{vertical: 18}}
            alignSelf="stretch"
            alignItems="center"
            justifyContent="center">
            <Loader color={Colors.main} />
          </Box>
        )}
        {tickets.map((mapTicket, index) => (
          <TicketHistoryItem
            key={index}
            ticket={mapTicket}
            zIndex={calculateZIndex(index)}
            onPress={ticket => onItemPress(ticket, index)}
            selected={selectedItem?._id === mapTicket._id}
            isAfterSelected={index > selectedItemIndex}
            isBeforeSelected={index < selectedItemIndex}
          />
        ))}
      </Animated.View>

      {reachedEnd && hasMoreHistory && (
        <Box
          alignSelf="stretch"
          entering={FadeInDown}
          zIndex={inverseZIndex + 2}>
          <Button
            colorScheme="primary"
            variant="ghost"
            title="customer.home.buttons.seeMore"
            style={{alignSelf: 'stretch'}}
            onPress={goToHistoryPage}
          />
        </Box>
      )}

      {!!selectedItem && (
        <Portal>
          <Box
            alignSelf="stretch"
            position="absolute"
            positions={{
              bottom: Metrics.platformPadding + Metrics.unitX3,
              left: Metrics.unitX3,
            }}
            width={Metrics.smWidth}
            entering={FadeInDown}>
            <Button
              colorScheme="primary"
              title="customer.settings.buttons.rate"
              onPress={showRateModal}
              style={{alignSelf: 'stretch'}}
            />
          </Box>
        </Portal>
      )}

      <Modal
        ref={rateModalRef}
        height={ModalSizes.Rate + Metrics.platformPadding}
        backdropBackgroundColor={Colors.main}
        onClose={onRefresh}>
        {selectedItem && (
          <CustomerRateTicketModal
            ticket={selectedItem}
            dismiss={() => {
              rateModalRef.current?.dismiss();
            }}
          />
        )}
      </Modal>
    </CHHScrollViewStyled>
  );
};

export {CustomerHomeHistory};
