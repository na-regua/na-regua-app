import {TRootStackParamList} from '@/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {ScheduleService} from '@/app/api';
import {ITicket} from '@/app/models';
import {
  AppStatusBar,
  Box,
  Loader,
  ScheduleTicketItem,
  Typography,
} from '@/components/atoms';
import {Header} from '@/components/molecules';
import {Colors} from '@/theme';
import {CacheManager} from '@georstat/react-native-image-cache';
import {Platform, RefreshControl} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Styled from './styles';

const CustomerSchedules: React.FC<
  NativeStackScreenProps<TRootStackParamList, '/customer/schedules'>
> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const insetsStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [schedules, setSchedules] = useState<ITicket[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
  const selectedItem = useMemo(
    () => schedules.find(t => t._id === selectedItemId),
    [selectedItemId, schedules],
  );
  const inverseZIndex = 99;

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
  }));

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const onItemPress = (ticket: ITicket, itemIndex: number) => {
    if (!selectedItemId || selectedItemId !== ticket._id) {
      listGap.value = withSpring(-80, {duration: 300});
      setSelectedItemId(ticket._id);
      setSelectedItemIndex(itemIndex);

      setTimeout(() => {
        if (listRef.current) {
          let scrollToValue = itemIndex * 12;

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
          const scrollToValue = itemIndex * 120;
          listRef.current.scrollTo({
            y: scrollToValue,
            animated: true,
          });
        }
      }, 500);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    setTimeout(() => {
      getUserSchedules();
    });
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

  const getUserSchedules = useCallback(async () => {
    try {
      setLoading(true);

      const {data} = await ScheduleService.getUserSchedules(filters);

      if (data) {
        const {content} = data;

        if (content.length > 0) {
          content.forEach((schedule: ITicket) => {
            if (schedule.barber.avatar.url) {
              CacheManager.prefetch(schedule.barber.avatar.url);
            }
          });
        }

        setLoading(false);
        setRefreshing(false);
        setSchedules(content);
      }
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filters]);

  useEffect(() => {
    getUserSchedules();
  }, [getUserSchedules]);

  return (
    <Styled.Container style={insetsStyles}>
      <AppStatusBar />
      <Header.Container>
        <Header.GoBack pressables={{back: goBack}} />
      </Header.Container>
      <Box paddings={{horizontal: 18}}>
        <Box gap={6}>
          <Typography variant="h4" color="black3">
            {'customer.appointments.title'}
          </Typography>
          <Typography variant="body2" color="black1">
            {'customer.appointments.subtitle'}
          </Typography>
        </Box>
      </Box>

      <Styled.ScheduleList
        as={Animated.ScrollView}
        ref={listRef}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={event => {
          const {layoutMeasurement, contentOffset, contentSize} =
            event.nativeEvent;
          const hasReachedBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 18;
          if (hasReachedBottom) {
            // fetchNextHistoryItems();
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
        {/* List */}
        <Box style={listStyle} overflow="visible" position="relative">
          {((loading && schedules.length === 0) || refreshing) && (
            <Box
              paddings={{vertical: 18}}
              alignSelf="stretch"
              alignItems="center"
              justifyContent="center">
              <Loader color={Colors.main} />
            </Box>
          )}
          {schedules.map((schedule, index) => (
            <ScheduleTicketItem
              key={schedule._id}
              ticket={schedule}
              zIndex={calculateZIndex(index)}
              onPress={ticket => onItemPress(ticket, index)}
              selected={selectedItem?._id === schedule._id}
              isAfterSelected={index > selectedItemIndex}
              isBeforeSelected={index < selectedItemIndex}
            />
          ))}
          {loading && schedules.length > 0 && !refreshing && (
            <Box
              paddings={{vertical: 18}}
              alignSelf="stretch"
              alignItems="center"
              justifyContent="center">
              <Loader color={Colors.main} />
            </Box>
          )}
        </Box>
      </Styled.ScheduleList>
    </Styled.Container>
  );
};

export default CustomerSchedules;
