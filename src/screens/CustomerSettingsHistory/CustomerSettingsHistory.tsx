import {ITicket} from '@/app/models';
import {
  AppStatusBar,
  Box,
  Button,
  Loader,
  Modal,
  TicketHistoryItem,
  Typography,
} from '@/components/atoms';
import {CustomerRateTicketModal} from '@/components/modals';
import {Header} from '@/components/molecules';
import {TRootStackParamList} from '@/navigation';
import {AppDispatch, RootState} from '@/store/Store';
import {TicketHistoryActions, TicketHistoryThunks} from '@/store/slicers';
import {Colors, Metrics} from '@/theme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Platform, RefreshControl} from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {ContainerStyle, CustomerHistoryList} from './styles';

const CustomerSettingsHistory: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/settings/history'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };
  const isScreenFocused = useIsFocused();

  const listRef = useRef<Animated.ScrollView>(null);
  const listGap = useSharedValue(18);
  const listStyle = useAnimatedStyle(() => ({
    gap: listGap.value,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
    flex: 1,
    padding: 18,
    overflow: 'hidden',
  }));

  const {tickets, loading, filters, refreshing} = useSelector(
    (state: RootState) => state.ticketHistory,
  );

  const rateModalRef = useRef<BottomSheetModal>(null);

  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

  const selectedItem = useMemo(
    () => tickets.find(t => t._id === selectedItemId),
    [selectedItemId, tickets],
  );
  const dispatch = useDispatch<AppDispatch>();

  const inverseZIndex = 99;

  const goBack = () => {
    dispatch(TicketHistoryActions.clear());

    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (!navigation.canGoBack()) {
      navigation.navigate('/customer/home');
    }
  };

  const fetchHistory = async () => {
    await dispatch(TicketHistoryThunks.fetchTicketHistory());
  };

  const onRefresh = async () => {
    dispatch(TicketHistoryActions.setRefreshing(true));

    setTimeout(() => {
      fetchHistory();
    });
  };

  const onItemPress = (ticket: ITicket, itemIndex: number) => {
    if (!selectedItemId || selectedItemId !== ticket._id) {
      listGap.value = withSpring(-80, {duration: 300});
      setSelectedItemId(ticket._id);
      setSelectedItemIndex(itemIndex);

      setTimeout(() => {
        if (listRef.current) {
          let scrollToValue = itemIndex * 62;

          listRef.current.scrollTo({
            y: scrollToValue,
          });
        }
      }, 600);
    }

    if (selectedItemId === ticket._id) {
      clearSelectedItem();

      setTimeout(() => {
        if (listRef.current) {
          const scrollToValue = itemIndex * 158;
          listRef.current.scrollTo({
            y: scrollToValue,
            animated: true,
          });
        }
      }, 500);
    }
  };

  const clearSelectedItem = () => {
    listGap.value = withSpring(18);
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

  const fetchNextHistoryItems = async () => {
    if (!filters.next || loading) {
      return;
    }

    const nextOffset = filters.offset + filters.limit;

    dispatch(
      TicketHistoryActions.setFilters({
        offset: nextOffset,
      }),
    );

    dispatch(TicketHistoryActions.setLoading(true));

    await dispatch(TicketHistoryThunks.fetchTicketHistory());
  };

  const showRateModal = () => {
    rateModalRef.current?.present();
  };

  useEffect(() => {
    if (isScreenFocused) {
      fetchHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScreenFocused]);

  return (
    <ContainerStyle style={insetsStyles}>
      <AppStatusBar />
      <Header.Container>
        <Header.GoBack pressables={{back: goBack}} />
        <Header.Border />
      </Header.Container>
      <Box paddings={{horizontal: 18, top: 18}}>
        <Box gap={6}>
          <Typography variant="h4" color="black3">
            {'customer.settings.menus.history.title'}
          </Typography>
          <Typography variant="body2" color="black1">
            {'customer.settings.menus.history.subtitle'}
          </Typography>
        </Box>
      </Box>

      <CustomerHistoryList
        as={Animated.ScrollView}
        ref={listRef}
        onScrollEndDrag={event => {
          const {layoutMeasurement, contentOffset, contentSize} =
            event.nativeEvent;
          const hasReachedBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 18;
          if (hasReachedBottom) {
            fetchNextHistoryItems();
          }
        }}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={!!refreshing && refreshing}
            onRefresh={onRefresh}
            size={Platform.OS !== 'android' ? 14 : undefined}
            tintColor="transparent"
            colors={['transparent']}
            progressBackgroundColor={'transparent'}
            progressViewOffset={0}
          />
        }>
        <Box style={listStyle} overflow="visible" position="relative">
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
          {loading && tickets.length > 0 && !refreshing && (
            <Box
              paddings={{vertical: 18}}
              alignSelf="stretch"
              alignItems="center"
              justifyContent="center">
              <Loader color={Colors.main} />
            </Box>
          )}
        </Box>
      </CustomerHistoryList>

      {!!selectedItem && (
        <Box alignSelf="stretch" padding={18} entering={FadeInDown}>
          <Button
            colorScheme="primary"
            title="customer.settings.buttons.rate"
            onPress={showRateModal}
            style={{alignSelf: 'stretch'}}
          />
        </Box>
      )}

      <Modal
        ref={rateModalRef}
        height={415 + Metrics.unitX3}
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
    </ContainerStyle>
  );
};

export default CustomerSettingsHistory;
